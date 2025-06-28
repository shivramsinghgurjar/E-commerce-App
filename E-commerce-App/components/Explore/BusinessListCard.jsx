import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../../constants/Colors'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFavorites } from '../../hooks/useFavorites';

export default function BusinessListCard({ business }) {
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
            onPress={() => router.push({
                pathname: '/businessdetail/[businessid]',
                params: { businessid: business.id }
            })}
            style={{
                backgroundColor: '#fff',
                borderRadius: 20,
                marginHorizontal: 4,
                marginVertical: 8,
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
                    source={{ uri: business?.imageURL }}
                    style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'cover',
                    }}
                />
                
                {/* Gradient overlay for better text readability */}
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 60,
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                }} />
                
                {/* Category badge */}
                <View style={{
                    position: 'absolute',
                    top: 15,
                    left: 15,
                    backgroundColor: Colors.PRIMARY,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 15,
                }}>
                    <Text style={{
                        color: '#fff',
                        fontFamily: 'outfit-medium',
                        fontSize: 12,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                    }}>
                        {business?.category || 'Business'}
                    </Text>
                </View>

                {/* Content overlay on image */}
                <View style={{
                    position: 'absolute',
                    bottom: 20,
                    left: 20,
                    right: 20,
                }}>
                    <Text style={{
                        color: '#fff',
                        fontFamily: 'outfit-bold',
                        fontSize: 22,
                        marginBottom: 6,
                        textShadowColor: 'rgba(0, 0, 0, 0.7)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 3,
                    }}>
                        {business?.name}
                    </Text>
                    
                    <Text style={{
                        color: '#fff',
                        fontFamily: 'outfit',
                        fontSize: 15,
                        opacity: 0.9,
                        textShadowColor: 'rgba(0, 0, 0, 0.7)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 3,
                    }}>
                        {business?.address}
                    </Text>
                </View>
            </View>

            {/* Bottom info section */}
            <View style={{
                padding: 20,
                paddingTop: 15,
            }}>
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
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 15,
                    }}>
                        <Ionicons name="star" size={16} color="#ffa000" />
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 14,
                            color: '#333',
                            marginLeft: 6,
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
                            borderRadius: 20,
                            padding: 8,
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
                            size={18} 
                            color={favoriteStatus ? "#ff4757" : "#666"} 
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}