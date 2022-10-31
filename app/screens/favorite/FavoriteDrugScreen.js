import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Alert} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get("window");
import { useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/global/Actions';


const FavoriteDrugScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [searchFilter, setSearchFilter] = useState('');
    const dispatch = useDispatch();
    const bookmarks = useSelector(state => state.global.bookmarks);
    const [footerLoad, setFooterLoad] = useState(false);
    const [listFavoriteDrug, setListFavoriteDrug] = useState([]);

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
            <TouchableOpacity onPress={() => navigation.navigate('DrugDetailScreen', {data: item})} style={{backgroundColor: '#FFF',justifyContent: 'space-evenly', width: width - 20*2, height: height/4 - 20*2 , marginHorizontal: 20, marginTop: 25, borderRadius: 10, padding: 10}}>
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
            <View style={{width: '100%', flexDirection: 'column', justifyContent: 'space-between', padding: 25, backgroundColor: '#1479FF', height: '28%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50, paddingBottom: 10}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
                        Thuốc yêu thích
                    </Text>
                    <Image source={require('../../assets/images/profile.png')} style={{height: 42, width: 42}} />
                </View>
                <View style={{flex: 1, height: '100%', backgroundColor: '#FFF', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 10}}>
                    <View style={{flex:8, flexDirection: 'row', justifyContent: 'space-between'}}>     
                        <View style={{flex: 10, padding: 10}}>
                            <TextInput autoComplete='false' value={searchFilter} onChangeText={(value) => setSearchFilter(value)} placeholder='Tìm kiếm thuốc' placeholderTextColor={'#ABAEBE'} style={{flex: 8, height: '100%', fontSize: 18}}/>
                        </View>
                        <TouchableOpacity style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
                            <FontAwesome name='search' color={'#A7AFBC'} size={25}/>
                        </TouchableOpacity>
                    </View>
                </View>
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

export default FavoriteDrugScreen;