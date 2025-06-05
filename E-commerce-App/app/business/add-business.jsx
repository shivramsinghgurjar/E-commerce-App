import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import {db} from './../../config/FirebaseConfig'
import { collection, getDocs, query } from 'firebase/firestore';

export default function AddBusiness() {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [categoryList,setCategoryList]=useState([]);

    const [name,setName]=useState();
    const [address,setAddress]=useState();
    const [contact,setContact]=useState();
    const [website,setWebsite]=useState();
    const [about,setAbout]=useState();
    const [category,setCategory]=useState();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Add New Business',
            headerShown: true
        })
        GetCategoryList();
    }, [])

    const onImagePick = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
        setImage(result?.assets[0].uri);
        console.log(result);
    }

    const GetCategoryList=async()=>{
        setCategoryList([]);
        const q = query(collection(db,'Category'))
        const snapShot=await getDocs(q);
        snapShot.forEach((doc)=>{
            console.log(doc.data());
            setCategoryList(prev=>[...prev,{
                label:(doc.data()).name,
                value:(doc.data()).name
            }])
        })
    }
    return (
        <View style={{
            padding: 20
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 25
            }}>Add New Business</Text>
            <Text style={{
                fontFamily: 'outfit',
                color: Colors.GREY
            }}>Fill all details in order to add new business</Text>

            <TouchableOpacity style={{
                marginTop: 20
            }}
                onPress={() => onImagePick()}
            >
                {!image ? <Image source={require('./../../assets/images/placeholder.png')}
                    style={{
                        width: 100,
                        height: 100
                    }}
                />
                    :
                    <Image source={{ uri: image }}
                        style={{
                            width: 100,
                            height: 100,
                            borderRadius: 15
                        }}
                    />}
            </TouchableOpacity>

            <View>
                <TextInput placeholder='Name'
                onChangeText={(v)=>setName(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: 'outfit'
                    }}
                />
                <TextInput placeholder='Address'
                  onChangeText={(v)=>setAddress(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: 'outfit'
                    }}
                />
                <TextInput placeholder='Contact'
                  onChangeText={(v)=>setCategory(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: 'outfit'
                    }}
                />
                <TextInput placeholder='Website'
                  onChangeText={(v)=>setWebsite(v)}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: 'outfit'
                    }}
                />
                <TextInput placeholder='About'
                  onChangeText={(v)=>setAbout(v)}
                    multiline
                    numberOfLines={5}
                    style={{
                        padding: 10,
                        borderWidth: 1,
                        borderRadius: 5,
                        fontSize: 17,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY,
                        fontFamily: 'outfit',
                        height: 100
                    }}
                />

                <View style={{
                        borderWidth: 1,
                        borderRadius: 5,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderColor: Colors.PRIMARY
                    }}>
                    <RNPickerSelect
                        onValueChange={(value) => setCategory(value)}
                        items={categoryList}
                    />
                </View>
            </View>
            <TouchableOpacity style={{
                padding:15,
                backgroundColor:Colors.PRIMARY,
                marginTop:20,
                borderRadius:5

            }}>
                <Text style={{
                    textAlign:'center',
                    fontFamily:'outfit-medium',
                    color:'#fff'
                }}>Add New Business</Text>
            </TouchableOpacity>
        </View>
    )
}