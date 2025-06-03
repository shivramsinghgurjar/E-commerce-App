import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import {Rating} from 'react-native-ratings'
import { useState } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Review({business}) {
    const [rating,setRating]=useState(4);
  return (
    
    <View style={{
        padding:20,
        backgroundColor:'#fff'
    }}>
      <Text style={{ 
        fontSize: 20,
         fontFamily:'outfit-bold' }}>Review</Text>
         <View >
        <Rating
        imageSize={30}
            showRating={false}
             onFinishRating={(rating)=>setRating(rating)}
            style={{ paddingVertical: 10 }}
            />
            <TextInput 
            placeholder='Write your comment'
            numberOfLines={4}
            style={{
           borderWidth:1,
           padding:10,
           borderRadius:10,
           borderColor:Colors.GREY,
            textAlignVertical:'top',
            minHeight:100
           }}
           />
           <TouchableOpacity>
            
           </TouchableOpacity>
         </View>
    </View>
  )
}