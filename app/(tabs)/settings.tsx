import { useState } from 'react';
import { ActivityIndicator, Button, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import { FirebaseError } from '@firebase/util';

export default function Settings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
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

  return (
    <View>
      <KeyboardAvoidingView behavior='padding'>
        <TextInput
          style={styles.input}
          value={email}
          placeholder='Email'
          autoCapitalize='none'
          keyboardType='email-address'
        />
        <TextInput
          style={styles.input}
          value={password}
          secureTextEntry
          placeholder='Password'
        />

      {loading ? (
        <ActivityIndicator size={'small'} style={{margin: 28}}/>
      ) : (
        <>
          <Button title='Sign Up' onPress={signUp} />
          <Button title='Sign In' onPress={signIn} />
        </>
      )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});