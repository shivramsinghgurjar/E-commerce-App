import { View, Text, Image } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'

export default function PopularBusinessCard({business}) {
  return (
    <View style={{
        marginLeft:20,
        padding:10,
        backgroundColor:'#fff',
        borderRadius:15
    }}>
      <Image source={{uri:business.imageURL}}
      style={{
        width:200,
        height:130,
        borderRadius:15
      }}
      />
      <View style={{marginTop:7}}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:17,
        }}>
            {business.name}</Text>
            <Text style={{
            fontFamily:'outfit',
            fontSize:13,
            color:Colors.GREY
        }}>
            {business.address}</Text>
            <View>
                {/* <Image source={require('./../../assets/images/star.png')}
                style={{
                    width:1,
                    heigth:1
                }}/> */}
                <Text>4.5</Text>
            </View>
      </View>
    </View>
  )
}