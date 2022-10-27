import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
const {width, length} = Dimensions.get("window");
import { companyData, coSoBanBuon, coSoKinhDoanh, coSoSanXuat } from '../../data/CompanyData';

const ITEM_WIDTH = width/3 - 10*3;

const CompanyListScreen = () => {
    const [categoryList, setCategoryList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigation();
    const [category, setCategory] = useState('SX');
    const [companyList, setCompanyList] = useState([]);

    const renderCompany = ({item}) => {
        return (
            <TouchableOpacity style={{padding: 10}}>
                <View>
                    <Text style={{color: '#36596A'}}>{category === 'SX' ? item.name : item.title}</Text>
                </View>
                <View style={{backgroundColor: '#F4F5F7', width: '100%', height: 1}}></View>
            </TouchableOpacity>
        )
    }
    
    useEffect(() => {
        if(category === 'SX'){
            setCompanyList(coSoSanXuat)
        }
        else if(category === 'BB'){
            setCompanyList(coSoBanBuon);
        }
        else if(category === 'KD'){
            setCompanyList(coSoKinhDoanh);
        }
        console.log(coSoSanXuat)
    },[category])

    return (    
        <View style={{flex:1, backgroundColor: '#F4F5F9', justifyContent: 'space-between'}}>
            <View style={{position: 'absolute', width: '100%', zIndex: -0, flexDirection: 'column', justifyContent: 'space-between', padding: 25, backgroundColor: '#1479FF', height: '28%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingBottom: 50}}>
                    <TouchableOpacity onPress={()=>{navigate.goBack()}}>
                        <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
                        Doanh nghiệp
                    </Text>
                    <Image source={require('../../assets/images/profile.png')} style={{height: 42, width: 42}} />
                </View>
            </View>
            <View style={{flex:1, backgroundColor: '#FFF', height: '100%', width: '100%', position: 'absolute', top: 150, borderTopLeftRadius: 20, borderTopEndRadius: 30}}>
                <View style={{flexDirection: 'row', paddingTop: 20, marginHorizontal: 5}}>
                    <TouchableOpacity onPress={() => {
                        setCategory('SX');
                    }} style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold' ,color: category === 'SX' ? '#1479FF' : '#A7AFBC'}}>
                            Sản xuất
                        </Text>
                        <View style={{backgroundColor: category === 'SX' ? '#1479FF' : '#F4F5F7', width: '100%', height: 2, marginVertical: 15}}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setCategory('BB');
                    }} style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold' ,color: category === 'BB' ? '#1479FF' : '#A7AFBC'}}>
                            Bán buôn
                        </Text>
                        <View style={{backgroundColor: category === 'BB' ? '#1479FF' : '#F4F5F7', width: '100%', height: 2, marginVertical: 15}}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setCategory('KD');
                    }} style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold' ,color: category === 'KD' ? '#1479FF' : '#A7AFBC'}}>
                            Kinh doanh
                        </Text>
                        <View style={{backgroundColor: category === 'KD' ? '#1479FF' : '#F4F5F7', width: '100%', height: 2, marginVertical: 15}}></View>
                    </TouchableOpacity>
                </View>
                <FlatList 
                    data={companyList}
                    renderItem={renderCompany}
                    keyExtractor={item => item.id}
                    contentContainerStyle={{paddingTop: 0}}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default CompanyListScreen;