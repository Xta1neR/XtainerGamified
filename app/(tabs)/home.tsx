import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Progress from 'react-native-progress';
import { Feather } from '@expo/vector-icons';
import { useAppStore } from '../../store/appStore';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { MotiView } from 'moti';
import CircularProgress from 'react-native-circular-progress-indicator';

const GlassCard = ({ children, style }: { children: React.ReactNode, style?: object }) => (
  <View intensity={80} tint="light" style={[styles.card, style]}><>{children}</></View>
);

const HabitItem = ({ habit, onToggle, onDelete }: { habit: any, onToggle: (id: string) => void, onDelete: (id: string) => void }) => {
  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    const trans = dragX.interpolate({ inputRange: [-80, 0], outputRange: [0, 80], extrapolate: 'clamp' });
    return (
      <TouchableOpacity onPress={() => onDelete(habit.id)} style={styles.deleteButton}>
        <Animated.View style={{ transform: [{ translateX: trans }] }}><Feather name="trash-2" size={24} color="#fff" /></Animated.View>
      </TouchableOpacity>
    );
  };
  return (
    <MotiView from={{ opacity: 0, scale: 0.9, marginBottom: -20 }} animate={{ opacity: 1, scale: 1, marginBottom: 12 }} exit={{ opacity: 0, scale: 0.9, marginBottom: -20 }} transition={{ type: 'timing', duration: 350 }}>
      <Swipeable renderRightActions={renderRightActions} overshootRight={false}>
        <Pressable style={styles.habitItem} onPress={() => onToggle(habit.id)}><Text style={styles.habitIcon}>{habit.completed ? '✅' : habit.icon}</Text><Text style={[styles.habitText, habit.completed && styles.habitTextCompleted]}>{habit.text}</Text></Pressable>
      </Swipeable>
    </MotiView>
  );
};

