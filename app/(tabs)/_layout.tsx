import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const ACTIVE_COLOR = '#8A2BE2';
const INACTIVE_COLOR = '#b0b0b0';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,
          elevation: 5,
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          height: 100,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontFamily: 'Poppins-SemiBold',
          fontSize: 10,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={26} color={color} />,
        }}
      />
      {/* --- NEW SCREEN ADDED HERE --- */}
      <Tabs.Screen
        name="workout" // This matches workout.tsx
        options={{
          title: 'Workout',
          tabBarIcon: ({ color }) => <Feather name="heart" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="projects"
        options={{
          title: 'Projects',
          tabBarIcon: ({ color }) => <Feather name="briefcase" size={26} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ai"
        options={{
          title: 'Assistant',
          tabBarIcon: ({ color }) => <Feather name="cpu" size={26} color={color} />,
        }}
      />
    </Tabs>
  );
}