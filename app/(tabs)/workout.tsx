import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Progress from 'react-native-progress';
import { fullSchedule } from '../../constants/fullSchedule';
import { getCalorieEstimate } from '../../services/GeminiService';

const GlassCard = ({ children, style }: { children: React.ReactNode, style?: object }) => (
  <View intensity={80} tint="light" style={[styles.card, style]}>{children}</View>
);

export default function WorkoutScreen() {
  const todayIndex = new Date().getDay();
  const todaySchedule = fullSchedule[todayIndex];
  const dateString = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const { day, focus, workout, nightCircuit, meals } = todaySchedule;

  // --- Workout States ---
  const [workoutProgress, setWorkoutProgress] = useState<{ [key: string]: number }>({});
  const [nightCircuitProgress, setNightCircuitProgress] = useState<{ [key: string]: number }>({});
  const [isNightCircuitDone, setIsNightCircuitDone] = useState(false);
  
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTutorial, setSelectedTutorial] = useState<{ name: string; asset: any } | null>(null);

  // --- Nutrition States ---
  const [mealInput, setMealInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [calorieResult, setCalorieResult] = useState<string | null>(null);

  useEffect(() => {
    const initialWorkoutProgress: { [key: string]: number } = {};
    workout.forEach(ex => { initialWorkoutProgress[ex.name] = 0; });
    setWorkoutProgress(initialWorkoutProgress);

    const initialNightProgress: { [key: string]: number } = {};
    nightCircuit.forEach(ex => { initialNightProgress[ex.name] = 0; });
    setNightCircuitProgress(initialNightProgress);
    setIsNightCircuitDone(false);
  }, [todayIndex]);

  const handleSetComplete = (exerciseName: string, totalSets: number, isNight: boolean) => {
    const progressUpdater = isNight ? setNightCircuitProgress : setWorkoutProgress;
    progressUpdater(prev => {
      const currentSets = prev[exerciseName] || 0;
      return { ...prev, [exerciseName]: currentSets < totalSets ? currentSets + 1 : totalSets };
    });
  };
  
  const handleShowTutorial = (exercise: any) => {
    if (exercise.tutorialAsset) {
      setSelectedTutorial({ name: exercise.name, asset: exercise.tutorialAsset });
      setModalVisible(true);
    }
  };

  const handleResetWorkout = () => {
    const initialWorkoutProgress: { [key: string]: number } = {};
    workout.forEach(ex => { initialWorkoutProgress[ex.name] = 0; });
    setWorkoutProgress(initialWorkoutProgress);
  };
  
  const handleResetNightCircuit = () => {
    const initialNightProgress: { [key: string]: number } = {};
    nightCircuit.forEach(ex => { initialNightProgress[ex.name] = 0; });
    setNightCircuitProgress(initialNightProgress);
    setIsNightCircuitDone(false);
  };

  const handleCalculateCalories = async () => {
    if (mealInput.trim().length === 0 || isLoading) return;
    setIsLoading(true);
    setCalorieResult(null);

    const result = await getCalorieEstimate(mealInput);
    setCalorieResult(result);
    setIsLoading(false);
  };

  // --- Workout Completion ---
  const totalWorkoutSets = workout.reduce((sum, ex) => sum + (ex.sets || 0), 0);
  const completedWorkoutSets = Object.values(workoutProgress).reduce((sum, sets) => sum + sets, 0);
  const workoutCompletion = totalWorkoutSets > 0 ? completedWorkoutSets / totalWorkoutSets : 0;

  const totalNightSets = nightCircuit.reduce((sum, ex) => sum + (ex.sets || 0), 0);
  const completedNightSets = Object.values(nightCircuitProgress).reduce((sum, sets) => sum + sets, 0);
  const nightCompletion = totalNightSets > 0 ? completedNightSets / totalNightSets : 0;

  return (
    <LinearGradient colors={['#e0f7fa', '#e6e9ff', '#fdeeff']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <StatusBar style="dark" />
          <Text style={styles.headerTitle}>{day}'s Agenda</Text>
          <Text style={styles.headerSubtitle}>{dateString} - Focus: {focus}</Text>

          {/* --- Daily Nutrition Section --- */}
          <GlassCard>
            <Text style={styles.cardTitle}>Daily Nutrition</Text>
            {meals && meals.map((meal, index) => (
              <View key={index} style={styles.listItem}>
                {/* <Text style={styles.listItemIcon}>{meal.icon}</Text> */}
                <View style={styles.listItemDetails}>
                  <Text style={styles.listItemTitle}>{meal.name}</Text>
                  <Text style={styles.listItemSubtitle}>{meal.description} (~{meal.calories} kcal)</Text>
                </View>
              </View>
            ))}
            <View style={styles.aiContainer}>
              <Text style={styles.aiTitle}>⚡ AI Calorie Calculator</Text>
              <TextInput 
                placeholder="e.g., '1 bowl of dal and rice'" 
                style={styles.textInput}
                placeholderTextColor="#999"
                value={mealInput}
                onChangeText={setMealInput}
              />
              <TouchableOpacity style={styles.aiButton} onPress={handleCalculateCalories} disabled={isLoading}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.aiButtonText}>Calculate</Text>
                )}
              </TouchableOpacity>
              {calorieResult && (
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>Estimated Calories: <Text style={styles.resultValue}>{calorieResult}</Text></Text>
                </View>
              )}
            </View>
          </GlassCard>

          {/* --- Existing Gym Workout Section --- */}
          <GlassCard>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Gym Workout</Text>
                <TouchableOpacity onPress={handleResetWorkout}>
                    <Feather name="rotate-ccw" size={20} color="#999"/>
                </TouchableOpacity>
            </View>
            <Progress.Bar progress={workoutCompletion} width={null} color={'#8A2BE2'} unfilledColor={'rgba(255,255,255,0.5)'} borderWidth={0} style={styles.progressBar}/>
            {workout.map((exercise, index) => (
              <TouchableOpacity key={index} style={styles.listItem} onPress={() => handleShowTutorial(exercise)}>
                <Image source={exercise.tutorialAsset} style={styles.gifPreview} />
                <View style={styles.listItemDetails}>
                  <Text style={styles.listItemTitle}>{exercise.name}</Text>
                  <Text style={styles.listItemSubtitle}>{workoutProgress[exercise.name] || 0} / {exercise.sets} sets of {exercise.reps} reps</Text>
                </View>
                <TouchableOpacity style={styles.plusButton} onPress={() => handleSetComplete(exercise.name, exercise.sets, false)}>
                  <Feather name="plus" size={24} color="#8A2BE2" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </GlassCard>

          {/* --- Night Circuit Section --- */}
          <GlassCard>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>Night Circuit</Text>
                <View style={styles.headerButtons}>
                    <TouchableOpacity onPress={handleResetNightCircuit} style={{marginRight: 16}}>
                        <Feather name="rotate-ccw" size={20} color="#999"/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsNightCircuitDone(!isNightCircuitDone)}>
                        <Feather name="check-circle" size={24} color={isNightCircuitDone ? '#4CAF50' : '#DDD'}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Progress.Bar progress={nightCompletion} width={null} color={'#8A2BE2'} unfilledColor={'rgba(255,255,255,0.5)'} borderWidth={0} style={styles.progressBar}/>
            {nightCircuit.map((exercise, index) => (
               <View key={index} style={styles.listItem}>
                <Text style={styles.listItemIcon}>{exercise.icon}</Text>
                <View style={styles.listItemDetails}>
                  <Text style={styles.listItemTitle}>{exercise.name}</Text>
                  <Text style={styles.listItemSubtitle}>{nightCircuitProgress[exercise.name] || 0} / {exercise.sets} set of {exercise.reps} reps</Text>
                </View>
                <TouchableOpacity style={styles.plusButton} onPress={() => handleSetComplete(exercise.name, exercise.sets, true)}>
                  <Feather name="plus" size={24} color="#8A2BE2" />
                </TouchableOpacity>
              </View>
            ))}
          </GlassCard>
        </ScrollView>

        {/* Tutorial Modal */}
        <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
          <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
            {selectedTutorial && (
              <View style={styles.gifModalContainer}>
                <Text style={styles.gifTitle}>{selectedTutorial.name}</Text>
                <Image source={selectedTutorial.asset} style={styles.gifImage} resizeMode="contain" />
              </View>
            )}
          </Pressable>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    scrollContainer: { padding: 16, paddingTop: 40, paddingBottom: 50 },
    headerTitle: { fontFamily: 'Poppins-Bold', fontSize: 32, color: '#333' },
    headerSubtitle: { fontFamily: "Poppins-Regular", fontSize: 16, color: "#666", marginBottom: 24 },
    card: { padding: 20, borderRadius: 24, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    cardTitle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, color: '#444' },
    headerButtons: { flexDirection: 'row', alignItems: 'center' },
    progressBar: { marginVertical: 16, height: 8, borderRadius: 4 },
    listItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 8, padding: 8, borderRadius: 12 },
    listItemIcon: { fontSize: 36, marginRight: 16, width: 50, textAlign: 'center' },
    gifPreview: { width: 50, height: 50, marginRight: 16, borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.05)' },
    listItemDetails: { flex: 1 },
    listItemTitle: { fontFamily: 'Poppins-SemiBold', fontSize: 20, color: '#333' },
    listItemSubtitle: { fontFamily: 'Poppins-Regular', fontSize: 16, color: '#777' },
    plusButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(138, 43, 226, 0.1)', justifyContent: 'center', alignItems: 'center' },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)', justifyContent: 'center', alignItems: 'center' },
    gifModalContainer: { width: '90%', backgroundColor: '#fff', borderRadius: 16, padding: 16, alignItems: 'center' },
    gifTitle: { fontFamily: 'Poppins-Bold', fontSize: 22, marginBottom: 16 },
    gifImage: { width: Dimensions.get('window').width * 0.8, height: Dimensions.get('window').width * 0.8 },

    // Nutrition styles
    aiContainer: { marginTop: 20, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#eee' },
    aiTitle: { fontFamily: 'Poppins-SemiBold', fontSize: 16, color: '#333', marginBottom: 8, textAlign: 'center' },
    textInput: { fontFamily: 'Poppins-Regular', backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 12, padding: 12, fontSize: 14, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(220, 220, 220, 1)' },
    aiButton: { backgroundColor: '#8A2BE2', paddingVertical: 12, borderRadius: 12, alignItems: 'center', minHeight: 45, justifyContent: 'center' },
    aiButtonText: { fontFamily: 'Poppins-SemiBold', color: '#fff', fontSize: 16 },
    resultContainer: { marginTop: 16, padding: 12, backgroundColor: 'rgba(138, 43, 226, 0.1)', borderRadius: 12, alignItems: 'center' },
    resultText: { fontFamily: 'Poppins-Regular', fontSize: 16, color: '#333' },
    resultValue: { fontFamily: 'Poppins-Bold' },
});
