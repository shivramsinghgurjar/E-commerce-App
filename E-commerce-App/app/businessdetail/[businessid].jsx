import { View, Text, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { collection, doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useEffect, useState } from 'react';

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();
  const [business,setBusiness]=useState();
  const [loading,setLoading]=useState(false)
  useEffect(()=>{
    GetBusinessDetailById()
  },[])

  const GetBusinessDetailById=async()=>{
    setLoading(true);
    const docRef=doc(db,'E-commerceList',businessid)
    const docSnap=await getDoc(docRef);
    if(docSnap.exists())
    {
      setBusiness(docSnap.data());
      setLoading(false)
    }
    else
    {
      console.log("not such document exist");
    }

  }
  return (
    <View>
      <Text>{businessid}</Text>
    </View>
  );
}
