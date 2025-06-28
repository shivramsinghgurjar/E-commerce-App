import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ActivityIndicator, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../config/FirebaseConfig'

export default function Categories() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'Category'));
      const querySnapshot = await getDocs(q);
      const categoryList = [];
      querySnapshot.forEach((doc) => {
        categoryList.push({ id: doc.id, ...doc.data() });
      });
      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryPress = (category) => {
    router.push('/businesslist/' + category.name);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleCategoryPress(item)}
      style={{
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 20,
        marginVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
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
      <View style={{
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        overflow: 'hidden',
      }}>
        {item.imageURL ? (
          <Image
            source={{ uri: item.imageURL }}
            style={{
              width: 40,
              height: 40,
              resizeMode: 'contain',
            }}
          />
        ) : (
          <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 24,
            color: Colors.PRIMARY,
          }}>
            {item.name?.charAt(0)?.toUpperCase()}
          </Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 18,
          marginBottom: 5,
        }}>
          {item.name}
        </Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 14,
          color: Colors.GREY,
        }}>
          Browse {item.name} businesses
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.GREY} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size="large" color={Colors.PRIMARY} />
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: Colors.GREY,
            marginTop: 15,
          }}>
            Loading categories...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
          All Categories
        </Text>
      </View>

      {/* Categories List */}
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 20,
        }}
        ListEmptyComponent={
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 50,
          }}>
            <Ionicons name="grid-outline" size={60} color={Colors.GREY} />
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 18,
              color: Colors.GREY,
              marginTop: 15,
              textAlign: 'center',
            }}>
              No categories available
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
} 