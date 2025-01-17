import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassPanelProps extends ViewProps {
  intensity?: number;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({ children, style, intensity = 0.2, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.5)']}
        style={styles.gradient}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,  // Increased from 20
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradient: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Added more opacity for better contrast on white
  },
});

