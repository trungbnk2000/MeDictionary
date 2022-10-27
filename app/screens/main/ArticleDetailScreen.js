import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, ScrollView} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import { useState } from 'react';
import { Button } from 'react-native-elements';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation, useRoute} from '@react-navigation/native';

const ArticleDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const {data} = route.params;
    const [articleData, setArticleData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
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
                <View style={{width: '100%', height: 300, backgroundColor: '#FFFFFF', marginTop: 20, padding: 10, alignItems: 'center', borderRadius: 10}}>
                    <View style={{flex: 4, backgroundColor: '#ff0000', width: '100%', borderRadius: 10}}>
                        <Image source={require('../../assets/images/Article1.png')} style={{height:'100%', width: '100%', borderRadius: 10}}/>
                    </View>
                    <View style={{flex: 2, paddingTop: 10, marginHorizontal: 2}}>
                        <Text style={{fontSize: 16, color:'#36596A', fontWeight: 'bold', lineHeight: 25}}>
                            {data.name}
                        </Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10}}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={require('../../assets/images/profile.png')} style={{height: 35, width: 35}} />
                                <Text style={{paddingLeft: 10, fontSize: 15, color: '#A7AFBC'}}>{data.author}</Text>
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <FontAwesome name='clock' size={20} color='#2EC28B' style={{paddingRight: 10}}/>
                                <Text style={{color: '#A7AFBC'}}>{data.time}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{height: 500, paddingTop: 20, marginHorizontal: 0}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#36596A'}}>About Health Care</Text>
                    <ScrollView style={{paddingTop: 10}}>
                        <Text style={{fontSize: 20, color: '#A7AFBC', lineHeight: 30}}>
                            Lorem Ipsum has bedeng the industry's standard dummy text everg since the to1500s, when ang unknown printer took a galley of type and vey scrambled it to make a type specimen book.s, but also the leap into electronic typesetting, toinremaining essentially unchanged. It waspopularised in the 1960s with the releaof Letraset sheets containing.Lorem Ipsum has bedeng the industry's standard dummy text everg since the to1500s, when ang unknown printer took a galley of type and vey scrambled it to make a type specimen book.s, but also the leap into electronic typesetting, toinremaining essentially unchanged. It waspopularised in the 1960s with the releaof Letraset sheets containing.
                        </Text>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default ArticleDetailScreen;