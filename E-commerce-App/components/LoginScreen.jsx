import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'
//import { Colors } from 'react-native/Libraries/NewAppScreen'
// import {Colors} from './../../constants/Colors'

export default function LoginScreen() {
  return (
    <View>
      <View style={{
        display:'flex',
        alignItems:'center',
        margin:100
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

      <View style={{backgroundColor:'#fff', padding:20}}>
        <Text>Your Ultimate 
          <Text style={{
            color:Colors.PRIMARY
          }}>E-commerce</Text> App</Text>
      </View>
    </View>
  )
}
