import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Colors } from './../../constants/Colors'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import CategoryItem from './CategoryItem'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function Category({ explore = false, onCategorySelect }) {
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    GetCategoryList()
  }, [])

  const GetCategoryList = async () => {
    setLoading(true);
    setCategoryList([])
    try {
      const q = query(collection(db, 'Category'));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setCategoryList(prev => [...prev, doc.data()])
      })
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  }

  const onCategoryPressPressHandle = (item) => {
    if (!explore) {
      router.push('/businesslist/' + item.name)
    } else {
      onCategorySelect(item.name)
    }
  }

  const handleViewAll = () => {
    router.push('/categories');
  };

  return (
    <View style={{
      marginVertical: 5,
    }}>
      {!explore &&
        <View style={{
          paddingHorizontal: 20,
          marginBottom: 15,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <View>
            <Text style={{
              fontSize: 22,
              fontFamily: 'outfit-bold',
              color: '#333',
              marginBottom: 2,
            }}>
              Categories
            </Text>
            <Text style={{
              fontSize: 14,
              fontFamily: 'outfit',
              color: Colors.GREY,
            }}>
              Explore by category
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={handleViewAll}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#f8f9fa',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: '#e9ecef',
            }}
          >
            <Text style={{
              color: Colors.PRIMARY,
              fontFamily: 'outfit-medium',
              fontSize: 14,
            }}>
              View All
            </Text>
            <Ionicons name="chevron-forward" size={14} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>}

      {loading ? (
        <View style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 100,
        }}>
          <Text style={{
            fontFamily: 'outfit',
            color: Colors.GREY,
          }}>
            Loading categories...
          </Text>
        </View>
      ) : (
        <FlatList
          data={categoryList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
          renderItem={({ item, index }) => (
            <CategoryItem
              category={item}
              key={index}
              onCategoryPress={(item) =>
                onCategoryPressPressHandle(item)
              }
            />
          )}
        />
      )}
    </View>
  )
}