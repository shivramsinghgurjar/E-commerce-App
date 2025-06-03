import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import {Colors} from './../../constants/Colors'
export default function NewIntro({business}) {
  const router=useRouter();
  if (!business || !business.imageURL) {
    return (
      <View style={{ height: 400, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading image...</Text>
      </View>
    );
  }
  return (
    <View>
       <View style={{
            position:'absolute',
            zIndex:10,
            display:'flex',
            flexDirection:'row',
            justifyContent:'space-between',
            width:"100%",
            padding:20,
            marginTop:20,
            }}>
            <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="arrow-back-circle" size={40} color="white" />
            </TouchableOpacity>
            <Ionicons name="heart-outline" size={40} color="white" />
        </View>
      <Image source={{uri:business.imageURL}}
      style={{
        width:'100%',
        height:400
      }}/>
    
    
    <View style={{
      padding:20,
      marginTop:-20,
      backgroundColor:'#FFF',
      borderTopLeftRadius:25,
      borderTopRightRadius:25
    }}>
      <Text style={{
        fontSize:26,
        fontFamily:'outfit-bold'
      }}>{business.name}</Text>
      <Text
      style={{
        fontFamily:'outfit',
        fontSize:18
      }}>{business.address}</Text>
    </View>
    
    </View>
  )
}