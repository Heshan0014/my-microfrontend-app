import React, { useState } from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
<<<<<<< HEAD
import { RootStackParamList } from './App'; // 👈 import global type
=======
import { RootStackParamList } from '../../App'; // 👈 import global type
>>>>>>> induwara

const { width, height } = Dimensions.get('window');

// ✅ Fix: Use "RegisterScreen" not "Register"
type Props = NativeStackScreenProps<RootStackParamList, 'RegisterScreen'>;

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'Designer' | 'Customer'>('Customer');

  const handleGoogleSignIn = () => {
    Alert.alert('Google Sign In tapped!');
  };

  const onRegister = async () => {
    if (!agree) {
      Alert.alert('Error', 'You must agree to the Terms & Conditions');
      return;
    }

    if (!name || !email || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      if (role === 'Designer') {
        // Simulate designer request
        console.log('Designer request:', { name, email });

        Alert.alert(
          'Request Sent',
          'Your request has been sent to the admin. You will be notified once approved.'
        );
      } else {
        // Simulate customer registration
        console.log('Customer registered:', { name, email });

        Alert.alert('Registration Successful', 'You are now registered!');
        navigation.navigate('SignInScreen');
      }

      // Reset form
      setName('');
      setEmail('');
      setPassword('');
      setAgree(false);
      setRole('Customer');
    } catch (e: any) {
      Alert.alert('Registration Failed', e.message ?? String(e));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={['#fdf7f2', '#f2e6db']}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={[styles.shape, styles.shapeBottomRight]} />

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Fill your information below or register with your social account
        </Text>

        {/* Role selection */}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[role === 'Customer' && styles.roleSelected]}
            onPress={() => setRole('Customer')}
          >
            <Text>Customer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[role === 'Designer' && styles.roleSelected]}
            onPress={() => setRole('Designer')}
          >
            <Text>Designer</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="example@gmail.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="************"
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={24}
              color="#999"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAgree(!agree)}
        >
          <View style={[styles.checkbox, agree && styles.checkedBox]}>
            {agree && (
              <MaterialCommunityIcons name="check" size={16} color="#fff" />
            )}
          </View>
          <Text style={styles.checkboxText}>
            Agree with <Text style={styles.link}>Terms & Conditions</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onRegister}>
          <Text style={styles.buttonText}>
            {role === 'Designer' ? 'Send Request' : 'Register'}
          </Text>
        </TouchableOpacity>

        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or sign in with</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
        >
          <Image
            source={require('../../assets/images/google.png')}
            style={styles.googleIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <Text style={styles.signInText}>
            Already have an account?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('SignInScreen')}
            >
              Sign In
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  roleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 12,
  },
  roleSelected: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginHorizontal: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    marginVertical: 12,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 14,
    marginVertical: 8,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#999',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedBox: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  checkboxText: {
    fontSize: 14,
  },
  link: {
    color: '#000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#201e1e',
  },
  orText: {
    marginHorizontal: 10,
    fontSize: 14,
    color: '#4b4949',
  },
  googleButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 12,
    borderRadius: 12,
  },
  googleIcon: {
    width: 40,
    height: 40,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  signInText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
  },
  shape: {
    position: 'absolute',
    backgroundColor: '#EED9C4',
    opacity: 0.6,
    borderRadius: 0,
    width: width * 0.6,
    height: height * 0.85,
  },
  shapeBottomRight: {
    bottom: -height * 0.3,
    right: width * 0.5,
    backgroundColor: '#D9B99B',
    borderRadius: 0,
    transform: [{ rotate: '300deg' }],
  },
});
