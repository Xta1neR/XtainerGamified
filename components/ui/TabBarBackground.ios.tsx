import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { StyleSheet, View } from 'react-native';

export default function BlurTabBarBackground() {
  return (
    <View
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(255,255,255,0.5)' }]}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
