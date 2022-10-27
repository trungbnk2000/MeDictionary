import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';
const {width} = Dimensions.get("window");

const ITEM_WIDTH = width/3 - 10*3

const CategoryScreen = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigation();

    const renderCategoryItem = ({item}) => {
        return (
            <TouchableOpacity style={{backgroundColor: '#FFF', margin: 10, height: ITEM_WIDTH + 10*3, width: ITEM_WIDTH, padding: 10, alignItems: 'center', borderRadius: 10}}>
                <View style={{backgroundColor : item.color, padding: 10, borderRadius: 40, height: 80, width: 80, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={item.image}/>
                </View>
                <Text style={{fontSize: 14, paddingTop: 10}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }
    
    useEffect(() => {
        let categoryData = [
            {
                id: 1,
                name: 'Aryuveda',
                image: require('../../assets/images/Ayurveda.png'),
                color: '#EAF9F3'
            },
            {
                id: 2,
                name: 'Homepathy',
                image: require('../../assets/images/Homepathy.png'),
                color: '#E7F2FF'
            },
            {
                id: 3,
                name: 'Dentals',
                image: require('../../assets/images/Dentals.png'),
                color: '#FEF1F1'
            },
            {
                id: 4,
                name: 'Wellness',
                image: require('../../assets/images/Wellness.png'),
                color: '#FFF6F3'
            },
            {
                id: 5,
                name: 'Skin Care',
                image: require('../../assets/images/SkinCare.png'),
                color: '#FFFDF0'
            },
            {
                id: 6,
                name: 'Eye Care',
                image: require('../../assets/images/EyeCare.png'),
                color: '#EEF6FF'
            },
            {
                id: 7,
                name: 'Aryuveda',
                image: require('../../assets/images/Ayurveda.png'),
                color: '#EAF9F3'
            },
            {
                id: 8,
                name: 'Homepathy',
                image: require('../../assets/images/Homepathy.png'),
                color: '#E7F2FF'
            },
            {
                id: 9,
                name: 'Dentals',
                image: require('../../assets/images/Dentals.png'),
                color: '#FEF1F1'
            },
            {
                id: 10,
                name: 'Wellness',
                image: require('../../assets/images/Wellness.png'),
                color: '#FFF6F3'
            },
            {
                id: 11,
                name: 'Skin Care',
                image: require('../../assets/images/SkinCare.png'),
                color: '#FFFDF0'
            },
            {
                id: 12,
                name: 'Eye Care',
                image: require('../../assets/images/EyeCare.png'),
                color: '#EEF6FF'
            },
        ];
        setCategoryList(categoryData);
    },[])

    return (    
        <View style={{flex:1, backgroundColor: '#F4F5F9'}}>
            <View style={{flexDirection: 'column', padding: 25, backgroundColor: '#1479FF', height: '28%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50}}>
                    <TouchableOpacity onPress={()=>{navigate.goBack()}}>
                        <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
                        Danh mục thuốc
                    </Text>
                    <Image source={require('../../assets/images/profile.png')} style={{height: 42, width: 42}} />
                </View>
                <View style={{height: 700}}>
                    <FlatList 
                        data={categoryList}
                        renderItem={renderCategoryItem}
                        keyExtractor={item => item.id}
                        numColumns={3}
                        key={3}
                        contentContainerStyle={{paddingTop: 40, paddingHorizontal: 0}}
                    />
                </View>
            </View>
        </View>
    );
};

export default CategoryScreen;