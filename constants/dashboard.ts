export const dashboardData = {
  // We'll use this name in the header
  userName: "Rituraj",
  
  // Stats to be shown in summary cards
  dailyStats: [
    { id: '1', label: 'Calories', value: '1250 / 2500', icon: '🔥', progress: 0.5 },
    { id: '2', label: 'Steps', value: '4.3k / 10k', icon: '👟', progress: 0.43 },
    { id: '3', label: 'Water', value: '2.1 / 3L', icon: '💧', progress: 0.7 },
  ],
  
  // Daily habits to be tracked
  habits: [
    { id: 'h1', text: 'Morning Protein-Curd Bowl', completed: true, icon: '🥣' },
    { id: 'h2', text: 'Read 10 pages of a book on System Design', completed: false, icon: '📚' },
    { id: 'h3', text: 'Complete daily DSA problem (LeetCode)', completed: false, icon: '💻' },
    { id: 'h4', text: 'Evening Walk (30 mins)', completed: true, icon: '🚶' },
    { id: 'h5', text: 'Night Circuit (Push-ups, Squats, etc.)', completed: false, icon: '💪' },
    { id: 'h6', text: 'Plan tomorrow\'s tasks', completed: false, icon: '📝' },
  ],
};