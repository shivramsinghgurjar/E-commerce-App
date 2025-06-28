import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'

export default function About({business}) {
  return (
    <View style={{
        padding: 24,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <View style={{
          width: 4,
          height: 24,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 2,
          marginRight: 12,
        }} />
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 22,
          color: '#1a1a1a',
          textShadowColor: 'rgba(0,0,0,0.1)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}>
          About
        </Text>
      </View>
      
      <View style={{
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 12,
        borderLeftWidth: 3,
        borderLeftColor: Colors.PRIMARY,
      }}>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 15,
          lineHeight: 24,
          color: '#333',
          textAlign: 'justify',
        }}>
          {business?.about}
        </Text>
      </View>
    </View>
  )
}