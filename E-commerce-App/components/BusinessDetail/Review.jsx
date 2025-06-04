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
        padding:20,
        backgroundColor:'#fff',
        marginBottom:70
    }}>
      <Text style={{ 
        fontSize: 20,
         fontFamily:'outfit-bold' }}>Review</Text>
         <View>
        <Rating
        imageSize={30}
            showRating={false}
             onFinishRating={(rating)=>setRating(rating)}
            style={{ paddingVertical: 10 }}
            />
            <TextInput 
            placeholder='Write your comment'
            numberOfLines={4}
            onChangeText={(value)=>setUserInput(value)}
            style={{
           borderWidth:1,
           padding:10,
           borderRadius:10,
           borderColor:Colors.GREY,
            textAlignVertical:'top',
            minHeight:100
           }}
           />
           <TouchableOpacity 
           disabled={!userInput}
           onPress={()=>onSubmit()}
           style={{
            padding:10,
            backgroundColor:Colors.PRIMARY,
            borderRadius:6,
            marginTop:10
           }}>

            <Text style={{
              fontFamily:'outfit',
              color:'#fff',
              textAlign:'center'
            }}>Submit</Text>
           </TouchableOpacity>
         </View>

         {/* Display Previous Reviews */}

         <View>
          {business?.reviews?.map((item,index)=>(
            <View 
            key={index}
            style={{
              display:'flex',
              flexDirection:'row',
              gap:10,
              alignItems:'center',
              padding:10,
              borderWidth:1,
              borderBlockColor:Colors.GREY,
              borderRadius:15,
              marginTop:10
            }}>
              <Image source={{uri:item.userImage}}
                style={{
                  width:50,
                  height:50,
                  borderRadius:99
                }}
              />
              <View style={{
                display:'flex',
                gap:5
              }}>
                <Text style={{
                  fontFamily:'outfit-medium'
                }}>{item.userName}</Text>
                <Rating
                  imageSize={30}
                  ratingCount={item.rating}
                  style={{alignItems:'flex-start'}}
                />
                <Text>{item.comment}</Text>
              </View>
            </View>
          ))}
         </View>
    </View>
  )
}