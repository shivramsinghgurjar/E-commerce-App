import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import BusinessListCard from './BusinessListCard'
import { Colors } from '../../constants/Colors'

export default function ExploreBusinessList({businessList, searchQuery}) {
  return (
    <View>
      {/* Search results header */}
      {searchQuery && (
        <View style={{
          paddingHorizontal: 10,
          marginBottom: 10
        }}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 16,
            color: Colors.GREY
          }}>
            {businessList.length === 0 
              ? `No handicrafts found for "${searchQuery}"`
              : `Found ${businessList.length} handicraft${businessList.length === 1 ? '' : 's'} for "${searchQuery}"`
            }
          </Text>
        </View>
      )}

      {businessList.length === 0 && searchQuery ? (
        <View style={{
          padding: 40,
          alignItems: 'center'
        }}>
          <Text style={{
            fontFamily: 'outfit-medium',
            fontSize: 16,
            color: Colors.GREY,
            textAlign: 'center'
          }}>
            Try searching with different keywords or browse by category
          </Text>
        </View>
      ) : (
        <FlatList
          data={businessList}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <BusinessListCard 
              key={item.id}
              business={item}
            />
          )}
        />
      )}
    </View>
  )
}