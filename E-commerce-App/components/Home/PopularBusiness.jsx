import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Colors} from './../../constants/Colors'
import { collection, getDocs, limit, query } from 'firebase/firestore'
import { db } from '../../config/FirebaseConfig'
import PopularBusinessCard from './PopularBusinessCard'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function PopularBusiness({ searchQuery }) {
    const [businessList,setBusinessList]=useState([]);
    const [allBusinesses, setAllBusinesses] = useState([]);
    const router = useRouter();

    useEffect(()=>{
        GetBusinessList();
    },[])

    useEffect(() => {
        filterBusinesses();
    }, [searchQuery, allBusinesses]);

    const GetBusinessList=async()=>{
        setBusinessList([]);
        const q=query(collection(db,'E-commerceList'),limit(10));
        const querySnapshot=await getDocs(q);
        const businesses = [];
        querySnapshot.forEach((doc)=>{
            console.log(doc.data());
            businesses.push({id:doc.id,...doc.data()});
        });
        
        // Sort businesses alphabetically by name
        const sortedBusinesses = businesses.sort((a, b) => {
            const nameA = (a.name || '').toLowerCase();
            const nameB = (b.name || '').toLowerCase();
            return nameA.localeCompare(nameB);
        });
        
        setAllBusinesses(sortedBusinesses);
        setBusinessList(sortedBusinesses);
    }

    const filterBusinesses = () => {
        if (!searchQuery.trim()) {
            setBusinessList(allBusinesses);
            return;
        }

        const filtered = allBusinesses.filter(business => {
            const searchTerm = searchQuery.toLowerCase();
            const businessName = business.name?.toLowerCase() || '';
            const businessCategory = business.category?.toLowerCase() || '';
            const businessAddress = business.address?.toLowerCase() || '';
            const businessAbout = business.about?.toLowerCase() || '';

            return businessName.includes(searchTerm) ||
                   businessCategory.includes(searchTerm) ||
                   businessAddress.includes(searchTerm) ||
                   businessAbout.includes(searchTerm);
        });

        setBusinessList(filtered);
    };

    const handleViewAll = () => {
        router.push('/(tabs)/explore');
    };

  return (
    <View>
       <View style={{
         paddingHorizontal: 20,
         marginBottom: 15,
         flexDirection: 'row',
         justifyContent: 'space-between',
         alignItems: 'center',
         marginTop: 10
       }}>
            <Text style={{
              fontSize: 20,
              fontFamily: 'outfit-bold',
              color: '#1a1a1a',
            }}>
              {searchQuery ? `Search Results (${businessList.length})` : 'Popular Handicrafts'}
            </Text>
            
            <TouchableOpacity 
              onPress={handleViewAll}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                backgroundColor: '#f8f9fa',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: '#e9ecef',
              }}
            >
              <Text style={{
                color: Colors.PRIMARY, 
                fontFamily: 'outfit-medium',
                fontSize: 14,
              }}>
                View All
              </Text>
              <Ionicons name="chevron-forward" size={14} color={Colors.PRIMARY} />
            </TouchableOpacity>
                </View>
                
                {businessList.length === 0 && searchQuery ? (
                  <View style={{
                    padding: 20,
                    alignItems: 'center'
                  }}>
                    <Text style={{
                      fontFamily: 'outfit-medium',
                      fontSize: 16,
                      color: Colors.GREY,
                      textAlign: 'center'
                    }}>
             No handicrafts found for "{searchQuery}"
                    </Text>
                  </View>
                ) : (
                  <FlatList
                      data={businessList}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}
                      renderItem={({item,index})=>(
                        <PopularBusinessCard
                        key={index}
                        business={item}/>
                      )} 
                  />
                )}
        </View>
  )
}