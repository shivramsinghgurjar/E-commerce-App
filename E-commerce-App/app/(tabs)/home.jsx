import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Header from '../../components/Home/Header'
import Slider from '../../components/Home/Slider'
import Category from '../../components/Home/Category'
import PopularBusiness from '../../components/Home/PopularBusiness'

export default function home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
     {
       <Header onSearch={handleSearch} searchQuery={searchQuery}/>
     }
     {
      <Category/>
     }
     {
      <Slider/>
     }
     {
      <PopularBusiness searchQuery={searchQuery}/>
     }
     <View style={{
      height:30
     }}></View>
    </ScrollView>
  )
}