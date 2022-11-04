import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';
import { companyData } from '../../data/CompanyData';
import { drugData } from '../../data/DrugData';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const MAIN_HomeScreen = () => {
    const navigation = useNavigation();
    const [keySearch, setKeySearch] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [productData, setProductData] = useState([]);
    const [companyList, setCompanyList] = useState([]);
    const [drugList, setDrugList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');

    const renderCategoryItem = ({item}) => {
        return (
            <TouchableOpacity style={{backgroundColor: '#FFF', marginHorizontal: 10, height: 130, width: width/3 - 10, padding: 10, alignItems: 'center', borderRadius: 10, borderColor: '#B5B0AC', borderWidth: 0.2}}>
                <View style={{backgroundColor : '#FFF', padding: 10, borderRadius: 0, height: 80, width: 80, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={{uri: 'https://drugbank.vn/api/public/gridfs/' + item.images[0],height: 70, width: 70 }} resizeMode='contain' />
                </View>
                <Text style={{fontSize: 14, paddingTop: 10, fontWeight: 'bold'}}>{item.displayName}</Text>
            </TouchableOpacity>
        )
    }

    const renderProductItem = ({item}) => {
        return (
            <TouchableOpacity style={{backgroundColor: '#FFF', marginHorizontal: 10, height: width/2, width: width/2 - 40, padding: 5, alignItems: 'center', borderRadius: 10,elevation: 5, borderColor: '#B5B0AC', borderWidth: 0.2}}>
                <View style={{flex: 2, padding: 5, borderRadius: 40, height: 80, width: 80, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={{uri:'https://drugbank.vn/api/public/gridfs/' + item.images[0]}} style={{width: 160, height: 80, borderRadius: 10}} resizeMode='contain' />
                    <TouchableOpacity style={{ backgroundColor: '#F4F5F9', position: 'absolute', top: 0, right: -35, height: 25, width: 25, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome name={'heart'} size={15} color="#2EC28B" />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 3, paddingTop: 20, flexDirection: 'column', alignItems: 'flex-start'}}>
                    <View style={{width: width/2-50, backgroundColor: '#2EC28B', height: 0.5}}></View>
                    <Text style={{fontSize: 15, fontWeight: '500'}}>{item.tenThuoc}</Text>
                    <View style={{flexDirection: 'column', paddingTop: 0, backgroundColor: '#FFF'}}>
                        <Text style={{fontSize: 13, fontWeight: '500', color: '#2EC28B'}}>{item.dongGoi}</Text>
                        <Text style={{fontSize: 10, color: '#A7AFBC', paddingRight: 0, paddingTop: 10}}>Sản xuất tại {item.nuocSx}</Text>
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
        ]
        setProductData(productData);
        setCompanyList(companyData);
        setDrugList(drugData);
    },[])

    return (
        <SafeAreaView style={{flex:1, backgroundColor: '#F4F5F9'}}>
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection: 'column', padding: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 0}}>
                        <Text style={{fontSize: 25, color: '#36596A', fontWeight: '600'}}>
                            Xin chào
                        </Text>
                        <Image source={require('../../assets/images/profile.png')} style={{height: 42, width: 42}} />
                    </View>
                    <View style={{marginTop: 10, height: 60, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', borderRadius: 5, padding: 10}}>
                        <TextInput value={searchFilter} onChangeText={(value) => setSearchFilter(value)} placeholder='Tìm kiếm thuốc' placeholderTextColor={'#ABAEBE'} style={{flex: 8, height: '100%', fontSize: 18}}/>
                        <TouchableOpacity onPress={() => {navigation.navigate('DrugSearchScreen', {dataSearch: searchFilter})}} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesome name='search' size={25} color='#ABAEBE'/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{padding: 20, backgroundColor: '#1479FF', height: '20%',marginHorizontal: 20, borderRadius: 10}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 20, color: '#FFF', fontWeight: 'bold'}}>Tình hình COVID-19</Text>
                            <Text style={{color: '#FFF', paddingTop: 15}}>Thông tin về y tế.</Text>
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
                <View style={{flexDirection: 'column', padding: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 0}}>
                        <Text style={{fontSize: 20, color: '#36596A', fontWeight: '600'}}>
                            Doanh nghiệp nổi bật
                        </Text>
                        <TouchableOpacity style={{backgroundColor: '#FFF', padding: 6}}>
                            <Text style={{fontSize: 12, color: '#A7AFBC'}}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop: 10}}>
                        <FlatList 
                            data={companyList}
                            renderItem={renderCategoryItem}
                            keyExtractor={item => item.id}
                            horizontal
                            contentContainerStyle={{paddingTop: 10}}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
                <View style={{flexDirection: 'column', paddingHorizontal: 20}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 0}}>
                        <Text style={{fontSize: 20, color: '#36596A', fontWeight: '600'}}>
                            Thuốc được tìm kiếm nhiều
                        </Text>
                        <TouchableOpacity style={{backgroundColor: '#FFF', padding: 6}}>
                            <Text style={{fontSize: 12, color: '#A7AFBC'}}>Xem tất cả</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{paddingTop: 10}}>
                        <FlatList 
                            data={drugData}
                            renderItem={renderProductItem}
                            keyExtractor={item => item.id}
                            horizontal
                            contentContainerStyle={{padding: 0}}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MAIN_HomeScreen;