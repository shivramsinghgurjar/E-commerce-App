import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'

export default function ExploreBusinessList({businessList}) {
  return (
    <View>
      <FlatList
        data={businessList}
        scrollEnabled
        showsVerticalScrollIndicator={true}
        //keyExtractor={(item)=>item.id}
        renderItem={({ item }) => (
          <BusinessListCard 
            key={item.id}
            business={item}
          />
        )}
      />
      <View style={{
        height:200
      }}>

      </View>
      </View>
  )
}