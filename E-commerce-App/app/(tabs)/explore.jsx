import {ImageBackground, View, Text, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import {Colors} from './../../constants/Colors'
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';

export default function explore() {
  const [businessList, setBusinessList] = useState([])
  const [allBusinesses, setAllBusinesses] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')

  // Get all businesses on component mount
  useEffect(() => {
    getAllBusinesses();
  }, []);

  // Filter businesses when search query or category changes
  useEffect(() => {
    filterBusinesses();
  }, [searchQuery, selectedCategory, allBusinesses]);

  const getAllBusinesses = async () => {
    const q = query(collection(db, 'E-commerceList'));
    const querySnapshot = await getDocs(q);
    const businesses = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      businesses.push({ id: doc.id, ...doc.data() })
    });
    setAllBusinesses(businesses);
    setBusinessList(businesses);
  }

  const GetBusinessByCategory = async (category) => {
    setSelectedCategory(category);
  }

  const filterBusinesses = () => {
    let filtered = allBusinesses;

    // Filter by category if selected
    if (selectedCategory) {
      filtered = filtered.filter(business => 
        business.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search query if provided
    if (searchQuery.trim()) {
      const searchTerm = searchQuery.toLowerCase();
      filtered = filtered.filter(business => {
        const businessName = business.name?.toLowerCase() || '';
        const businessCategory = business.category?.toLowerCase() || '';
        const businessAddress = business.address?.toLowerCase() || '';
        const businessAbout = business.about?.toLowerCase() || '';

        return businessName.includes(searchTerm) ||
               businessCategory.includes(searchTerm) ||
               businessAddress.includes(searchTerm) ||
               businessAbout.includes(searchTerm);
      });
    }

    setBusinessList(filtered);
  }

  const handleSearch = (query) => {
    setSearchQuery(query);
  }

  const clearSearch = () => {
    setSearchQuery('');
    setSelectedCategory('');
  }

  return (
    <View style={{
      flex: 1,
      backgroundColor: '#f8fafc',
    }}>
      {/* Header Section */}
      <View style={{
        backgroundColor: '#fff',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
      }}>
        <View style={{
          marginBottom: 20,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 16,
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
              Explore More
            </Text>
          </View>
          <Text style={{
            fontFamily: 'outfit',
            fontSize: 15,
            color: Colors.GREY,
          }}>
            Discover amazing handicrafts around you
          </Text>
        </View>

        {/* Search Bar */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f8f9fa',
          borderRadius: 15,
          paddingHorizontal: 15,
          paddingVertical: 6,
          borderWidth: 1,
          borderColor: '#e9ecef',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          elevation: 1,
        }}>
          <Ionicons name="search" size={18} color={Colors.PRIMARY} /> 
          <TextInput 
            placeholder='Search handicrafts, categories...' 
            placeholderTextColor={Colors.GREY}
            value={searchQuery}
            onChangeText={handleSearch}
            style={{
              flex: 1,
              fontFamily: 'outfit',
              fontSize: 16,
              marginLeft: 10,
              color: '#333',
            }}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <Ionicons name="close-circle" size={16} color={Colors.GREY} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <View style={{
          paddingHorizontal: 20,
          paddingTop: 20,
        }}>
          {/* Clear filters button */}
          {(searchQuery || selectedCategory) && (
            <TouchableOpacity 
              onPress={clearSearch}
              style={{
                alignSelf: 'flex-start',
                marginBottom: 15,
                paddingHorizontal: 16,
                paddingVertical: 10,
                backgroundColor: Colors.PRIMARY,
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Ionicons name="refresh" size={16} color="#fff" />
              <Text style={{
                color: '#fff',
                fontFamily: 'outfit-medium',
                fontSize: 14,
              }}>
                Clear Filters
              </Text>
            </TouchableOpacity>
          )}

          {/* Category */}
          <Category
            explore={true}
            onCategorySelect={(category) => GetBusinessByCategory(category)}
          />
          
          {/* Business List */}
          <ExploreBusinessList businessList={businessList} searchQuery={searchQuery} />
        </View>
      </ScrollView>
    </View>
  )
}