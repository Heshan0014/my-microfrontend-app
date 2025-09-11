import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fdf7f2', '#f2e6db']}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.shape, styles.shapeTopLeft]} />
      <View style={[styles.shape, styles.shapeBottomRight]} />

      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>Glidex</Text>
      </View>

      <View style={styles.imageWrapper}>
        <Image
          source={require('../../assets/images/model1.png')}
          style={styles.leftImage}
        />
        <View style={styles.rightImageColumn}>
          <Image
            source={require('../../assets/images/model2.png')}
            style={styles.rightImage}
          />
          <Image
            source={require('../../assets/images/model3.png')}
            style={styles.rightImage}
          />
        </View>
      </View>

      <Text style={styles.tagline}>
        The Fashion App Where{'\n'}Your Designs Meet the World
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.buttonText}>Let’s Get Started</Text>
      </TouchableOpacity>

      {/* Sign In link */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={styles.signIn}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fdf7f2',
  },

  logoContainer: {
    position: 'absolute',
    top: 80,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoImage: {
    width: 55, // adjust size
    height: 55,
    marginRight: 8,
  },
  logoText: {
    fontSize: 40,
    fontWeight: '600',
    color: '#000',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#000',
    marginRight: 8,
  },

  brand: {
    fontSize: 32,
    fontWeight: '600',
    color: '#000',
  },

  imageWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },

  leftImage: {
    width: 120,
    height: 280,
    borderRadius: 60,
    marginRight: 20,
  },

  rightImageColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  rightImage: {
    width: 90,
    height: 120,
    borderRadius: 45,
    marginVertical: 8,
  },

  tagline: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 40,
    fontWeight: '500',
  },

  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  footerText: {
    fontSize: 14,
    color: '#333',
  },

  signIn: {
    color: '#007bff',
    fontWeight: '600',
    fontSize: 14,
  },

  shape: {
    position: 'absolute',
    backgroundColor: '#e8d5c5',
    opacity: 0.6,
    borderRadius: 200,
    width: width * 0.9,
    height: height * 0.5,
  },

  shapeTopLeft: {
    top: -height * 0.2,
    left: -width * 0.3,
  },

  shapeBottomRight: {
    bottom: -height * 0.2,
    right: -width * 0.3,
    backgroundColor: '#f1e1d3',
    transform: [{ rotate: '-20deg' }],
  },
});
