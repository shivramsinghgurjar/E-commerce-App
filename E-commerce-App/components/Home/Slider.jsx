import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { collection , getDocs, query } from 'firebase/firestore'
import {db} from './../../config/FirebaseConfig';
export default function Slider() {
    useEffect(()=>{
        GetSliderList();
    },[]);
    const GetSliderList=async()=>{
        const q=query(collection(db, 'Sliders'))
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
        })
        }
  return (
    <View>
      <Text>Slider</Text>
    </View>
  )
}