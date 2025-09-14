import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function SignInScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      setLoading(true);

      // 🔑 Call backend login API
      const response = await axios.post('http://10.0.2.2:8080/api/auth/login', {
        email,
        password,
      });

      const { token, role, message } = response.data;

      Alert.alert('Success', message || 'Login successful');

      // TODO: store token in AsyncStorage or SecureStore for persistence
      // await AsyncStorage.setItem('authToken', token);

      // Navigate based on role
      if (role === 'Customer') {
        navigation.replace('Welcome');
      } else if (role === 'Designer') {
        navigation.replace('SignUp'); // or approval/pending page
      } else {
        navigation.replace('Loading');
      }
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      Alert.alert(
        'Login Failed',
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password tapped!');
  };

  const handleGoogleSignIn = () => {
    Alert.alert('Google Sign In tapped!');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Decorative shapes */}
      <View style={[styles.shape, styles.shapeTopLeft]} />
      <View style={[styles.shape, styles.shapeBottomRight]} />
      {/* <View style={[styles.shapeSmall, styles.shapeCenter]} /> */}

      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Welcome to Glidx Fashion App</Text>

        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleForgotPassword}
          style={{ width: '100%' }}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSignIn} // or the screen name you want
        >
          <Text style={styles.buttonText}>Sign In</Text>
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
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.signUpText}>
              Don’t have an account?{' '}
              <Text
                style={styles.link}
                onPress={() => navigation.navigate('Register')}
              >
                Sign up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#f2e6db',
    position: 'relative',
  },
  content: {
    width: '100%',
    maxWidth: 400,
    zIndex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  forgotPassword: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 20,
    marginTop: -10,
    textAlign: 'right',
  },

  button: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
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
  signUpText: {
    marginTop: 15,
    fontSize: 14,
    color: '#000',
  },
  link: {
    color: '#000',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  // Shapes
  shape: {
    position: 'absolute',
    borderRadius: 200,
    width: width * 1.2,
    height: height * 0.6,
    opacity: 0.6,
    zIndex: 0,
  },
  shapeTopLeft: {
    top: -height * 0.25,
    left: -width * 0.3,
    backgroundColor: '#d7cec5ff',
    transform: [{ rotate: '25deg' }],
  },
  shapeBottomRight: {
    bottom: -height * 0.25,
    right: -width * 0.3,
    backgroundColor: '#e7ceb7ff',
    transform: [{ rotate: '-20deg' }],
  },
  shapeCenter: {
    top: height * 0.35,
    right: -50,
  },
});
