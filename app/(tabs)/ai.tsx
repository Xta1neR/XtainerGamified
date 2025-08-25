import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, ActivityIndicator, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useAppStore } from '../../store/appStore';
import { MotiView } from 'moti';
import Markdown from 'react-native-markdown-display';
import * as Clipboard from 'expo-clipboard';

const SuggestionCard = ({ title, content }: { title: string, content: string }) => (
    <View style={[styles.suggestionCard, { backgroundColor: 'rgba(255,255,255,0.5)' }]}>
      <Text style={styles.suggestionTitle}>{title}</Text>
      <Text style={styles.suggestionContent}>{content}</Text>
    </View>
);

export default function AIScreen() {
  const { messages, addMessage, generateContent, clearChat } = useAppStore();
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = async () => {
    if (inputText.trim().length === 0 || isSending) return;
    const messageToSend = inputText.trim();
    setInputText('');
    setIsSending(true);
    try {
        await addMessage(messageToSend);
    } catch (error) {
        console.error("Failed to send message:", error);
    } finally {
        setIsSending(false);
    }
  };
  
  const handleGenerateContent = async () => {
    if (isSending) return;
    setIsSending(true);
    try {
      await generateContent();
    } catch (error) {
        console.error("Failed to generate content:", error);
    } finally {
        setIsSending(false);
    }
  };

  useEffect(() => {
    if (flatListRef.current) {
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  const handleClearChat = () => {
    Alert.alert(
      "Clear Chat",
      "Are you sure you want to delete this conversation?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: () => clearChat() },
      ]
    );
  };

  const handleCopy = (text: string, id: string) => {
    Clipboard.setStringAsync(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isUser = item.sender === 'user';
    
    if (item.text === '...') {
      return (
        <MotiView from={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} style={[styles.messageBubble, styles.aiBubble]}>
            <ActivityIndicator size="small" color="#8A2BE2" />
        </MotiView>
      )
    }

    if (item.type === 'suggestion') {
      return <SuggestionCard title={item.title!} content={item.content!} />;
    }

    return (
      <View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
        {isUser ? (
          <Text style={styles.userMessageText}>{item.text}</Text>
        ) : (
          <>
            <Markdown style={markdownStyles}>{item.text}</Markdown>
            {/* --- THIS IS THE CORRECTED LINE --- */}
            <TouchableOpacity style={styles.copyButton} onPress={() => handleCopy(item.text, item.id)}>
              {copiedId === item.id ? (
                <Text style={styles.copyButtonText}>Copied!</Text>
              ) : (
                <Feather name="copy" size={16} color="#999" />
              )}
            </TouchableOpacity>
          </>
        )}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#e0f7fa', '#e6e9ff', '#fdeeff']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }} keyboardVerticalOffset={100}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>AI Assistant</Text>
            <TouchableOpacity onPress={handleClearChat}>
              <Feather name="trash-2" size={24} color="#999" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.contentButton} onPress={handleGenerateContent} disabled={isSending}>
             {isSending ? (
                <ActivityIndicator size="small" color="#8A2BE2" />
             ) : (
                <Text style={styles.contentButtonText}>✨ Generate Today's Content</Text>
             )}
          </TouchableOpacity>

          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderMessage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.chatContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput style={styles.textInput} value={inputText} onChangeText={setInputText} placeholder="Ask your assistant..." placeholderTextColor="#999" />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={isSending}>
              {isSending ? <ActivityIndicator size="small" color="#fff" /> : <Feather name="send" size={24} color="#fff" />}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const markdownStyles = StyleSheet.create({
  body: {
    fontFamily: 'Poppins-Regular',
    fontSize: 15,
    color: '#333',
  },
  heading1: {
    fontFamily: 'Poppins-Bold',
    color: '#8A2BE2',
    marginTop: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingBottom: 5,
  },
  heading2: {
    fontFamily: 'Poppins-SemiBold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  strong: {
    fontFamily: 'Poppins-Bold',
  },
  em: {
    fontFamily: 'Poppins-Italic',
  },
  list_item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  bullet_list_icon: {
    fontFamily: 'Poppins-Regular',
    marginRight: 8,
    fontSize: 15,
    color: '#8A2BE2',
  },
});

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 8,
  },
  headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 32, color: '#333'},
  chatContainer: { paddingHorizontal: 16, paddingBottom: 10, paddingTop: 30},
  messageBubble: { maxWidth: '95%', padding: 14, paddingBottom: 30, borderRadius: 20, marginBottom: 10, alignSelf: 'flex-start' },
  userBubble: { backgroundColor: '#8A2BE2', alignSelf: 'flex-end', maxWidth: '80%', paddingBottom: 14 },
  aiBubble: { backgroundColor: '#fff' },
  userMessageText: { fontFamily: 'Poppins-Regular', fontSize: 15, color: '#fff' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 12, borderTopWidth: 1, borderTopColor: 'rgba(0, 0, 0, 0.05)', backgroundColor: 'rgba(255, 255, 255, 0.7)' },
  textInput: { flex: 1, height: 44, backgroundColor: '#fff', borderRadius: 22, paddingHorizontal: 16, fontFamily: 'Poppins-Regular', fontSize: 15, borderWidth: 1, borderColor: '#eee' },
  sendButton: { marginLeft: 12, width: 44, height: 44, borderRadius: 22, backgroundColor: '#8A2BE2', justifyContent: 'center', alignItems: 'center' },
  suggestionCard: { padding: 16, borderRadius: 16, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)', overflow: 'hidden' },
  suggestionTitle: { fontFamily: 'Poppins-Bold', fontSize: 16, color: '#333', marginBottom: 6 },
  suggestionContent: { fontFamily: 'Poppins-Regular', fontSize: 14, color: '#555' },
  contentButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(220, 220, 220, 1)',
    height: 50,
    justifyContent: 'center',
  },
  contentButtonText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#8A2BE2',
    fontSize: 16,
  },
  copyButton: {
    position: 'absolute',
    bottom: 8,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  copyButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#999',
  },
});