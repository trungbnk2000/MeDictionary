import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import {useSelector, useDispatch} from 'react-redux';
import * as actions from '../../redux/global/Actions';

const PrescriptionListScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [searchFilter, setSearchFilter] = useState('');
  const dispatch = useDispatch();
  const prescription = useSelector(state => state.global.prescription);
  const [footerLoad, setFooterLoad] = useState(false);
  const [listFavoriteDrug, setListFavoriteDrug] = useState([]);
  const [hasPrescription, setHasPrescription] = useState(true);
  const [listPresciption, setListPresciption] = useState([]);

  const _renderDrug = ({item}) => {
    const [isFavour, setIsFavour] = useState(false);

    var check = prescription?.findIndex(i => i.id == item?.id);
    var check = false;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('PrescriptionDetailScreen', {data: item});
        }}
        style={{
          backgroundColor: '#FFF',
          justifyContent: 'space-around',
          width: width - 20 * 2,
          height: height / 6 - 20 * 2,
          marginHorizontal: 20,
          marginTop: 15,
          borderRadius: 10,
          padding: 10,
          borderColor: '#FFFFFF',
          borderWidth: 1,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome
            solid={check > -1 ? true : false}
            name="notes-medical"
            size={25}
            color={'#2EC28B'}
          />

          <Text
            style={{
              color: '#36596A',
              fontSize: 18,
              fontWeight: 'bold',
              paddingLeft: 10,
            }}>
            {item.name}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <FontAwesome name="user" color={'#2EC28B'} size={20} />
          <Text
            style={{
              paddingLeft: 10,
              color: '#A7AFBC',
              fontSize: 16,
            }}>
            {item.patient}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setListPresciption(prescription);
  }, [prescription]);

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
          height: '25%',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
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
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome name={'arrow-left'} size={25} color="#1479FF" />
          </TouchableOpacity>
          <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
            Đơn thuốc của tôi
          </Text>
          <View style={{height: 42, width: 42, borderRadius: 42, backgroundColor: '#1479FF'}}></View>
        </View>
        <View
          style={{
            marginTop: 20,
            height: Platform.OS === 'ios' ? '40%' : '40%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <View
            style={{
              height: '100%',
              width: '70%',
              flexDirection: 'row',
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 10,
            }}>
            <TextInput
              placeholder="Tìm kiếm đơn"
              placeholderTextColor={'#ABAEBE'}
              style={{height: '100%', fontSize: 18}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PrescriptionAddScreen');
            }}
            style={{
              height: '100%',
              width: '25%',
              backgroundColor: '#fff',
              borderRadius: 10,
              justifyContent: 'space-evenly',
              alignItems: 'center',
              padding: 5,
            }}>
            <FontAwesome
              name="prescription-bottle"
              size={20}
              color={'#2EC28B'}
            />
            <Text style={{color: '#2EC28B'}}>Thêm đơn</Text>
          </TouchableOpacity>
        </View>
        {/* {!hasPrescription ? (
          <TouchableOpacity
            style={{
              marginTop: 20,
              height: Platform.OS === 'ios' ? '25%' : '40%',
              backgroundColor: '#F4F5F9',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
              padding: 5,
            }}>
            <FontAwesome name="camera" size={30} light />
            <Text style={{color: '#36596A'}}>Chọn/Chụp ảnh</Text>
          </TouchableOpacity>
        ) : (
          <View
            style={{
              marginTop: 20,
              height: Platform.OS === 'ios' ? '25%' : '40%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                height: '100%',
                width: '70%',
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 10,
              }}>
              <TextInput
                placeholder="Tìm kiếm đơn"
                placeholderTextColor={'#ABAEBE'}
                style={{height: '100%', fontSize: 18}}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PrescriptionAddScreen');
              }}
              style={{
                height: '100%',
                width: '25%',
                backgroundColor: '#fff',
                borderRadius: 10,
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 5,
              }}>
              <FontAwesome
                name="prescription-bottle"
                size={25}
                color={'#A7AFBC'}
              />
              <Text style={{color: '#A7AFBC'}}>Thêm đơn</Text>
            </TouchableOpacity>
          </View>
        )} */}
      </View>
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#fb8c00"
            style={{flex: 1, justifyContent: 'center'}}
          />
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={listPresciption}
              renderItem={item => <_renderDrug item={item.item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingBottom: 60, marginTop: 5}}
              showsVerticalScrollIndicator={false}
              onEndReached={() => console.log('End')}
              onEndReachedThreshold={0.3}
              ListFooterComponent={
                footerLoad ? <ActivityIndicator /> : <View />
              }
              ListEmptyComponent={() => (
                <Text style={{textAlign: 'center', color: '#A7AFBC', marginTop: 10}}>Không có kết quả</Text>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default PrescriptionListScreen;
