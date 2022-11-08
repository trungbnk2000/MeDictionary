import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get("window");

ITEM_WIDTH = width - 10*4;

const ArticleListScreen = () => {
    const navigation = useNavigation();
    const [articleData, setArticleData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const renderProductItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => {navigation.navigate('ArticleDetailScreen', {data: item})}} 
                style={{backgroundColor: '#FFF', marginVertical: 10, height: 300, width: ITEM_WIDTH, padding: 10, alignItems: 'center', borderRadius: 10, }}>
                <View style={{flex: 4, backgroundColor: '#ff0000', width: '100%', borderRadius: 10}}>
                    <Image source={item.image} style={{height:'100%', width: '100%', borderRadius: 10}}/>
                </View>
                <View style={{flex: 2, paddingTop: 10, marginHorizontal: 2}}>
                    <Text style={{fontSize: 16, color:'#36596A', fontWeight: 'bold', lineHeight: 25}}>
                        {item.name}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={require('../../assets/images/doctor_profile.png')} style={{height: 35, width: 35}} />
                            <Text style={{paddingLeft: 10, fontSize: 15, color: '#A7AFBC'}}>{item.author}</Text>
                        </View>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <FontAwesome name='clock' size={20} color='#2EC28B' style={{paddingRight: 10}}/>
                            <Text style={{color: '#A7AFBC'}}>{item.time}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    useEffect(() => {
        let _articleData = [
            {
                id: 1,
                name: '6 Simple Excercises To Improve Your Lung Health',
                author: 'Caitlynn Potts',
                time: '5 hour ago',
                image: require('../../assets/images/Article1.png')
            },
            {
                id: 2,
                name: '45 Food Items That May Help To Control Blood Sugar',
                author: 'Victor Hansen',
                time: '7 hour ago',
                image: require('../../assets/images/Article2.png')
            },
            {
                id: 3,
                name: '45 Food Items That May Help To Control Blood Sugar',
                author: 'Victor Hansen',
                time: '7 hour ago',
                image: require('../../assets/images/Article1.png')
            }
        ]
        setArticleData(_articleData);
    },[])

    return (    
        <View style={{flex:1, backgroundColor: '#F4F5F9'}}>
            <View style={{flexDirection: 'column', padding: 25, backgroundColor: '#1479FF', height: '28%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, paddingHorizontal: 20}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 50}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
                        Bài viết
                    </Text>
                    <TouchableOpacity style={{backgroundColor: '#2B86FF', height: 40, width: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'space-around'}}>
                        <FontAwesome name='search' size={15} color='#FFF'/>
                    </TouchableOpacity>
                </View>
                <View style={{height: 700}}>
                    <FlatList 
                        data={articleData}
                        renderItem={renderProductItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{paddingTop: 10}}
                    />
                </View>
            </View>
        </View>
    );
};

export default ArticleListScreen;