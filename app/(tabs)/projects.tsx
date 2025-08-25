import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity, LayoutAnimation, Platform, UIManager, Modal, Pressable, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { useAppStore, projectStages } from '../../store/appStore';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Project = { id: string; title: string; description: string; tags: string[]; progress: number; status: string; icon: string; };

const CustomDropdown = ({ selectedValue, onSelect }: { selectedValue: string, onSelect: (status: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };
  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={() => setIsOpen(!isOpen)}>
        <Text style={styles.dropdownHeaderText}>{selectedValue}</Text>
        <Feather name={isOpen ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />
      </TouchableOpacity>
      {isOpen && (
        <MotiView from={{ opacity: 0, translateY: -5 }} animate={{ opacity: 1, translateY: 0 }} style={styles.dropdownList}>
          {projectStages.map((item, index) => (
            <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => handleSelect(item)}>
              <Text style={styles.dropdownItemText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </MotiView>
      )}
    </View>
  );
};

const ProjectCard = ({ item, isExpanded, onExpand, onStatusChange }: { item: Project, isExpanded: boolean, onExpand: () => void, onStatusChange: (status: string) => void }) => {
  return (
    <TouchableOpacity onPress={onExpand} activeOpacity={0.8}>
      <intensity={90} tint="light" style={styles.card}>
        <View style={styles.cardHeader}><Text style={styles.cardIcon}>{item.icon}</Text><Text style={styles.cardTitle}>{item.title}</Text></View>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => (<View key={index} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>))}
        </View>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>{item.status} - {Math.round(item.progress * 100)}%</Text>
          <Progress.Bar progress={item.progress} width={null} color={'#8A2BE2'} unfilledColor={'rgba(255, 255, 255, 0.6)'} borderWidth={0} height={8} borderRadius={4} />
        </View>
        {isExpanded && (
          <View style={styles.expandableContent}>
            <Text style={styles.updateStatusTitle}>Update Status:</Text>
            <CustomDropdown selectedValue={item.status} onSelect={onStatusChange} />
          </View>
        )}
      </BlurView>
    </TouchableOpacity>
  );
};

export default function ProjectsScreen() {
  const { projects, updateProjectStatus, addProject } = useAppStore();
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newIcon, setNewIcon] = useState('');

  const handleExpand = (projectId: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedProjectId(currentId => (currentId === projectId ? null : projectId));
  };
  const handleStatusChange = (projectId: string, newStatus: string) => {
    updateProjectStatus(projectId, newStatus);
    setExpandedProjectId(null);
  };
  const handleAddNewProject = () => {
    if (newTitle.trim().length === 0) return;
    const projectData = {
      title: newTitle.trim(),
      description: newDescription.trim(),
      tags: newTags.split(',').map(tag => tag.trim()).filter(tag => tag),
      icon: newIcon.trim() || '🚀'
    };
    addProject(projectData);
    setModalVisible(false);
    setNewTitle('');
    setNewDescription('');
    setNewTags('');
    setNewIcon('');
  };

  return (
    <LinearGradient colors={['#e0f7fa', '#e6e9ff', '#fdeeff']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <View style={styles.header}><Text style={styles.headerTitle}>Active Projects</Text></View>
        <FlatList
          data={projects}
          renderItem={({ item, index }) => (
            <View style={{ zIndex: expandedProjectId === item.id ? 999 : projects.length - index }}>
              <ProjectCard
                item={item}
                isExpanded={expandedProjectId === item.id}
                onExpand={() => handleExpand(item.id)}
                onStatusChange={(newStatus) => handleStatusChange(item.id, newStatus)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
        <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
          <Feather name="plus" size={30} color="#fff" />
        </TouchableOpacity>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, justifyContent: 'center' }}>
            <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)} />
            <View style={styles.addModalContainer}>
              <View intensity={90} tint="light" style={styles.addModalContent}>
                <ScrollView>
                  <Text style={styles.modalTitle}>New Project</Text>
                  <TextInput style={styles.textInput} placeholder="Project Title" value={newTitle} onChangeText={setNewTitle} />
                  <TextInput style={[styles.textInput, { height: 80, textAlignVertical: 'top' }]} placeholder="Description" value={newDescription} onChangeText={setNewDescription} multiline />
                  <TextInput style={styles.textInput} placeholder="Tags (comma-separated)" value={newTags} onChangeText={setNewTags} />
                  <TextInput style={styles.textInput} placeholder="Icon (e.g., 🚀)" value={newIcon} onChangeText={setNewIcon} />
                  <TouchableOpacity style={styles.saveButton} onPress={handleAddNewProject}>
                    <Text style={styles.saveButtonText}>Add Project</Text>
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, paddingTop: 50 },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 32, color: '#333' },
  listContainer: { paddingHorizontal: 16, paddingBottom: 100 },
  card: { padding: 20, borderRadius: 24, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  cardIcon: { fontSize: 24, marginRight: 12 },
  cardTitle: { fontFamily: 'Poppins-Bold', fontSize: 20, color: '#333' },
  cardDescription: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#666', marginBottom: 16 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 16 },
  tag: { backgroundColor: 'rgba(138, 43, 226, 0.1)', borderRadius: 8, paddingVertical: 4, paddingHorizontal: 10, marginRight: 8, marginBottom: 8 },
  tagText: { fontFamily: 'Poppins-SemiBold', fontSize: 12, color: '#8A2BE2' },
  progressContainer: { marginTop: 8 },
  progressText: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#555', marginBottom: 6 },
  expandableContent: { marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255, 255, 255, 0.8)' },
  updateStatusTitle: { fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#555', marginBottom: 8 },
  dropdownContainer: { position: 'relative' },
  dropdownHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12, height: 50, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#DDD' },
  dropdownHeaderText: { color: '#444', fontFamily: 'Poppins-SemiBold', fontSize: 16 },
  dropdownList: { position: 'absolute', top: 52, left: 0, right: 0, backgroundColor: '#FFF', borderRadius: 8, borderWidth: 1, borderColor: '#DDD', maxHeight: 240, zIndex: 1000, marginTop: 4 },
  dropdownItem: { padding: 12, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  dropdownItemText: { color: '#444', fontFamily: 'Poppins-Regular', fontSize: 16 },
  fab: { position: 'absolute', right: 25, bottom: 80, width: 60, height: 60, borderRadius: 30, backgroundColor: '#8A2BE2', justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
  modalOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  addModalContainer: { flex: 1, justifyContent: 'center', paddingHorizontal: '5%' },
  addModalContent: { maxHeight: '80%', padding: 24, borderRadius: 24, overflow: 'hidden' },
  modalTitle: { fontFamily: 'Poppins-Bold', fontSize: 22, color: '#333', marginBottom: 20, textAlign: 'center' },
  textInput: { fontFamily: 'Poppins-Regular', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(220, 220, 220, 1)' },
  saveButton: { backgroundColor: '#8A2BE2', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 8 },
  saveButtonText: { fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 16 },
});