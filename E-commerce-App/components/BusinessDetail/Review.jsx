import { View, Text, TextInput, TouchableOpacity, ToastAndroid, FlatList, Image } from 'react-native'
import React from 'react'
import {Rating} from 'react-native-ratings'
import { useState } from 'react'
// import { Colors } from 'react-native/Libraries/NewAppScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {Colors} from './../../constants/Colors'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import {useUser} from '@clerk/clerk-expo'

export default function Review({business}) {
    const [rating,setRating]=useState(4);
    const [userInput,setUserInput]=useState();
    const {user} = useUser()  

    const onSubmit=async()=>{
      const docRef = doc(db,'E-commerceList', business?.id)
      await updateDoc(docRef,{
        reviews:arrayUnion({
          rating:rating,
          comment:userInput,
          userName:user?.fullName,
          userImage:user?.imageUrl,
          userEmail:user?.primaryEmailAddress?.emailAddress
        })
      })
      ToastAndroid.show('Comment Added Successfully !', ToastAndroid.BOTTOM)
    }
  return (
    
    <View style={{
        padding: 24,
        backgroundColor: '#fff',
        marginBottom: 70,
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    }}>
      {/* Header */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <View style={{
          width: 4,
          height: 24,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 2,
          marginRight: 12,
        }} />
        <Text style={{ 
          fontSize: 22,
          fontFamily: 'outfit-bold',
          color: '#1a1a1a',
          textShadowColor: 'rgba(0,0,0,0.1)',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: 2,
        }}>
          Reviews
        </Text>
      </View>

      {/* Add Review Section */}
      <View style={{
        backgroundColor: '#f8f9fa',
        padding: 20,
        borderRadius: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#e9ecef',
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 16,
          color: '#333',
          marginBottom: 12,
        }}>
          Write a Review
        </Text>
        
        <View style={{
          backgroundColor: '#fff',
          padding: 16,
          borderRadius: 12,
          marginBottom: 16,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 4,
          elevation: 2,
        }}>
          <Rating
            imageSize={28}
            showRating={false}
            onFinishRating={(rating)=>setRating(rating)}
            style={{ paddingVertical: 8, alignItems: 'center' }}
          />
        </View>

        <TextInput 
          placeholder='Share your experience...'
          placeholderTextColor={Colors.GREY}
          numberOfLines={4}
          onChangeText={(value)=>setUserInput(value)}
          style={{
            borderWidth: 1,
            padding: 16,
            borderRadius: 12,
            borderColor: '#e9ecef',
            textAlignVertical: 'top',
            minHeight: 100,
            fontFamily: 'outfit',
            fontSize: 14,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        />
        
        <TouchableOpacity 
          disabled={!userInput}
          onPress={()=>onSubmit()}
          style={{
            padding: 14,
            backgroundColor: userInput ? Colors.PRIMARY : '#ccc',
            borderRadius: 12,
            marginTop: 16,
            shadowColor: Colors.PRIMARY,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: userInput ? 0.3 : 0,
            shadowRadius: 8,
            elevation: userInput ? 6 : 0,
          }}>
          <Text style={{
            fontFamily: 'outfit-bold',
            color: '#fff',
            textAlign: 'center',
            fontSize: 16,
          }}>
            Submit Review
          </Text>
        </TouchableOpacity>
      </View>

      {/* Display Previous Reviews */}
      <View>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 18,
          color: '#333',
          marginBottom: 16,
        }}>
          Customer Reviews
        </Text>
        
        {business?.reviews?.map((item,index)=>(
          <View 
            key={index}
            style={{
              flexDirection: 'row',
              gap: 12,
              alignItems: 'flex-start',
              padding: 16,
              backgroundColor: '#f8f9fa',
              borderRadius: 16,
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#e9ecef',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
              elevation: 2,
            }}>
            <Image 
              source={{uri: item.userImage}}
              style={{
                width: 48,
                height: 48,
                borderRadius: 24,
                borderWidth: 2,
                borderColor: '#fff',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            />
            <View style={{
              flex: 1,
              gap: 6,
            }}>
              <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 16,
                color: '#333',
              }}>
                {item.userName}
              </Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{alignItems: 'flex-start'}}
              />
              <Text style={{
                fontFamily: 'outfit',
                fontSize: 14,
                lineHeight: 20,
                color: '#555',
                marginTop: 4,
              }}>
                {item.comment}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}