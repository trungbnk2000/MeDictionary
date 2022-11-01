import React from 'react';
import { Platform, View, Text, TextInput, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions, ActivityIndicator} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation, useRoute } from '@react-navigation/native';
import { requestPOST_CD } from '../../services/Api';
import { useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/global/Actions';
const {width, height} = Dimensions.get("window");

const ITEM_WIDTH = width/2 - 10*3;

const DrugSearchScreen = () => {
    const route = useRoute();
    const {dataSearch} = route.params ?? ' ';
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [drugList, setDrugList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [perpage, setPerpage] = useState(1);
    const [footerLoad, setFooterLoad] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const [searchFilter, setSearchFilter] = useState('')
    const bookmarks = useSelector(state => state.global.bookmarks);

    const _renderDrug = ({item}) => {
        
        var check = bookmarks?.findIndex(i => i.id == item?.id);
        //check > -1 => true
        return (
            <TouchableOpacity onPress={() => {
                navigation.navigate('DrugDetailScreen', {data: item});
            }} style={{backgroundColor: '#FFF', width: width/2 - 15, height: ITEM_WIDTH + 40, marginLeft: 10, marginBottom: 10, borderRadius: 10, ...Platform.select({
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
                <View style={{flex: 1, alignItems: 'center', alignSelf: 'center', width: ITEM_WIDTH - 20, height: ITEM_WIDTH/2 + 10}}>
                    <Image source={require('../../assets/images/Frame.png')} style={{flex:1, paddingTop: 20}} resizeMode='contain' />
                    <TouchableOpacity onPress={() => {
                        if(check > -1){
                            handleRemoveBookmark(check);
                        }
                        else{
                            handleAddBookmark(item);
                        }

                    }} style={{ backgroundColor: '#FFF', position: 'absolute', top: 5, right: -5, height: 25, width: 25, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <FontAwesome solid={check > -1 ? true : false} name={'heart'} size={15} color="#2EC28B" />
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1, marginHorizontal: 10, justifyContent: 'space-evenly'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome name='barcode' color={'#36596A'}/>
                        <Text style={{color: '#36596A', fontWeight: 'bold', fontSize: 12, paddingLeft: 2}}>{item.soDangKy}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome name='pills' color={'#2EC28B'}/>
                        <Text style={{color: '#2EC28B', fontSize: 14, paddingLeft: 2}}>{item.tenThuoc}</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <FontAwesome name='briefcase-medical' color={'#2EC28B'}/>
                        <Text style={{color: '#A7AFBC', fontSize: 12}}> {item.congTySxCode}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    const initialiseList = async () => {
        setIsLoading(true);
        setAllLoaded(false);
        setPerpage(1);

        var res = await requestPOST_CD(
            `https://cdninhthuan.hanhchinhcong.net/api/v1/drugs/search`,
            {
                advancedSearch: {
                    fields: ['soDangKy', 'tenThuoc'],
                    keyword: dataSearch ?? null
                },
                pageNumber : 1,
                pageSize: 10
            }
        );

        if(res.status === 200){
            setDrugList(res.data?.data);
        }
        setIsLoading(false);
    }
    
    const loadMoreDrug = async () => {
        if (footerLoad || allLoaded) {
            return;
          }
        setFooterLoad(true);

        var res = await requestPOST_CD(
            `https://cdninhthuan.hanhchinhcong.net/api/v1/drugs/search`,
            {
                advancedSearch: {
                    fields: ['soDangKy', 'tenThuoc'],
                    keyword: dataSearch ?? null
                },
                pageNumber : perpage + 1,
                pageSize: 10
            }
        );

        if(res.status === 200){
            var data = res?.data?.data ?? [];
            if(data.length === 0){
                setAllLoaded(true);
            }
            else{
                var tmp = [...drugList, ...data];
                setDrugList(tmp);
                setPerpage(perpage + 1);
            }
            setFooterLoad(false);
        }
    }

    useEffect(() => {
        initialiseList();
        console.log('Reload');
        return () => {};
    },[dataSearch])

    const handleAddBookmark = newItem => {
        dispatch(actions.addBookmarkItem(newItem));
      };
      const handleRemoveBookmark = index => {
        dispatch(actions.removeBookmarkIndex(index));
      };

    return (    
        <View style={{flex:1, backgroundColor: '#F4F5F9'}}>
            <View style={{flexDirection: 'column', padding: 25, backgroundColor: '#1479FF', height: '28%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, paddingHorizontal: 20}}>
                <View style={{height: Platform.OS === 'ios' ? '20%' : '0%'}}></View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
                        Danh sách thuốc
                    </Text>
                    <Image source={require('../../assets/images/profile.png')} style={{height: 42, width: 42}} />
                </View>
                <View style={{marginTop: 20, height: Platform.OS === 'ios' ? '35%' : '50%', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#FFF', borderRadius: 10, padding: 10}}>
                    <TextInput value={searchFilter} onChangeText={(value) => setSearchFilter(value)} placeholder='Tìm kiếm thuốc' placeholderTextColor={'#ABAEBE'} style={{flex: 8, height: '100%', fontSize: 18}}/>
                    <TouchableOpacity onPress={() => {navigation.navigate('DrugSearchScreen', {dataSearch: searchFilter})}} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome name='search' size={25} color='#ABAEBE'/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex: 1}}>
                {isLoading ? (
                        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
                    ):(
                        <View style={{flex: 1, paddingTop: 10}}>
                            <FlatList 
                                showsVerticalScrollIndicator={false}
                                data={drugList}
                                renderItem={(item) => <_renderDrug item={item.item}/>}
                                keyExtractor={item => item.id}
                                numColumns={2}
                                key={2}
                                contentContainerStyle={{paddingBottom: 60, flexGrow: 1}}
                                onEndReached={() => loadMoreDrug()}
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

export default DrugSearchScreen;