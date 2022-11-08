import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, ScrollView} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button, Divider } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation, useRoute} from '@react-navigation/native';

const DetailProductScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {data} = route.params;
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        
    },[])

    return (    
        <View style={{flex:1, backgroundColor: '#F4F5F9', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', padding: 25, backgroundColor: '#1479FF', height: '30%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
                        Thông tin thuốc
                    </Text>
                    <Image source={require('../../assets/images/doctor_profile.png')} style={{height: 42, width: 42}} />
                </View>
                <View style={{height: 700}}>
                    <View style={{height: '35%', marginTop: 25, backgroundColor: '#fff', borderRadius: 10, padding: 10, elevation: 10, shadowOpacity: 0.3, shadowRadius: 10}}>
                        <Image source={{uri: 'https://drugbank.vn/api/public/gridfs/' + data.images[0]}} style={{borderRadius: 10, height: '100%', width: '100%'}} resizeMode='cover'/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', paddingTop: 10}}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#36596A'}}>Tên thuốc: {data.tenThuoc}</Text>
                        <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>Số đăng ký: {data.soDangKy}</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{paddingTop: 10, fontSize: 16, fontWeight: 'bold', color: '#2EC28B'}}>Hoạt chất-Nồng độ</Text>
                            <Text style={{paddingTop: 10, fontSize: 16, fontWeight: 'bold', color: '#2EC28B'}}>Hàm lượng</Text>
                        </View>
                        <View style={{flexDirection: 'row', paddingTop: 10, justifyContent: 'space-between'}}>
                            <View>
                                {data.hoatChat.split('; ')?.map((item, index) => (
                                    <Text key={index} style={{fontSize: 16, color: '#A7AFBC', paddingBottom: item.length < 20 ? 25 : 5, paddingRight: 30}}>
                                        {item}
                                    </Text>
                                ))}
                            </View>
                            <View>
                                {data.nongDo.split('; ')?.map((item, index) => (
                                    <Text key={index} style={{fontSize: 14, color: '#A7AFBC',paddingBottom: data.nongDo.split(';').length > 1? 30 : 0, fontWeight: 'bold'}}>
                                    -{item}
                                    </Text>
                                ))} 
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{flexDirection: 'column', padding: 25, backgroundColor: '#FFFFFF', height: '35%', borderTopLeftRadius: 50, borderTopRightRadius: 50, paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold' ,color: '#1479FF'}}>
                            Thông tin
                        </Text>
                        <View style={{backgroundColor: '#1479FF', width: '100%', height: 2, marginVertical: 15}}></View>
                    </View>
                    <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold' ,color: '#A7AFBC'}}>
                            Tư vấn
                        </Text>
                        <View style={{backgroundColor: '#F4F5F7', width: '100%', height: 2, marginVertical: 15}}></View>
                    </View>
                </View>
                <ScrollView>
                    <Text style={{fontSize: 18, color: '#A7AFBC', lineHeight: 25}}>
                        Lorem Ipsum has been the industry's standard dummy text ever.
                    </Text>
                    <Text style={{fontSize: 20, fontWeight: 'bold', color: '#36596A', paddingTop: 15}}>
                        Tác dụng của thuốc
                    </Text>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                        <FontAwesome name={'check'} size={20} color="#2EC28B" />
                        <Text style={{fontSize: 18, color: '#A7AFBC', paddingLeft: 5}}>Lorem Ipsum has bedeng.</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                        <FontAwesome name={'check'} size={20} color="#2EC28B" />
                        <Text style={{fontSize: 18, color: '#A7AFBC', paddingLeft: 5}}>Lorem Ipsum has bedeng.</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                        <FontAwesome name={'check'} size={20} color="#2EC28B" />
                        <Text style={{fontSize: 18, color: '#A7AFBC', paddingLeft: 5}}>Lorem Ipsum has bedeng.</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                        <FontAwesome name={'check'} size={20} color="#2EC28B" />
                        <Text style={{fontSize: 18, color: '#A7AFBC', paddingLeft: 5}}>Lorem Ipsum has bedeng.</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 5}}>
                        <FontAwesome name={'check'} size={20} color="#2EC28B" />
                        <Text style={{fontSize: 18, color: '#A7AFBC', paddingLeft: 5}}>Lorem Ipsum has bedeng.</Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default DetailProductScreen;