import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {Colors} from './../../constants/Colors'
import { useRouter } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFavorites } from '../../hooks/useFavorites';

export default function BusinessListCard({business}) {
  const router=useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isToggling, setIsToggling] = useState(false);

  const handleHeartPress = async (e) => {
    e.stopPropagation();
    if (isToggling) return; // Prevent multiple rapid taps
    
    setIsToggling(true);
    try {
      await toggleFavorite(business);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsToggling(false);
    }
  };

  const favoriteStatus = isFavorite(business.id);

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
      <View style={{ position: 'relative' }}>
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
        <TouchableOpacity 
          onPress={handleHeartPress}
          disabled={isToggling}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 15,
            padding: 3,
            opacity: isToggling ? 0.7 : 1,
          }}
        >
          <Ionicons 
            name={favoriteStatus ? "heart" : "heart-outline"} 
            size={16} 
            color={favoriteStatus ? "#ff4757" : "#666"} 
          />
        </TouchableOpacity>
      </View>
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