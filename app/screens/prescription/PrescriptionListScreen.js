import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Alert} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get("window");
import { useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/global/Actions';


const PrescriptionListScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [searchFilter, setSearchFilter] = useState('');
    const dispatch = useDispatch();
    const bookmarks = useSelector(state => state.global.bookmarks);
    const [footerLoad, setFooterLoad] = useState(false);
    const [listFavoriteDrug, setListFavoriteDrug] = useState([]);
    const [hasPrescription, setHasPrescription] = useState(true);

    const _renderDrug = ({item}) => {
        const [isFavour, setIsFavour] = useState(false);

        const handleRemoveBookmark = (index) => {
            Alert.alert(
                'Xác nhận xoá thuốc khỏi mục yêu thích!',
                'Sau khi xoá, những dự liệu về thuốc trước đây cũng bị xoá! Bạn có chắc chắn xoá thuốc này không?',
                [
                    {
                      text: 'Huỷ',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {
                      text: 'Xoá',
                      onPress: () => {
                        dispatch(actions.removeBookmarkIndex(index));
                      },
                    },
                  ],
            )   
        }
        
        var check = bookmarks?.findIndex(i => i.id == item?.id);
        
        return (
            <TouchableOpacity onPress={() => navigation.navigate('DrugDetailScreen', {data: item})} style={{backgroundColor: '#FFF',justifyContent: 'space-evenly', width: width - 20*2, height: height/4 - 20*2 , marginHorizontal: 20, marginTop: 25, borderRadius: 10, padding: 10, ...Platform.select({
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
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => {
                        handleRemoveBookmark(check);
                    }}>
                        <FontAwesome solid={check > -1 ? true : false} name='heart' size={25} color={'#2EC28B'} />
                    </TouchableOpacity>
                    <Text style={{color: '#36596A', fontSize: 18, fontWeight: 'bold', paddingLeft: 10}}>{item.soDangKy}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <FontAwesome name='notes-medical' color={'#2EC28B'} size={15}/>
                    <Text style={{paddingLeft: 20, color: '#A7AFBC', fontSize: 16, fontWeight: 'bold'}}>{item.tenThuoc}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name='syringe' color={'#2EC28B'} size={15}/>
                    <Text style={{paddingLeft: 20, color: '#A7AFBC', fontSize: 16}}>{item.baoChe}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name='briefcase-medical' color={'#2EC28B'} size={15}/>
                    <Text style={{paddingLeft: 20, color: '#A7AFBC', fontSize: 16}}>{item.congTySxCode}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    
    useEffect(() => {
        console.log(searchFilter);
        var _bookmarks = [];
        if(searchFilter != ''){
            bookmarks.map((item, index) => {
                if(item.soDangKy.includes(searchFilter) || item.tenThuoc.includes(searchFilter)){
                    _bookmarks.push(item);
                }
            })
        }
        else{
            _bookmarks = bookmarks;
        }
        console.log(_bookmarks);
        setListFavoriteDrug(_bookmarks ?? []);
    },[bookmarks, searchFilter])

    return (    
        <View style={{flex:1, backgroundColor: '#F4F5F9', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', padding: 25, backgroundColor: '#1479FF', height: '40%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, paddingHorizontal: 20}}>
                <View style={{height: Platform.OS === 'ios' ? '15%' : '0%'}}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 0}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
                        Đơn thuốc
                    </Text>
                    <Image source={require('../../assets/images/profile.png')} style={{height: 42, width: 42}} />
                </View>
                <View style={{marginTop: 20, height: Platform.OS === 'ios' ? '25%' : '40%', backgroundColor: '#F4F5F9', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 10, padding: 5}}>
                    <TouchableOpacity onPress={() => {
                        if(hasPrescription){

                        }
                        else{
                            setHasPrescription(true);
                        }
                    }} style={{flex: 1, backgroundColor: hasPrescription ? '#2EC28B' : '#F4F5F9', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: hasPrescription ? '#fff' : '#36596A', fontWeight: 'bold', fontSize: 16}}>Đã có đơn thuốc</Text>
                        <Text style={{color: hasPrescription ? '#fff' : '#A7AFBC'}}>hoặc hình sản phẩm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if(!hasPrescription){

                        }
                        else{
                            setHasPrescription(false);
                        }
                    }} style={{flex: 1, backgroundColor: !hasPrescription ? '#2EC28B' : '#F4F5F9', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: !hasPrescription ? '#fff' : '#36596A', fontWeight: 'bold', fontSize: 16}}>Chưa có</Text>
                        <Text style={{color: !hasPrescription ? '#fff' : '#A7AFBC'}}>thêm thuốc vào đơn</Text>
                    </TouchableOpacity>   
                </View>
                {
                    hasPrescription ? (
                        <TouchableOpacity style={{marginTop: 20, height: Platform.OS === 'ios' ? '25%' : '40%', backgroundColor: '#F4F5F9', justifyContent: 'space-between',alignItems:'center', borderRadius: 10, padding: 5}}>
                            <FontAwesome name='camera' size={30} light />
                            <Text style={{color: '#36596A'}}>Chọn/Chụp ảnh</Text>
                        </TouchableOpacity>
                    ) : (
                        <View style={{marginTop: 20, height: Platform.OS === 'ios' ? '25%' : '40%', flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', borderRadius: 10}}>
                            <View style={{height: '100%', width: '70%', flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, padding: 10}}>
                                <TextInput placeholder='Tìm kiếm đơn' placeholderTextColor={'#ABAEBE'} style={{height: '100%', fontSize: 18}}/>
                            </View>
                            <TouchableOpacity style={{height: '100%', width: '25%', backgroundColor: '#fff', borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', padding: 5}}>
                                <FontAwesome name='prescription-bottle' size={25} color={'#A7AFBC'} />
                                <Text style={{color: '#A7AFBC'}}>Thêm đơn</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
            <View style={{flex:1}}>
                {isLoading ? (
                        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
                    ):(
                        <View style={{flex: 1}}>
                            <FlatList 
                                data={listFavoriteDrug}
                                renderItem={(item) => <_renderDrug item={item.item}/>}
                                keyExtractor={item => item.id}
                                contentContainerStyle={{paddingBottom: 60}}
                                showsVerticalScrollIndicator={false}
                                onEndReached={() => console.log('End')}
                                onEndReachedThreshold={0.3}
                                ListFooterComponent={footerLoad ? <ActivityIndicator /> : <View />}
                                ListEmptyComponent={() => (
                                    <Text style={{textAlign: 'center', color: '#FFF', marginTop: 10}}>Không có kết quả</Text>
                                  )}
                            />
                        </View>
                    )}
            </View>
        </View>
    );
};

export default PrescriptionListScreen;