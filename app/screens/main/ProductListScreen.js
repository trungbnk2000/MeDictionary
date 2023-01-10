import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get("window");

const ITEM_WIDTH = width/2 - 10*3;

const ProductListScreen = () => {
    const navigation = useNavigation();
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const renderProductItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate('DetailProductScreen', {data: item})}} style={{backgroundColor: '#FFF', marginVertical: 10, marginHorizontal: 5, height: ITEM_WIDTH + 10*3, width: ITEM_WIDTH, padding: 10, alignItems: 'center', borderRadius: 10, }}>
                <View style={{backgroundColor : item.color, padding: 5, borderRadius: 40, height: 80, width: 80, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={item.image} style={{width: ITEM_WIDTH - 10, height: 90, borderRadius: 10}}/>
                    <TouchableOpacity style={{ backgroundColor: '#FFF', position: 'absolute', top: 0, right: -35, height: 25, width: 25, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome name={'heart'} size={15} color="#2EC28B" />
                    </TouchableOpacity>
                </View>
                <View style={{paddingTop: 10, paddingRight: 10, flexDirection: 'column'}}>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>{item.name}</Text>
                    <View style={{flexDirection: 'row', paddingTop: 20, alignItems: 'center'}}>
                        <Text style={{fontSize: 15, fontWeight: '500', color: '#2EC28B'}}>{item.price} VNĐ</Text>
                        <Text style={{fontSize: 10, color: '#A7AFBC', paddingLeft: 20}}>Giảm {item.discount}%</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        let productData = [
            {
                id: 1,
                name: 'Missionpharma',
                price: '20.00',
                discount: '25',
                image: require('../../assets/images/Missionpharma.png')
            },
            {
                id: 2,
                name: 'Pharmaceutical',
                price: '25.00',
                discount: '35',
                image: require('../../assets/images/Pharmaceutical.png')
            },
            {
                id: 3,
                name: 'Schreiner Medi',
                price: '10.00',
                discount: '30',
                image: require('../../assets/images/ShreinerMedi.png')
            },
            {
                id: 4,
                name: 'Pharma Bottle',
                price: '30.00',
                discount: '25',
                image: require('../../assets/images/PharmaBottle.png')
            },
            {
                id: 5,
                name: 'Drug launches',
                price: '25.00',
                discount: '35',
                image: require('../../assets/images/DrugLaunches.png')
            },
            {
                id: 6,
                name: 'Pharmaceutical',
                price: '20.00',
                discount: '35',
                image: require('../../assets/images/Pharmaceutical2.png')
            },
            {
                id: 7,
                name: 'Missionpharma',
                price: '20.00',
                discount: '25',
                image: require('../../assets/images/Missionpharma.png')
            },
            {
                id: 8,
                name: 'Pharmaceutical',
                price: '25.00',
                discount: '35',
                image: require('../../assets/images/Pharmaceutical.png')
            },
            {
                id: 9,
                name: 'Schreiner Medi',
                price: '10.00',
                discount: '30',
                image: require('../../assets/images/ShreinerMedi.png')
            },
            {
                id: 10,
                name: 'Pharma Bottle',
                price: '30.00',
                discount: '25',
                image: require('../../assets/images/PharmaBottle.png')
            },
            {
                id: 11,
                name: 'Drug launches',
                price: '25.00',
                discount: '35',
                image: require('../../assets/images/DrugLaunches.png')
            },
            {
                id: 12,
                name: 'Pharmaceutical',
                price: '20.00',
                discount: '35',
                image: require('../../assets/images/Pharmaceutical2.png')
            },
        ]
        setProductData(productData);
    },[])

    return (    
        <View style={{flex:1, backgroundColor: '#F4F5F9'}}>
            <View style={{flexDirection: 'column', padding: 25, backgroundColor: '#1479FF', height: '28%', borderBottomLeftRadius: 30, borderBottomRightRadius: 30, paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
                        Danh sách thuốc
                    </Text>
                    <Image source={require('../../assets/images/doctor_profile.jpeg')} style={{height: 42, width: 42, borderRadius: 42}} />
                </View>
                <View style={{height: 700}}>
                    <FlatList 
                        data={productData}
                        renderItem={renderProductItem}
                        keyExtractor={item => item.id}
                        numColumns={2}
                        key={2}
                        contentContainerStyle={{paddingTop: 40}}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );
};

export default ProductListScreen;