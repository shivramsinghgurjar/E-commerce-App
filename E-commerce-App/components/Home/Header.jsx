import { View, Text , Image ,TextInput,TextStyle} from 'react-native'

import React from 'react'
import {Colors} from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons/Ionicons';
export default function Header() {
    // const {user}=useUser();
  return (
    <View>
        <Text style={{fontSize:40,fontFamily:'outfit-bold'}}>home</Text>
    </View>
    /*<View style={{
        padding:20,
        paddingTop:40,
        backgroundColor:Colors.PRIMARY,
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20

    }}>
      <View style={{
        display:'flex',
        flexDirection:'row',
        alignItem:'center',
        gap:10
      }}>
        {/* { <Image source={{uri:user?.imageUrl}}
        style={{
            width:45,
            height:45,
            bordreRadius:99
        }}></Image> } }
        <View>
            <Text style={{
                color:'#fff'
            }}>Welcome,</Text>
            <Text style={{
                fontSize:19,
                fontFamily:'outfit-medium'
            }}>user?.fullName</Text>
        </View>
        </View>
        <View style={{
            display:'flex',
            flexDirection:'row',
            gap:10,
            alignItem:'center',
            backgroundColor:'#fff',
            padding:10,
            marginVertical:10,
            marginTop:15,
            BorderRadius:8
        }}>
           <Ionicons name="search" size={24} color={Colors.PRIMARY} />
           <TextInput placeholder='Search...'/>
           style={{
            fontFamily:'outfit',
            fontSize:16
           }}
        </View>
    </View>
    */
  )
}