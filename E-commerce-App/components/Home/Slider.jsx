import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from './../../config/FirebaseConfig';
import { Colors } from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons';

export default function Slider() {
  const [sliderList, setSliderList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetSliderList();
  }, []);

  const GetSliderList = async () => {
    setLoading(true);
    setSliderList([]);
    try {
      const q = query(collection(db, 'Sliders'))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setSliderList(prev => [...prev, doc.data()])
      })
    } catch (error) {
      console.error('Error fetching sliders:', error);
    } finally {
      setLoading(false);
    }
  }

  const renderSliderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        marginRight: 20,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 6,
      }}
    >
      <View style={{ position: 'relative' }}>
        <Image 
          source={{ uri: item.imageURL }}
          style={{
            width: 320,
            height: 180,
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
        
        {/* Content overlay */}
        <View style={{
          position: 'absolute',
          bottom: 15,
          left: 15,
          right: 15,
        }}>
          <Text style={{
            color: '#fff',
            fontFamily: 'outfit-bold',
            fontSize: 18,
            marginBottom: 4,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 3,
          }}>
            {item.title || 'Special Offer'}
          </Text>
          <Text style={{
            color: '#fff',
            fontFamily: 'outfit',
            fontSize: 13,
            opacity: 0.9,
            textShadowColor: 'rgba(0, 0, 0, 0.5)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 3,
          }}>
            {item.description || 'Discover amazing deals'}
          </Text>
        </View>

        {/* Special badge */}
        <View style={{
          position: 'absolute',
          top: 15,
          left: 15,
          backgroundColor: Colors.PRIMARY,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 15,
        }}>
          <Text style={{
            color: '#fff',
            fontFamily: 'outfit-bold',
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}>
            Special
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{
      marginVertical: 20,
    }}>
      <View style={{
        paddingHorizontal: 20,
        marginBottom: 15,
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
            Special for You
          </Text>
          <Text style={{
            fontSize: 14,
            fontFamily: 'outfit',
            color: Colors.GREY,
          }}>
            Personalized recommendations
          </Text>
        </View>
      </View>

      {loading ? (
        <View style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 180,
        }}>
          <Text style={{
            fontFamily: 'outfit',
            color: Colors.GREY,
          }}>
            Loading special offers...
          </Text>
        </View>
      ) : sliderList.length === 0 ? (
        <View style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 180,
          backgroundColor: '#f8f9fa',
          borderRadius: 20,
          marginHorizontal: 20,
        }}>
          <View style={{
            alignItems: 'center',
          }}>
            <Ionicons name="gift-outline" size={40} color={Colors.GREY} />
            <Text style={{
              fontFamily: 'outfit-medium',
              fontSize: 16,
              color: Colors.GREY,
              marginTop: 10,
              textAlign: 'center',
            }}>
              No special offers yet
            </Text>
            <Text style={{
              fontFamily: 'outfit',
              fontSize: 13,
              color: Colors.GREY,
              marginTop: 5,
              textAlign: 'center',
            }}>
              Check back later for personalized deals
            </Text>
          </View>
        </View>
      ) : (
        <FlatList 
          data={sliderList}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 10,
          }}
          renderItem={renderSliderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  )
}