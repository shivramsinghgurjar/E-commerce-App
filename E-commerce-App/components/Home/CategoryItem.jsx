import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'

export default function CategoryItem({category,onCategoryPress}) {
  return (
    <TouchableOpacity onPress={()=>onCategoryPress(category)}>
        <View style={{padding:5,
            backgroundColor:Colors.ICON_BG,
            borderRadius:99,
            marginRight:15
        }}>
      <Image source={{ uri : category.imageURL}}
      style={{width:50, height:50,resizeMode: 'contain'}}
      />
    </View>
    <Text style={{
        fontSize:12,
        fontFamily:'outfit-medium',
        textAlign:'center',
        marginTop:5,
        marginRight:20
    }}>{category.name}</Text>
    </TouchableOpacity>
  )
}