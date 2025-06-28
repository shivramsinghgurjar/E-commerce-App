import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import UserIntro from '../../components/Profile/UserIntro'
import MenuList from '../../components/Profile/MenuList'
import { useFavorites } from '../../hooks/useFavorites'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../../constants/Colors'

export default function profile() {
  const { favorites, loading } = useFavorites();
  const router = useRouter();

  const renderFavoritePreview = () => {
    if (loading) {
      return (
        <View style={{
          padding: 20,
          alignItems: 'center',
        }}>
          <Text style={{
            fontFamily: 'outfit',
            color: Colors.GREY,
          }}>
            Loading favorites...
          </Text>
        </View>
      );
    }

    if (favorites.length === 0) {
      return (
        <View style={{
          padding: 20,
          alignItems: 'center',
        }}>
          <Ionicons name="heart-outline" size={40} color={Colors.GREY} />
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 16,
            color: Colors.GREY,
            marginTop: 10,
            textAlign: 'center',
          }}>
            No favorites yet
          </Text>
        </View>
      );
    }

    return (
      <View style={{
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
        }}>
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 18,
          }}>
            Recent Favorites ({favorites.length})
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/favorites')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 14,
              color: Colors.PRIMARY,
            }}>
              View All
            </Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>
        
        {/* Show first 3 favorites */}
        {favorites.slice(0, 3).map((item, index) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => router.push("/businessdetail/" + item.businessId)}
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 12,
              marginBottom: 8,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 2,
              elevation: 2,
            }}
          >
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 8,
              backgroundColor: '#f0f0f0',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Ionicons name="business" size={24} color={Colors.PRIMARY} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 16,
                marginBottom: 2,
              }}>
                {item.businessName}
              </Text>
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 12,
                color: Colors.GREY,
              }}>
                {item.businessAddress}
              </Text>
            </View>
            <Ionicons name="heart" size={16} color="#ff4757" />
          </TouchableOpacity>
        ))}
        
        {favorites.length > 3 && (
          <TouchableOpacity
            onPress={() => router.push('/favorites')}
            style={{
              alignItems: 'center',
              paddingVertical: 10,
            }}
          >
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 14,
              color: Colors.PRIMARY,
            }}>
              +{favorites.length - 3} more favorites
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderProfileContent = () => (
    <View style={{
      padding: 20
    }}>
      {/* Profile Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 24,
      }}>
        <View style={{
          width: 4,
          height: 32,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 2,
          marginRight: 12,
        }} />
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 32,
          color: '#1a1a1a',
          textShadowColor: 'rgba(0,0,0,0.1)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}>
          Profile
        </Text>
      </View>

      {/* User Info */}
      <UserIntro />

      {/* Favorites Preview */}
      <View style={{
        backgroundColor: '#fff',
        borderRadius: 15,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
        {renderFavoritePreview()}
      </View>

      {/* Menu List */}
      <MenuList />
    </View>
  );

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#f8f9fa',
    }}>
      <FlatList
        data={[{ key: 'profile' }]}
        renderItem={() => renderProfileContent()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />
    </View>
  )
}