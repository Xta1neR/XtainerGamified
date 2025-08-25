import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function PomodoroScreen() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pomodoro</Text>

      <AnimatedCircularProgress
        size={250}
        width={12}
        fill={((25 * 60 - timeLeft) / (25 * 60)) * 100}
        tintColor="#3b82f6"
        backgroundColor="#dbeafe"
        rotation={0}
        lineCap="round"
      >
        {() => (
          <Text style={styles.timerText}>
            {minutes}:{seconds}
          </Text>
        )}
      </AnimatedCircularProgress>

      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setIsRunning(!isRunning)}>
          <LinearGradient
            colors={["#60a5fa", "#3b82f6"]}
            style={styles.button}
          >
            <Ionicons
              name={isRunning ? "pause" : "play"}
              size={28}
              color="white"
            />
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setIsRunning(false); setTimeLeft(25*60); }}>
          <LinearGradient
            colors={["#93c5fd", "#60a5fa"]}
            style={styles.button}
          >
            <Ionicons name="stop" size={28} color="white" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
    color: "#1e3a8a",
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#1e40af",
  },
  controls: {
    flexDirection: "row",
    marginTop: 30,
    gap: 20,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
});
