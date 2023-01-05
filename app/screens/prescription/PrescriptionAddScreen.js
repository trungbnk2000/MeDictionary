import React from 'react';
import { View, Text, SafeAreaView,KeyboardAvoidingView, Image, TouchableOpacity, Dimensions, StyleSheet, TextInput, ActivityIndicator, Alert} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get("window");
import { useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/global/Actions';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';


const MainScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();
    const [searchFilter, setSearchFilter] = useState('');
    const dispatch = useDispatch();
    const prescription = useSelector(state => state.global.prescription);
    const [footerLoad, setFooterLoad] = useState(false);
    const [listFavoriteDrug, setListFavoriteDrug] = useState([]);
    const [prescriptionName, setPrescriptionName] = useState('');
    const [prescriptionPatient, setPrescriptionPatient] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [description, setDescription] = useState('');
    
    const create_UUID = () => {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (dt + Math.random() * 16) % 16 | 0;
          dt = Math.floor(dt / 16);
          return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
      };
    
    const handlePost = () => {
        var body = {
            id: create_UUID(),
            name: prescriptionName,
            patient: prescriptionPatient,
            description: description,
            drugList: [],
        }

        dispatch(actions.addPrescriptionItem(body));
        showMessage({
            message: 'Thành công',
            description: 'Thêm thành công vào danh sách!',
            type: 'success',
        });
        navigation.navigate('PrescriptionListScreen');
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
                        Thêm đơn thuốc
                    </Text>
                    <Image source={require('../../assets/images/doctor_profile.jpeg')} style={{height: 42, width: 42, borderRadius: 42}} />
                </View>
                <View style={{marginTop: 20, height: Platform.OS === 'ios' ? '40%' : '50%', backgroundColor: '#FFF', flexDirection: 'row', borderRadius: 10, padding: 10}}>
                    <View style={{flex: 1}}>
                        <TextInput value={prescriptionName} onChangeText={setPrescriptionName} placeholder='Tên bệnh chẩn đoán' placeholderTextColor={'#ABAEBE'} style={{flex: 8, height: '100%', fontSize: 18, fontWeight: 'bold'}}/>
                    </View>
                </View>
            </View>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{flex: 1}}>
                {isLoading ? (
                        <ActivityIndicator size="large" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
                    ):(
                        <ScrollView style={{flex: 1}}>
                            <View style={{backgroundColor: 'white', margin: 20, padding: 15, borderRadius: 10, borderColor: '#EBEBEB', borderWidth: 1}}>
                                <Text style={{color: '#36596A', fontWeight: 'bold', fontSize: 16}}>
                                    Bệnh nhân
                                </Text>
                                <TextInput value={prescriptionPatient} onChangeText={setPrescriptionPatient} placeholder='Tên bệnh nhân' placeholderTextColor={'#A7AFBC'} style={{fontSize: 14, marginTop: 10, color: '#A7AFBC'}}/>
                            </View>
                            <View style={{backgroundColor: 'white', marginHorizontal: 20, padding: 15, borderRadius: 10, borderColor: '#EBEBEB', borderWidth: 1}}>
                                <Text style={{color: '#36596A', fontWeight: 'bold', fontSize: 16}}>
                                    Ngày kê đơn
                                </Text>
                                <TextInput value={createDate} onChangeText={setCreateDate} placeholder='Ngày kê đơn' placeholderTextColor={'#A7AFBC'} style={{fontSize: 14, marginTop: 10, color: '#A7AFBC'}}/>
                            </View>
                            <View style={{backgroundColor: 'white', margin: 20, padding: 15, borderRadius: 10, borderColor: '#EBEBEB', borderWidth: 1}}>
                                <Text style={{color: '#36596A', fontWeight: 'bold', fontSize: 16}}>
                                    Ngày tái khám
                                </Text>
                                <TextInput value={expireDate} onChangeText={setExpireDate} placeholder='Ngày tái khám' placeholderTextColor={'#A7AFBC'} style={{fontSize: 14, marginTop: 10, color: '#A7AFBC'}}/>
                            </View>
                            <View style={{backgroundColor: 'white', marginHorizontal: 20, padding: 15, borderRadius: 10, borderColor: '#EBEBEB', borderWidth: 1}}>
                                <Text style={{color: '#36596A', fontWeight: 'bold', fontSize: 16}}>
                                    Ghi chú
                                </Text>
                                <TextInput value={description} onChangeText={setDescription} placeholder='Ghi chú' placeholderTextColor={'#A7AFBC'} multiline style={{fontSize: 14, marginTop: 10, color: '#A7AFBC', height: 70}}/>
                            </View>
                        </ScrollView>

                    )}
            </KeyboardAvoidingView>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    if(prescriptionName || prescriptionPatient){
                        handlePost();
                    }
                    else{
                        showMessage({
                            message: 'Không thành công',
                            description: 'Vui lòng điền đầy đủ thông tin đơn thuốc!',
                            type: 'warning',
                        });
                    }
                }} style={{flex: 1, backgroundColor: '#2EC28B', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 35, borderTopRightRadius: 35}}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 20}}>
                        Thêm đơn
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',  
        width: '100%',
        height: '10%',
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32
    }
})