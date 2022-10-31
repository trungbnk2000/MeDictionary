import React from 'react';
import { View, Text, Platform, FlatList, Image, TouchableOpacity, ScrollView, Animated, Linking} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button, Divider } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation, useRoute} from '@react-navigation/native';
import { DraggableBottomSheet, ButtonBottomSheet } from './components';



const DrugDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {data} = route.params;
    const [productData, setProductData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollY = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        console.log(data);
    },[])

    const handlePress = () => {
        let fileUrl = data.fileName ?? '';
        if (Platform.OS === 'ios' && fileUrl != '') {
            Linking.openURL(fileUrl).catch((err) => console.error('An error occurred', err));
          } else {
            Linking.openURL(fileUrl).catch((err) => console.error('An error occurred', err));
          }
    }

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
                    {data.fileName ? (
                        <TouchableOpacity onPress={() => handlePress()} >
                            <FontAwesome name='file-pdf' size={25} light color={'#fff'} />
                        </TouchableOpacity>
                    ) : (
                        <Image source={require('../../assets/images/profile.png')} style={{height: 42, width: 42}} />
                    )}
                </View>
                <View style={{height: 500}}>
                    <View style={{height: '35%', marginTop: 25, backgroundColor: '#fff', borderRadius: 10, padding: 5, ...Platform.select({
                        android: {elevation: 3},
                        ios: {
                            shadowColor: '#a8bed2',
                            shadowOpacity: 1,
                            shadowRadius: 6,
                            shadowOffset: {
                                width: 2,
                                height: 2,
                            }
                        }
                    })}}>
                        <Image source={require('../../assets/images/Article1.png')} style={{borderRadius: 10, height: '100%', width: '100%'}} resizeMode='cover'/>
                    </View>
                    <View style={{flex: 1, flexDirection: 'column', paddingTop: 10}}>
                        <Text style={{fontSize: 25, fontWeight: 'bold', color: '#36596A'}}>Tên thuốc: {data.tenThuoc}</Text>
                        <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>Số đăng ký: {data.soDangKy}</Text>
                        <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>Dạng bào chế: {data.baoChe}</Text>
                    </View>
                </View>
            </View>
            <DraggableBottomSheet item={data}/>
            <ButtonBottomSheet item={data} />
        </View>
    );
};

export default DrugDetailScreen;