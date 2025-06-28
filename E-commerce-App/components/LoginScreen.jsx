import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';
import { router, useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = 
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.replace("/");
      } else {
        // use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      {/* Top Section with Icons */}
      <View style={styles.topSection}>
        <View style={styles.iconContainer}>
          {/* Main App Icon */}
          <View style={styles.mainIconContainer}>
            <Ionicons name="business" size={60} color="#fff" />
          </View>
          
          {/* Decorative elements */}
          <View style={styles.decorativeElement1}>
            <Ionicons name="star" size={16} color="#FFD700" />
          </View>
          <View style={styles.decorativeElement2}>
            <Ionicons name="heart" size={14} color="#FF6B6B" />
          </View>
          <View style={styles.decorativeElement3}>
            <Ionicons name="location" size={14} color="#4ECDC4" />
          </View>
          <View style={styles.decorativeElement4}>
            <Ionicons name="sparkles" size={12} color="#FF9800" />
          </View>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.contentContainer}>
          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.mainTitle}>
              Discover Amazing
              <Text style={styles.highlightText}> Handicrafts</Text>
            </Text>
            
            <Text style={styles.subtitle}>
              Connect with talented artisans and explore unique handmade treasures
            </Text>

            {/* Features */}
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Ionicons name="search" size={16} color={Colors.PRIMARY} />
                <Text style={styles.featureText}>Discover unique businesses</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Ionicons name="heart" size={16} color={Colors.PRIMARY} />
                <Text style={styles.featureText}>Save your favorites</Text>
              </View>
              
              <View style={styles.featureItem}>
                <Ionicons name="star" size={16} color={Colors.PRIMARY} />
                <Text style={styles.featureText}>Rate and review</Text>
              </View>
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            style={styles.loginButton}
          onPress={onPress}
            activeOpacity={0.8}
          >
            <Ionicons name="logo-google" size={20} color="#fff" />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Footer Text */}
          <Text style={styles.footerText}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  topSection: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    backgroundColor: Colors.PRIMARY,
  },
  iconContainer: {
    position: 'relative',
  },
  mainIconContainer: {
    position: 'relative',
  },
  decorativeElement1: {
    position: 'absolute',
    top: -15,
    right: -10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  decorativeElement2: {
    position: 'absolute',
    bottom: -10,
    left: -10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  decorativeElement3: {
    position: 'absolute',
    top: -10,
    left: -10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  decorativeElement4: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 12,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bottomSection: {
    flex: 1.6,
    marginTop: 0,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 40,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  textContainer: {
    flex: 1,
  },
  mainTitle: {
    fontSize: 30,
    fontFamily: 'outfit-bold',
    textAlign: 'center',
    color: '#333',
    lineHeight: 38,
    marginBottom: 12,
  },
  highlightText: {
    color: Colors.PRIMARY,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: 'outfit',
    textAlign: 'center',
    color: Colors.GREY,
    lineHeight: 22,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  featuresContainer: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 4,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'outfit-medium',
    color: '#333',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 10,
    marginBottom: 20,
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    fontSize: 17,
    fontFamily: 'outfit-bold',
    color: '#fff',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'outfit',
    textAlign: 'center',
    color: Colors.GREY,
    lineHeight: 18,
  },
})