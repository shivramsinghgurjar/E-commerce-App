import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
import * as WebBrowser from  "expo-web-browser";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import { useOAuth } from '@clerk/clerk-expo';
import { router, useRouter } from "expo-router";


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({strategy: "oauth_google"});

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = 
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({session: createdSessionId});
        // 🚀 Navigate to the home page after successful sign-in!
        router.replace("/");
      } else {
        // use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [router]);

  return (
    <View>
      <View style={{
        display:'flex',
        alignItems:'center',
        marginTop:100
      }}>
        <Image source={require('./../assets/images/login.jpg')} 
          style={{
            width:220,
            height:450,
            borderRadius:20,
            borderWidth:6,
            borderColor:'#000'
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={{
          fontSize:35,
          fontFamily:'outfit-bold',
          textAlign:'center'
        }}>YOUR ULTIMATE
          <Text style={{
            color:Colors.PRIMARY
          }}> E-COMMERCE</Text> APP</Text>
          <Text style={{
            fontSize:15,
            fontFamily:'outfit',
            textAlign:'center',
            marginVertical:15,
            color:Colors.GREY
          }}>FIND YOUR FAVOURITE HANDICRAFT WORK COMMUNITY AND CONNECT Abcedfg</Text>
          <TouchableOpacity style={styles.btn}
          onPress={onPress}
          >
            <Text style={{
              textAlign:'center',
              fontSize:18,
              color:'#fff',
              fontFamily:'outfit'
            }}>Get Started</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  subContainer:{backgroundColor:'#fff', padding:20,
    marginTop:-50,
  },
  btn:{
    backgroundColor:Colors.PRIMARY,
    padding:10,
    borderRadius:80,
    marginTop:20
  }
})