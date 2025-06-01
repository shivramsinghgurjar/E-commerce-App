import { View, Text , Image ,TextInput,TextStyle} from 'react-native'
import { useUser } from '@clerk/clerk-expo';
import React from 'react'
import {Colors} from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
export default function Header() {
  const {user} =useUser();
  return (
    <View style={{
      padding:10,
      paddingTop:30,
      backgroundColor:Colors.PRIMARY,
      borderBottomLeftRadius:20,
      borderBottomRightRadius:20
    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        gap:15
      }}> 
        <Image source={{uri:user?.imageUrl}}
        style={{
          marginTop:5,
          marginLeft:5,
          width:45,
          height:45,
          borderRadius:99
        }}/>

      <View>
        <Text style={{
          color:'#fff',
        }}>Welcome,</Text>
        <Text style={{
          fontSize:19,
          fontFamily:'outfit-medium',
          color:'#fff',
        }}>{user?.fullName}</Text>
      </View>
      </View>
      {
        /* Search Bar */
      }
      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        backgroundColor:'#fff',
        padding:3,
        paddingLeft:6,
        marginVertical:20,
        marginTop:15,
        borderRadius:12,
        paddingHorizontal:15,
        width:370
      }}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY}/> 
        <TextInput placeholder='Search ...'/>
      </View>
    </View>

  )
}