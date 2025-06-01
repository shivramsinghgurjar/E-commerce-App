import { View, Text, Image } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'


export default function BusinessListCard({business}) {
  return (
    <View style={{
        padding:10,
        margin:10,
        borderRadius:15,
        backgroundColor:'fff'
    }}>
      <Image source={{uri:business.imageUrl}}
        style = {{
            width:120,
            height:120,
            borderRadius:15,
            display:'flex',
            flexDirection:'row',
            gap:10,
        }}
      />

      <View style={{
        flex:1,
        gap:7
      }}>

        {/* We need to import it and rewrite below 2 line agin */}
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20
        }}>{business.name}</Text>
        <Text style={{
            fontFamily:'outfit',
            color:Colors.GREY,
            fontSize:15
        }}>{business.address}</Text>

        {/* Second thing form the previous part: Paste the rating code from PopularBusinessCard */}

      </View>
    </View>
  )
}