import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <TouchableOpacity 
      onPress={() => onCategoryPress(category)}
      style={{
        alignItems: 'center',
        marginRight: 12,
        minWidth: 80,
      }}
    >
      <View style={{
        width: 70,
        height: 70,
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
      }}>
        <Image 
          source={{ uri: category.imageURL }}
          style={{
            width: 40,
            height: 40,
            resizeMode: 'contain',
          }}
        />
      </View>
      
      <Text style={{
        fontSize: 13,
        fontFamily: 'outfit-medium',
        textAlign: 'center',
        marginTop: 8,
        color: '#333',
        lineHeight: 16,
      }}>
        {category.name}
      </Text>
    </TouchableOpacity>
  )
}