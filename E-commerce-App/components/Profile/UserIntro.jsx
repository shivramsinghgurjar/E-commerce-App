import { View, Text, Image } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Colors } from './../../constants/Colors'

export default function UserIntro() {
  const { user } = useUser();
  
  return (
    <View style={{
      paddingHorizontal: 20,
      paddingVertical: 30,
      backgroundColor: '#fff',
      marginHorizontal: 2,
      marginTop: 20,
      borderRadius: 24,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 8,
    }}>
      {/* User Info Section */}
      <View style={{
        alignItems: 'center',
      }}>
        {/* Profile Image */}
        <View style={{
          position: 'relative',
          marginBottom: 20,
        }}>
          <Image 
            source={{ uri: user?.imageUrl }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 4,
              borderColor: '#fff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 8,
              },
              shadowOpacity: 0.2,
              shadowRadius: 16,
              elevation: 12,
            }}
          />
          <View style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 20,
            padding: 6,
            borderWidth: 3,
            borderColor: '#fff',
            shadowColor: Colors.PRIMARY,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 4,
            elevation: 4,
          }}>
            <Text style={{
              color: '#fff',
              fontFamily: 'outfit-bold',
              fontSize: 12,
            }}>
              ✓
            </Text>
          </View>
        </View>

        {/* User Details */}
        <View style={{
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          paddingHorizontal: 24,
          paddingVertical: 20,
          borderRadius: 16,
          borderWidth: 1,
          borderColor: '#e9ecef',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 22,
            color: '#1a1a1a',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            {user?.fullName}
          </Text>
          
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#e9ecef',
          }}>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 14,
              color: Colors.GREY,
              textAlign: 'center',
            }}>
              {user?.primaryEmailAddress?.emailAddress}
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}