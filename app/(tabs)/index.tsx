import React from 'react';
import { StyleSheet, Animated, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native-gesture-handler';
import { GlassPanel } from '@/components/GlassPanel';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type RootTabParamList = {
  index: undefined;
  lab: undefined;
  material: undefined;
  exercise: undefined;
};

type HomeScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'index'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const navigateToLab = () => {
    navigation.navigate('lab'); // Sesuaikan dengan nama rute
  };
  

  return (
    <View style={styles.container}>
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1A1A1A' }}
      headerImage={
        <LinearGradient
          colors={['#FF6B6B', '#4ECDC4', '#45B7D1']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      }>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <GlassPanel style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>Welcome to PhyLab!</ThemedText>
        </GlassPanel>
        <GlassPanel style={styles.introContainer}>
          <ThemedText type="subtitle" style={styles.subtitle}>Let us Introduce Ourselves</ThemedText>
          <ThemedText style={styles.text}>
            We, Muhammad Ridho Rabbani 18222098 and Mattheuw Suciadi Wijaya 18222048, created this app to demonstrate the Laws of Physics in a simple way. We hope you enjoy it!
          </ThemedText>
        </GlassPanel>
        <GlassPanel style={styles.startContainer}>
          <ThemedText type="subtitle" style={styles.subtitle}>Start Experimenting</ThemedText>
          <ThemedText style={styles.text}>
            Ready to dive into the world of physics? Tap the button below to start your journey!
          </ThemedText>
          <TouchableOpacity style={styles.labButton} onPress={navigateToLab}>
            <LinearGradient
              colors={['#FF6B6B', '#4ECDC4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <ThemedText style={styles.buttonText}>Go to Lab</ThemedText>
            </LinearGradient>
          </TouchableOpacity>
        </GlassPanel> 
      </Animated.View>
    </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  headerGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  titleContainer: {
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
  },
  introContainer: {
    padding: 20,
    marginBottom: 20,
  },
  startContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  labButton: {
    marginTop: 20,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});