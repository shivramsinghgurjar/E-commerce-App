import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from './../../constants/Colors'
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFavorites } from '../../hooks/useFavorites';

export default function PopularBusinessCard({ business }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isToggling, setIsToggling] = useState(false);

  const handleHeartPress = async (e) => {
    e.stopPropagation();
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
    <TouchableOpacity 
      onPress={() => router.push("/businessdetail/" + business.id)}
      style={{
        marginLeft: 20,
        marginRight: 10,
        backgroundColor: '#fff',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
        overflow: 'hidden',
      }}
    >
      <View style={{ position: 'relative' }}>
        <Image 
          source={{ uri: business.imageURL }}
          style={{
            width: 220,
            height: 140,
            resizeMode: 'cover',
          }}
        />
        
        {/* Gradient overlay for better text readability */}
        <View style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }} />
        
        {/* Category badge */}
        <View style={{
          position: 'absolute',
          top: 12,
          left: 12,
          backgroundColor: Colors.PRIMARY,
          paddingHorizontal: 8,
          paddingVertical: 4,
          borderRadius: 12,
        }}>
          <Text style={{
            color: '#fff',
            fontFamily: 'outfit-medium',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            {business.category}
          </Text>
        </View>
      </View>

      {/* Content section */}
      <View style={{
        padding: 16,
        paddingTop: 12,
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 16,
          color: '#333',
          marginBottom: 4,
          lineHeight: 20,
        }}>
          {business.name}
        </Text>
        
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 13,
          color: Colors.GREY,
          marginBottom: 12,
          lineHeight: 16,
        }}>
          {business.address}
        </Text>

        {/* Rating and additional info */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff8e1',
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 12,
          }}>
            <Ionicons name="star" size={14} color="#ffa000" />
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 12,
              color: '#333',
              marginLeft: 4,
            }}>
              4.5
            </Text>
          </View>

          {/* Favorite button */}
          <TouchableOpacity 
            onPress={handleHeartPress}
            disabled={isToggling}
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 18,
              padding: 6,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              opacity: isToggling ? 0.7 : 1,
            }}
          >
            <Ionicons 
              name={favoriteStatus ? "heart" : "heart-outline"} 
              size={16} 
              color={favoriteStatus ? "#ff4757" : "#666"} 
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}