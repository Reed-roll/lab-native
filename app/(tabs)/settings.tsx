import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, TouchableOpacity, View, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import { FirebaseError } from '@firebase/util';

import { Text } from 'react-native';

export default function Settings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const signUp = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert('User account created & signed in!');
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Registration failed! ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert('User signed in!');
    } catch (e: any) {
      const err = e as FirebaseError;
      alert('Sign in failed! ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.formContainer}
      >
        <Animated.View style={[styles.formInner, { opacity: fadeAnim }]}>
          <View style={styles.card}>
            <Text style={styles.title}>
              {mode === 'signin' ? 'Sign In' : 'Sign Up'}
            </Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder='Email'
                placeholderTextColor="#999"
                autoCapitalize='none'
                keyboardType='email-address'
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder='Password'
                placeholderTextColor="#999"
              />
            </View>
            {mode === 'signup' && (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  placeholder='Confirm Password'
                  placeholderTextColor="#999"
                />
              </View>
            )}
            {loading ? (
              <ActivityIndicator size="large" color="#FF6B6B" style={styles.loader} />
            ) : (
              <TouchableOpacity
                style={styles.button}
                onPress={mode === 'signin' ? signIn : signUp}
              >
                <LinearGradient
                  colors={['#FF6B6B', '#4ECDC4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradient}
                >
                  <Text style={styles.buttonText}>
                    {mode === 'signin' ? 'Sign In' : 'Sign Up'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={toggleMode} style={styles.toggleButton}>
              <Text style={styles.toggleText}>
                {mode === 'signin' 
                  ? "Don't have an account? Sign Up" 
                  : "Already have an account? Sign In"}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e3a8a', // Dark blue background
  },
  formContainer: {
    width: '90%',
    maxWidth: 400,
  },
  formInner: {
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#333',
  },
  button: {
    marginTop: 24,
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loader: {
    marginTop: 24,
  },
  toggleButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  toggleText: {
    color: '#666',
    fontSize: 14,
  },
});

