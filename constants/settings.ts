export const settingsData = {
  profile: {
    name: 'Jinwoo',
    email: 'jinwoo@sololeveling.com',
    avatar: '👤' // Placeholder emoji for an avatar
  },
  menuSections: [
    {
      title: 'Preferences',
      items: [
        { id: '1', label: 'Notifications', icon: 'bell', screen: 'Notifications' },
        { id: '2', label: 'Appearance', icon: 'sun', screen: 'Appearance' },
      ],
    },
    {
      title: 'Support',
      items: [
        { id: '3', label: 'Help & Feedback', icon: 'help-circle', screen: 'Help' },
        { id: '4', label: 'Privacy Policy', icon: 'shield', screen: 'Privacy' },
        { id: '5', label: 'Terms of Service', icon: 'file-text', screen: 'Terms' },
      ],
    },
    {
      title: 'Account',
      items: [
        { id: '6', label: 'Log Out', icon: 'log-out', screen: 'Logout', color: '#ff6b6b' },
      ],
    },
  ],
};