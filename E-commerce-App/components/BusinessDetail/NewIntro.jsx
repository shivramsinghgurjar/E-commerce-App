import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Colors } from './../../constants/Colors'
import { useFavorites } from '../../hooks/useFavorites';

export default function NewIntro({ business }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isToggling, setIsToggling] = useState(false);

  if (!business || !business.imageURL) {
    return (
      <View style={{
        height: 400,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={{
          backgroundColor: '#667eea',
          borderRadius: 50,
          padding: 20,
          shadowColor: '#667eea',
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 16,
          elevation: 10,
        }}>
          <Ionicons name="image-outline" size={60} color="white" />
        </View>
        <Text style={{
          marginTop: 15,
          fontFamily: 'outfit-medium',
          color: Colors.GREY,
          fontSize: 16,
        }}>
          Loading image...
        </Text>
      </View>
    );
  }

  const handleHeartPress = async () => {
    if (isToggling) return; // Prevent multiple rapid taps

    setIsToggling(true);
    try {
      await toggleFavorite(business);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const favoriteStatus = isFavorite(business.id);

  return (
    <View>
      {/* Header Controls */}
      <View style={{
        position: 'absolute',
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: "100%",
        padding: 20,
        marginTop: 20,
      }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            backgroundColor: 'rgba(0,0,0,0.3)',
            borderRadius: 20,
            padding: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.4,
            shadowRadius: 8,
            elevation: 8,
            borderWidth: 1,
            borderColor: 'rgba(255,255,255,0.2)',
          }}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleHeartPress}
          disabled={isToggling}
          style={{
            backgroundColor: favoriteStatus ? '#ff4757' : 'rgba(0,0,0,0.3)',
            borderRadius: 20,
            padding: 8,
            opacity: isToggling ? 0.7 : 1,
            shadowColor: favoriteStatus ? '#ff4757' : '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: favoriteStatus ? 0.4 : 0.4,
            shadowRadius: 8,
            elevation: 8,
            borderWidth: 1,
            borderColor: favoriteStatus ? 'rgba(255,71,87,0.3)' : 'rgba(255,255,255,0.2)',
          }}
        >
          <Ionicons
            name={favoriteStatus ? "heart" : "heart-outline"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Main Image */}
      <Image
        source={{ uri: business.imageURL }}
        style={{
          width: '100%',
          height: 350,
          resizeMode: 'cover',
        }}
      />

      {/* Content Section */}
      <View style={{
        padding: 20,
        marginTop: -30,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 12,
      }}>
        {/* Business Name and Category */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 10,
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 24,
              fontFamily: 'outfit-bold',
              color: '#1a1a1a',
              marginBottom: 5,
              textShadowColor: 'rgba(0,0,0,0.1)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            }}>
              {business.name}
            </Text>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 16,
              color: Colors.GREY,
              marginBottom: 8,
            }}>
              {business.address}
            </Text>
          </View>
          
          <View style={{
            backgroundColor: '#ff6b35',
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 15,
            shadowColor: '#ff6b35',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 6,
          }}>
            <Text style={{
              color: '#fff',
              fontFamily: 'outfit-bold',
              fontSize: 12,
              textTransform: 'uppercase',
              letterSpacing: 0.5,
            }}>
              {business.category}
            </Text>
          </View>
        </View>

        {/* Rating */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          marginBottom: 15,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff8e1',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#ffd54f',
            shadowColor: '#ffa000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Ionicons name="star" size={14} color="#ffa000" />
            <Text style={{
              fontFamily: 'outfit-bold',
              fontSize: 12,
              color: '#333',
              marginLeft: 4,
            }}>
              4.5
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}