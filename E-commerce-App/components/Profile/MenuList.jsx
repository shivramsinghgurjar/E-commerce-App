import { View, Text, Image, TouchableOpacity, Share, Alert } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'
import { useRouter } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons';

export default function MenuList() {

    const menuList = [
        {
            id: 1,
            name: 'My Handicrafts',
            icon: require('./../../assets/images/MyBusiness.jpeg'),
            path: 'my-business',
            color: '#4CAF50',
            description: 'Manage your handicrafts'
        },
        {
            id: 2,
            name: 'My Favorites',
            icon: require('./../../assets/images/star.png'),
            path: 'favorites',
            color: '#FF9800',
            description: 'View saved handicrafts'
        },
        {
            id: 3,
            name: 'Share App',
            icon: require('./../../assets/images/social.png'),
            path: 'share',
            color: '#2196F3',
            description: 'Share with friends'
        },
        {
            id: 4,
            name: 'Logout',
            icon: require('./../../assets/images/Logout.jpeg'),
            path: 'logout',
            color: '#F44336',
            description: 'Sign out of account'
        }
    ]

    const router = useRouter();
    const { signOut } = useAuth();

    const onMenuClick = async (item) => {
        if (item.path === 'logout') {
            try {
                await signOut();
            } catch (error) {
                console.error('Error signing out:', error);
            }
        } else if (item.path === 'share') {
            try {
                await Share.share({
                    message: 'Check out this amazing E-commerce App!',
                    title: 'E-commerce App'
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else if (item.path === 'my-business') {
            Alert.alert('Coming Soon', 'My Handicrafts feature will be available soon!');
        } else if (item.path === 'favorites') {
            router.push('/favorites');
        } else if (item.path) {
            router.push(item.path)
        }
    }

  return (
    <View style={{
            marginTop: 30,
            paddingHorizontal: 20,
    }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
                color: '#333',
                marginBottom: 20,
            }}>
                Quick Actions
            </Text>

            <View style={{
                gap: 12,
            }}>
                {menuList.map((item, index) => (
            <TouchableOpacity
                        key={item.id}
                        onPress={() => onMenuClick(item)}
            style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            padding: 16,
                            borderRadius: 16,
                            backgroundColor: '#fff',
                            shadowColor: '#000',
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 3,
                            borderLeftWidth: 4,
                            borderLeftColor: item.color,
                        }}
                    >
                        <View style={{
                            width: 50,
                            height: 50,
                            borderRadius: 12,
                            backgroundColor: `${item.color}15`,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: 16,
            }}>
                            <Image 
                                source={item.icon}
                style={{
                                    width: 28,
                                    height: 28,
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>

                        <View style={{
                            flex: 1,
                        }}>
                            <Text style={{
                                fontFamily: 'outfit-bold',
                                fontSize: 16,
                                color: '#333',
                                marginBottom: 2,
                            }}>
                                {item.name}
                            </Text>
                            <Text style={{
                                fontFamily: 'outfit',
                                fontSize: 13,
                                color: Colors.GREY,
                            }}>
                                {item.description}
                            </Text>
                        </View>

                        <Ionicons 
                            name="chevron-forward" 
                            size={20} 
                            color={Colors.GREY} 
                        />
                    </TouchableOpacity>
                ))}
            </View>

            <View style={{
                marginTop: 40,
                paddingVertical: 20,
                alignItems: 'center',
                borderTopWidth: 1,
                borderTopColor: '#f0f0f0',
            }}>
                <Text style={{
                    fontFamily: 'outfit',
                    textAlign: 'center',
                    color: Colors.GREY,
                    fontSize: 13,
                }}>
                    Developed By Team GuideX @ 2025
                </Text>
            </View>
    </View>
  )
}