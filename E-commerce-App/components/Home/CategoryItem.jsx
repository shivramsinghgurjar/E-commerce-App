import { View, Text, Image } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

export default function CategoryItem({category}) {
  return (
    <View>
        <View style={{padding:10,
            backgroundColor:Colors.ICON_BG,
            borderRadius:99,
            marginRadius:15
        }}>
      <Image source={{ uri : category.imageURL}}
      style={{width:40, height:40}}
      />
    </View>
    </View>
  )
}