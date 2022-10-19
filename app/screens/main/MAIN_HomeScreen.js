import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';

const MAIN_HomeScreen = () => {
    const navigation = useNavigation();
    const [keySearch, setKeySearch] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const renderCategoryItem = ({item}) => {
        return (
            <TouchableOpacity style={{backgroundColor: '#FFF', marginHorizontal: 10, height: 130, width: 100, padding: 10, alignItems: 'center', borderRadius: 10}}>
                <View style={{backgroundColor : item.color, padding: 10, borderRadius: 40, height: 80, width: 80, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={item.image}/>
                </View>
                <Text style={{fontSize: 14, paddingTop: 10}}>{item.name}</Text>
            </TouchableOpacity>
        )
    }

    const renderProductItem = ({item}) => {
        return (
            <TouchableOpacity style={{backgroundColor: '#FFF', marginHorizontal: 10, height: 150, width: 170, padding: 10, alignItems: 'center', borderRadius: 10, }}>
                <View style={{backgroundColor : item.color, padding: 5, borderRadius: 40, height: 80, width: 80, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={item.image} style={{width: 160, height: 90, borderRadius: 10}}/>
                    <TouchableOpacity style={{ backgroundColor: '#FFF', position: 'absolute', top: 0, right: -35, height: 25, width: 25, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome name={'heart'} size={15} color="#2EC28B" />
                    </TouchableOpacity>
                </View>
                <View style={{paddingTop: 10, paddingRight: 10, flexDirection: 'column'}}>
                    <Text style={{fontSize: 13, fontWeight: '500'}}>{item.name}</Text>
                    <View style={{flexDirection: 'row', paddingTop: 10, alignItems: 'center'}}>
                        <Text style={{fontSize: 15, fontWeight: '500', color: '#2EC28B'}}>{item.price} VNĐ</Text>
                        <Text style={{fontSize: 10, color: '#A7AFBC', paddingLeft: 20}}>Giảm {item.discount}%</Text>
                    </View>
                </View>
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
        ];
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
        ]
        setCategoryList(categoryData);
        setProductData(productData);
    },[])

    return (
        <SafeAreaView style={{flex:1, backgroundColor: '#F4F5F9'}}>
            <View style={{flexDirection: 'column', padding: 25}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5}}>
                    <Text style={{fontSize: 25, color: '#36596A', fontWeight: '600'}}>
                        Chào, Trung
                    </Text>
                    <Image source={require('../../assets/images/profile.png')} style={{height: 42, width: 42}} />
                </View>
                <View style={{paddingTop: 10}}>
                    <TDTextInputNew
                        value={keySearch}
                        onChangeText={setKeySearch}
                        placeholder={'Nhập tên thuốc tại đây'}
                        icon='search'
                    />
                </View>
            </View>
            <View style={{padding: 20, backgroundColor: '#1479FF', height: '20%',marginHorizontal: 30, borderRadius: 10}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column'}}>
                        <Text style={{fontSize: 20, color: '#FFF', fontWeight: 'bold'}}>Tình hình COVID-19</Text>
                        <Text style={{color: '#FFF', paddingTop: 15}}>Lorep isum has beening.</Text>
                        <Button
                            title="Chi tiết"
                            buttonStyle={{borderRadius: 5, backgroundColor: '#2EC28B', width: 120, marginTop: 20, marginLeft: 5}}
                            titleStyle={{fontSize: 14}}
                            onPress={() => {
                                
                            }}
                        />
                    </View>
                    <View>
                        <Image source={require('../../assets/images/family.png')} />
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'column', padding: 25}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5}}>
                    <Text style={{fontSize: 20, color: '#36596A', fontWeight: '600'}}>
                        Danh mục hàng đầu
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('CategoryScreen');
                    }} style={{backgroundColor: '#FFF', padding: 6}}>
                        <Text style={{fontSize: 12, color: '#A7AFBC'}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingTop: 10}}>
                    <FlatList 
                        data={categoryList.slice(0, 5)}
                        renderItem={renderCategoryItem}
                        keyExtractor={item => item.id}
                        horizontal
                        contentContainerStyle={{paddingTop: 10}}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'column', paddingHorizontal: 25}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5}}>
                    <Text style={{fontSize: 20, color: '#36596A', fontWeight: '600'}}>
                        Sản phẩm nổi bật
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('ProductListScreen');
                    }} style={{backgroundColor: '#FFF', padding: 6}}>
                        <Text style={{fontSize: 12, color: '#A7AFBC'}}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingTop: 10}}>
                    <FlatList 
                        data={productData.slice(0, 5)}
                        renderItem={renderProductItem}
                        keyExtractor={item => item.id}
                        horizontal
                        contentContainerStyle={{padding: 0}}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

export default MAIN_HomeScreen;