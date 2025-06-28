import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../constants/Colors'
import FavoritesList from '../components/Profile/FavoritesList'

export default function Favorites() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        marginTop: 30,
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            marginRight: 15,
          }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.PRIMARY} />
        </TouchableOpacity>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
        }}>
          My Favorites
        </Text>
      </View>

      {/* Favorites List */}
      <FavoritesList />
    </SafeAreaView>
  )
} 