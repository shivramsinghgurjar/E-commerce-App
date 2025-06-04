import { View, Text, TextInput} from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import {Colors} from './../../constants/Colors'
import Category from '../../components/Home/Category';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import ExploreBusinessList from '../../components/Explore/ExploreBusinessList';
export default function explore() {
  const [businessList,setBusinessList]=useState([])
  const GetBusinessByCategory=async(category)=>{
    setBusinessList([]);
    const q=query(collection(db,'E-commerceList'), where('category','==',category))
    const querySnapshot=await getDocs(q);
    querySnapshot.forEach((doc)=>{
       console.log(doc.data())
       setBusinessList(prev=>[...prev,{id:doc.id,...doc.data()}])
    })
  }
  return (
    <View style={{
      padding:10,
      marginTop:20
    }}>
      <Text style={{
        fontFamily:'outfit-bold',
        fontSize:30
      }}>Explore More</Text>
      {/* serchbar */}
      <View style={{
        display:'flex',
        flexDirection:'row',
        gap:10,
        alignItems:'center',
        backgroundColor:'#fff',
        padding:3,
        paddingLeft:6,
        marginVertical:20,
        marginTop:15,
        borderRadius:12,
        paddingHorizontal:15,
        width:370,
        borderColor:Colors.PRIMARY,
        borderWidth:1
      }}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY}/> 
        <TextInput placeholder='Search ...'/>
      </View>
      {/* Category */}
      <Category
      explore={true}
      onCategorySelect={(category)=>GetBusinessByCategory(category)}
      />
      {/* businesslist */}
      <ExploreBusinessList businessList={businessList}/>
    </View>
  )
}