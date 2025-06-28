import { ImageBackground, View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import { useUser } from '@clerk/clerk-expo';
import React from 'react'
import { Colors } from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Header({ onSearch, searchQuery }) {
  const { user } = useUser();
  const router = useRouter();

  const getGreeting = () => {
    return 'Welcome';
  };

  return (
    <ImageBackground 
      source={require('./../../assets/images/decor2.jpg')}
      style={{
        padding: 20,
        paddingTop: 50,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: Colors.PRIMARY,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
      imageStyle={{
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        resizeMode: 'cover',
        opacity: 0.9,
      }}
    >
      {/* Top Section with User Info and Notifications */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}> 
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}>
          <View style={{
            position: 'relative',
          }}>
            <Image 
              source={{ uri: user?.imageUrl }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                borderWidth: 2,
                borderColor: '#fff',
              }}
            />
            <View style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: '#4CAF50',
              borderWidth: 2,
              borderColor: '#fff',
            }} />
          </View>

          <View>
            <Text style={{
              color: '#fff',
              fontFamily: 'outfit',
              fontSize: 14,
              opacity: 0.9,
            }}>
              {getGreeting()},
            </Text>
            <Text style={{
              fontSize: 24,
              fontFamily: 'outfit-bold',
              color: '#fff',
              marginTop: 2,
            }}>
              {user?.fullName || 'User'}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => router.push('/(tabs)/profile')}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 20,
            padding: 8,
          }}
        >
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 6,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',
      }}>
        <Ionicons name="search" size={20} color={Colors.PRIMARY} /> 
        <TextInput 
          placeholder='Search businesses, categories...' 
          placeholderTextColor={Colors.GREY}
          value={searchQuery}
          onChangeText={onSearch}
          style={{
            flex: 1,
            fontFamily: 'outfit',
            fontSize: 16,
            marginLeft: 10,
            color: '#333',
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => onSearch('')}>
            <Ionicons name="close-circle" size={18} color={Colors.GREY} />
          </TouchableOpacity>
        )}
      </View>

      {/* Quick Stats or Tips */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingHorizontal: 5,
      }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
          <Ionicons name="location-outline" size={16} color="#fff" />
          <Text style={{
            color: '#fff',
            fontFamily: 'outfit',
            fontSize: 12,
            opacity: 0.9,
          }}>
            Discover local businesses
          </Text>
        </View>
        
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
          <Ionicons name="star-outline" size={16} color="#fff" />
          <Text style={{
            color: '#fff',
            fontFamily: 'outfit',
            fontSize: 12,
            opacity: 0.9,
          }}>
            Rate & review
          </Text>
        </View>
      </View>
    </ImageBackground>
  )
}