import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import PhysicsSimulation from '@/components/PhysicsSimulation';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Lab() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Lab</ThemedText>
      </ThemedView>
      <ThemedText style={styles.descriptionText}>Configure the variables below and start experimenting!</ThemedText>
      <PhysicsSimulation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  descriptionText: {
    marginBottom: 16,
  },
});
