import React from 'react';
import { View, Text, SafeAreaView, FlatList, Image, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Alert} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get("window");
import { useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/global/Actions';


const ChatScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [searchFilter, setSearchFilter] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        
    }

    return (    
        <View style={{flex:1, backgroundColor: '#F4F5F9', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'column', padding: 25, backgroundColor: '#1479FF', height: '28%', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, paddingHorizontal: 20}}>
                <View style={{height: Platform.OS === 'ios' ? '20%' : '0%'}}></View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 0}}>
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
                    </TouchableOpacity>
                    <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
                        Thuốc yêu thích
                    </Text>
                    <Image source={require('../../assets/images/doctor_profile.jpeg')} style={{height: 42, width: 42, borderRadius: 42}} />
                </View>
                <View style={{marginTop: 20, height: Platform.OS === 'ios' ? '35%' : '50%', backgroundColor: '#FFF', justifyContent: 'space-between', flexDirection: 'row', borderRadius: 10, padding: 10}}>
                    <TextInput value={searchFilter} onChangeText={(value) => setSearchFilter(value)} placeholder='Tìm kiếm thuốc' placeholderTextColor={'#ABAEBE'} style={{flex: 8, height: '100%', fontSize: 18}}/>
                    <TouchableOpacity onPress={() => {handleSubmit()}} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <FontAwesome name='paper-plane' light size={25} color='#ABAEBE'/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{flex:1}}>
                {isLoading ? (
                        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
                    ):(
                        <View style={{flex: 1, padding: 20}}>
                            <Text style={{color: '#36596A', fontSize: 20}}>
                                Answer
                            </Text>
                        </View>
                    )}
            </View>
        </View> 
    );
};

export default ChatScreen;