import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import PhysicsSimulation from '@/components/PhysicsSimulation';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GlassPanel } from '@/components/GlassPanel';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1A1A1A' }}
      headerImage={
        <LinearGradient
          colors={['#4ECDC4', '#45B7D1', '#FF6B6B']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      }>
      <ThemedView style={styles.content}>
        <GlassPanel style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Lab</ThemedText>
        </GlassPanel>
        <GlassPanel style={styles.instructionContainer}>
          <ThemedText style={styles.text}>Configure the variables below and start experimenting!</ThemedText>
        </GlassPanel>
        <SafeAreaView style={styles.simulationContainer}>
          <StatusBar barStyle="dark-content" />
          <PhysicsSimulation />
        </SafeAreaView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  content: {
    padding: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  instructionContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  simulationContainer: {
    flex: 1,
    width: '100%',
  },
});

