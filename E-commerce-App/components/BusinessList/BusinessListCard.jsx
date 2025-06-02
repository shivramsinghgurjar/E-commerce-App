import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {Colors} from './../../constants/Colors'
import { useRouter } from 'expo-router'


export default function BusinessListCard({business}) {
  const router=useRouter();
  return (
    <TouchableOpacity style={{
        padding:10,
        margin:10,
        borderRadius:15,
        backgroundColor:'#fff',
        display:'flex',
      flexDirection:'row',
      gap:10
    }}
    onPress={() => router.push({
  pathname: '/businessdetail/[businessid]',
  params: { businessid: business.id }
})}

    >
      <Image source={{uri:business.imageURL}}
        style = {{
            width:120,
            height:120,
            borderRadius:15,
            display:'flex',
            flexDirection:'row',
            gap:10
        }}
      />
      <View style={{
        flex:1,
        gap:5
      }}>

        {/* We need to import it and rewrite below 2 line agin */}
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20,
        }}>{business.name}</Text>
        <Text style={{
            fontFamily:'outfit',
            color:Colors.GREY,
            fontSize:15
        }}>{business.address}</Text>
         <View style={{display:'flex',flexDirection:'row',gap:5}}>
                        <Image source={require('./../../assets/images/star.png')}
                        style={{
                            width:15,
                            height:15
                        }}/> 
                        <Text style={{fontFamily:'outfit'}}>4.5</Text>
                    </View>
        {/* Second thing form the previous part: Paste the rating code from PopularBusinessCard */}

      </View>
   </TouchableOpacity>
  )
}