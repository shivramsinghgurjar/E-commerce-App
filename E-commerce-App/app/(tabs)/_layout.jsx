import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import Ionicons from '@expo/vector-icons/Ionicons'; 
import {Colors} from './../../constants/Colors'
export default function TabLayout() {
  return (
    <Tabs screenOptions={{headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
    }}>
      <Tabs.Screen name='home'
      options={{
        tableLable:'Home',
        tabBarIcon:({color})=><Ionicons name="home"
         size={24} color={color} />
      }}/>
      
      <Tabs.Screen name='explore'
      options={{
        tableLable:'Explore',
        tabBarIcon:({color})=><Ionicons name="search"
         size={24} color={color} />
      }}/>
      <Tabs.Screen name='profile'
      options={{
        tableLable:'Profile',
        tabBarIcon:({color})=><Ionicons name="people-circle"
         size={24} color={color} />
      }}/>
    </Tabs>
  )
}