import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { collection, doc, getDoc, query } from 'firebase/firestore';
import { db } from '../../config/FirebaseConfig';
import { useEffect, useState } from 'react';
import {Colors} from './../../constants/Colors'
import NewIntro from '../../components/BusinessDetail/NewIntro';
import ActionButton from '../../components/BusinessDetail/ActionButton';
import About from '../../components/BusinessDetail/About';
import Review from '../../components/BusinessDetail/Review';
//import { KeyboardAvoidingView, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


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
      setBusiness({id:docSnap.id,...docSnap.data()});
      setLoading(false)
    }  
    else
    {
      console.log("not such document exist");
    }

  }
  return (
   <KeyboardAwareScrollView
  style={{ flex: 1, backgroundColor: '#fff' }}
  contentContainerStyle={{ paddingBottom: 20 }}
  enableOnAndroid={true}
  keyboardShouldPersistTaps="handled"
  extraScrollHeight={100}
>
      {loading?
      <ActivityIndicator
      style={{
        marginTop:'70%'
      }}
      size={'large'}
      color={Colors.PRIMARY}/>:
      <>
        <NewIntro business={business}/>
        {
          // intro
          //action button
          //about section
        }
        <ActionButton business={business}/>
        <About business={business}/>
        <Review business={business}/>
      </>}

    </KeyboardAwareScrollView>
  );
}