export default function HomeScreen() {
  const { 
    habits, toggleHabit, addHabit, deleteHabit,
    waterIntake, waterGoal, addWater, resetWater,
    calorieIntake, calorieGoal, addCalories, resetCalories
  } = useAppStore();

  const [habitModalVisible, setHabitModalVisible] = useState(false);
  const [newHabitText, setNewHabitText] = useState('');

  const handleAddNewHabit = () => {
    if (newHabitText.trim().length > 0) {
      addHabit(newHabitText.trim());
      setNewHabitText('');
      setHabitModalVisible(false);
    }
  };
  
  const waterProgress = waterGoal > 0 ? waterIntake / waterGoal : 0;
  const calorieProgress = calorieGoal > 0 ? calorieIntake / calorieGoal : 0;
  const habitProgress = habits.length > 0 ? habits.filter(h => h.completed).length / habits.length * 100 : 0;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LinearGradient colors={['#fdeeff', '#e6e9ff', '#e0f7fa']} style={styles.container}>
        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Welcome Back,</Text>
              <Text style={styles.headerUsername}>Rituraj 👋</Text>
            </View>
            <View style={styles.progressSection}>
              <CircularProgress value={habitProgress} radius={80} duration={1000} progressValueColor={'#333'} activeStrokeColor={'#8A2BE2'} inActiveStrokeColor={'rgba(138, 43, 226, 0.2)'} inActiveStrokeOpacity={0.5} inActiveStrokeWidth={20} activeStrokeWidth={20} title={'Quests Done'} titleColor={'#8A2BE2'} titleStyle={{ fontFamily: 'Poppins-SemiBold', fontSize: 14 }} progressValueStyle={{ fontFamily: 'Poppins-Bold', fontSize: 40 }} valueSuffix={'%'} />
            </View>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCardContainer}>
                <GlassCard style={styles.statCard}>
                  <View style={styles.statContent}>
                    <View>
                      <Text style={styles.statIcon}>🔥</Text>
                      <Text style={styles.statLabel}>Calories</Text>
                      <Text style={styles.statValue}>{calorieIntake} / {calorieGoal}</Text>
                    </View>
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity style={styles.iconButton} onPress={() => resetCalories()}>
                        <Feather name="rotate-ccw" size={18} color="#8A2BE2" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.iconButton} onPress={() => addCalories(100)}>
                        <Feather name="plus" size={20} color="#8A2BE2" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Progress.Bar progress={calorieProgress} width={null} color={'#8A2BE2'} unfilledColor={'rgba(255,255,255,0.5)'} borderWidth={0} style={styles.progressBar}/>
                </GlassCard>
              </View>
              <View style={styles.statCardContainer}>
                 <GlassCard style={styles.statCard}>
                    <View style={styles.statContent}>
                      <View>
                        <Text style={styles.statIcon}>💧</Text>
                        <Text style={styles.statLabel}>Water</Text>
                        <Text style={styles.statValue}>{waterIntake} / {waterGoal} ml</Text>
                      </View>
                      <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => resetWater()}>
                          <Feather name="rotate-ccw" size={18} color="#8A2BE2" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton} onPress={() => addWater(250)}>
                          <Feather name="plus" size={20} color="#8A2BE2" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  <Progress.Bar progress={waterProgress} width={null} color={'#8A2BE2'} unfilledColor={'rgba(255,255,255,0.5)'} borderWidth={0} style={styles.progressBar}/>
                </GlassCard>
              </View>
            </View>

            <GlassCard style={{ width: '100%' }}>
              <Text style={styles.habitsTitle}>Daily Quests</Text>
              {habits.map(habit => (
                <HabitItem key={habit.id} habit={habit} onToggle={toggleHabit} onDelete={deleteHabit} />
              ))}
            </GlassCard>
          </ScrollView>
          
          <TouchableOpacity style={styles.fab} onPress={() => setHabitModalVisible(true)}>
            <Feather name="plus" size={30} color="#fff" />
          </TouchableOpacity>

          <Modal animationType="fade" transparent={true} visible={habitModalVisible} onRequestClose={() => setHabitModalVisible(false)}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.modalCenteringContainer}>
              <Pressable style={styles.modalOverlay} onPress={() => setHabitModalVisible(false)} />
              <View style={styles.modalContentContainer}>
                <View intensity={90} tint="light" style={styles.modalBlurView}>
                  <Text style={styles.modalTitle}>Add New Quest</Text>
                  <TextInput style={styles.textInput} placeholder="e.g., Read for 15 minutes" value={newHabitText} onChangeText={setNewHabitText}/>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setHabitModalVisible(false)}><Text style={[styles.buttonText, { color: '#555' }]}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.addButton]} onPress={handleAddNewHabit}><Text style={styles.buttonText}>Add</Text></TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>

        </SafeAreaView>
      </LinearGradient>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 16, paddingTop: 40, paddingBottom: 50 },
  header: { marginBottom: 24, paddingHorizontal: 8 },
  headerTitle: { fontFamily: 'Poppins-Regular', fontSize: 24, color: '#666' },
  headerUsername: { fontFamily: 'Poppins-Bold', fontSize: 32, color: '#333' },
  progressSection: { alignItems: 'center', marginBottom: 24 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statCardContainer: { flex: 1, marginHorizontal: 4 },
  statCard: { padding: 16, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)' },
  statContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  statIcon: { fontSize: 24 },
  statLabel: { fontFamily: 'Poppins-SemiBold', fontSize: 14, color: '#555', marginTop: 8 },
  statValue: { fontFamily: 'Poppins-Regular', fontSize: 12, color: '#777', marginVertical: 4 },
  progressBar: { marginTop: 8, height: 6, borderRadius: 3 },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(138, 43, 226, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  habitsTitle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, color: '#444', margin: 16 },
  habitItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: 16, borderRadius: 16 },
  habitIcon: { fontSize: 20, marginRight: 16 },
  habitText: { fontFamily: 'Poppins-Regular', fontSize: 15, color: '#333', flex: 1 },
  habitTextCompleted: { textDecorationLine: 'line-through', color: '#999' },
  card: { overflow: 'hidden', marginBottom: 12 },
  deleteButton: { backgroundColor: '#ff6b6b', justifyContent: 'center', alignItems: 'center', width: 80, height: '100%', borderRadius: 16 },
  fab: { position: 'absolute', right: 25, bottom: 80, width: 60, height: 60, borderRadius: 30, backgroundColor: '#8A2BE2', justifyContent: 'center', alignItems: 'center', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4 },
  modalCenteringContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalOverlay: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContentContainer: { width: '90%', maxWidth: 400 },
  modalBlurView: { padding: 24, borderRadius: 24, overflow: 'hidden' },
  modalTitle: { fontFamily: 'Poppins-Bold', fontSize: 22, color: '#333', marginBottom: 16, textAlign: 'center' },
  textInput: { fontFamily: 'Poppins-Regular', backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 12, padding: 16, fontSize: 16, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(220, 220, 220, 1)' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  button: { flex: 1, paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginHorizontal: 8 },
  cancelButton: { backgroundColor: 'rgba(220, 220, 220, 0.8)' },
  addButton: { backgroundColor: '#8A2BE2' },
  buttonText: { fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 16 },
});