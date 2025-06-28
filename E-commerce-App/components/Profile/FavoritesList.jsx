import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import { useFavorites } from '../../hooks/useFavorites'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function FavoritesList() {
  const { favorites, loading, removeFromFavorites } = useFavorites();
  const router = useRouter();

  const renderFavoriteItem = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => router.push("/businessdetail/" + item.businessId)}
      style={{
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 20,
        marginVertical: 5,
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <Image
        source={{ uri: item.businessImage }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 10,
        }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 18,
          marginBottom: 5,
        }}>
          {item.businessName}
        </Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 14,
          color: Colors.GREY,
          marginBottom: 5,
        }}>
          {item.businessAddress}
        </Text>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
        }}>
          <View style={{
            backgroundColor: Colors.PRIMARY,
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 10,
          }}>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 12,
              color: '#fff',
            }}>
              {item.businessCategory}
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => removeFromFavorites(item.businessId)}
        style={{
          padding: 8,
          borderRadius: 20,
          backgroundColor: '#ffebee',
        }}
      >
        <Ionicons name="heart" size={20} color="#ff4757" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
      }}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  if (favorites.length === 0) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
      }}>
        <Ionicons name="heart-outline" size={60} color={Colors.GREY} />
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 18,
          color: Colors.GREY,
          marginTop: 15,
          textAlign: 'center',
        }}>
          No favorites yet
        </Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 14,
          color: Colors.GREY,
          marginTop: 5,
          textAlign: 'center',
        }}>
          Start adding businesses to your favorites!
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20,
        }}>
          My Favorites ({favorites.length})
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
        }}
      >
        {favorites.map((item) => renderFavoriteItem(item))}
      </ScrollView>
    </View>
  );
} 