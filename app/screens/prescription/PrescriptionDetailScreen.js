import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity, Dimensions, StyleSheet, TextInput, ActivityIndicator, Alert} from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { useNavigation } from '@react-navigation/native';
const {width, height} = Dimensions.get("window");
import { useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/global/Actions';
import { ScrollView } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import { useRoute } from '@react-navigation/native';


const PresciptionDetailScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const route = useRoute();
    const data = route?.params?.data ?? {};
    const navigation = useNavigation();
    const [searchFilter, setSearchFilter] = useState('');
    const dispatch = useDispatch();
    const random = useSelector((state) => state.global.random);
    const prescriptionList = useSelector(state => state.global.prescription);
    const [footerLoad, setFooterLoad] = useState(false);
    const [listFavoriteDrug, setListFavoriteDrug] = useState([]);
    const [prescriptionName, setPrescriptionName] = useState('');
    const [prescriptionPatient, setPrescriptionPatient] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [description, setDescription] = useState('');
    const [drugList, setDrugList] = useState([]);
    
    const handleDelete = () => {
      var prescriptionId = route.params.data.id;
      prescriptionList.map((item, index) => {
        if(item.id === prescriptionId){
          dispatch(actions.removePrescriptionIndex(index));
        }
      })
      showMessage({
        message: 'Thành công',
        description: 'Xoá thành công đơn thuốc!',
        type: 'success',
      });
      navigation.goBack();
    }
    
    useEffect(() => {
        console.log(data.id);
        prescriptionList.map((item, index) => {
          if(item.id === data.id){
            setDrugList(item.drugList ?? []);
          }
        })
    },[prescriptionList, random]);

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#F4F5F9',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'column',
            padding: 25,
            backgroundColor: '#1479FF',
            height: '28%',
            borderBottomLeftRadius: 50,
            borderBottomRightRadius: 50,
            paddingHorizontal: 20,
          }}>
          <View style={{height: Platform.OS === 'ios' ? '20%' : '0%'}}></View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 0,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <FontAwesome name={'arrow-left'} size={25} color="#FFF" />
            </TouchableOpacity>
            <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
              Thêm đơn thuốc
            </Text>
            <Image source={require('../../assets/images/doctor_profile.jpeg')} style={{height: 42, width: 42, borderRadius: 42}} />
          </View>
          <View
            style={{
              marginTop: 20,
              height: Platform.OS === 'ios' ? '50%' : '50%',
              backgroundColor: '#FFF',
              flexDirection: 'row',
              borderRadius: 10,
              padding: 0,
            }}>
            <View
              style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={require('../../assets/images/prescription.png')}
                style={{height: 42, width: 42}}
              />
            </View>
            <View style={{flex: 6, justifyContent: 'center'}}>
              <Text
                style={{color: '#36596A', fontSize: 18, fontWeight: 'bold'}}>
                {data.name}
              </Text>
              <Text style={{color: '#A7AFBC', fontSize: 16, marginTop: 5}}>
                {data.patient}
              </Text>
            </View>
            <TouchableOpacity
              style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <FontAwesome style={{}} name={'pen'} size={20} color="#252B48" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1}}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#fb8c00"
              style={{flex: 1, justifyContent: 'center'}}
            />
          ) : (
            <ScrollView style={{flex: 1, marginBottom: '25%'}}>
              {drugList.length > 0 ? (
                <>
                {drugList.map((item, index) => {
                    return (
                        <View
                        key={index}
                        style={{
                        backgroundColor: 'white',
                        marginHorizontal: 20,
                        marginTop: 20,
                        padding: 15,
                        borderRadius: 10,
                        borderColor: '#EBEBEB',
                        borderWidth: 1,
                        flexDirection: 'row'
                        }}>
                        <View style={{flex: 6}}>
                            <Text
                            style={{
                                color: '#36596A',
                                fontWeight: 'bold',
                                fontSize: 16,
                            }}>
                            {item.tenThuoc}
                            </Text>
                            <Text
                            style={{
                                color: '#A7AFBC',
                                fontSize: 14,
                                marginTop: 10
                            }}>
                            Ngày {item.perDay} lần, mỗi lần {item.unit}
                            </Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate('PrescriptionDrugDetailScreen', {drugEdit: {prescription: data, drugIndex: index}});
                        }} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <FontAwesome name={'chevron-right'} size={20} color="#36596A" />
                        </TouchableOpacity>
                    </View>
                    )
                })}
                </>
              ) : (
                <></>
              )}
              <TouchableOpacity
              onPress={() => {
                navigation.navigate('DrugSearchScreen', {prescription: data});
              }}
                style={{
                  marginHorizontal: 20,
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <FontAwesome light name={'plus'} size={20} color="#1479FF" />
                <Text
                  style={{
                    color: '#1479FF',
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginHorizontal: 10,
                  }}>
                  Thêm thuốc
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              handleDelete();
            }}
            style={{
              flex: 1,
              backgroundColor: '#2EC28B',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 35,
              borderTopRightRadius: 35,
            }}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 20}}>
              Xoá đơn
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
};

export default PresciptionDetailScreen;

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