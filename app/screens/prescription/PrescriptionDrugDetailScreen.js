import React from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  Animated,
  Linking,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import {useState} from 'react';
import * as actions from '../../redux/global/Actions';
import {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {useNavigation, useRoute} from '@react-navigation/native';
import { useSelector, useDispatch} from 'react-redux';
import TDTextInputNew from '../../components/TDTextInputNew';
import { showMessage } from 'react-native-flash-message';

const MainScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [drugData, setDrugData] = useState({});
  const [perDay, setPerDay] = useState(0);
  const [unit, setUnit] = useState('');
  const [check, setCheck] = useState(false);
  const prescriptionList = useSelector(state => state.global.prescription);

  const addDrug = () => {
    var prescriptionIndex = -1;
    prescriptionList.map((item, index) => {
      if(item.id === route.params.prescription.id){
        prescriptionIndex = index;
      }
    })
    var payload = {
      drug: {...route.params.drug, perDay: perDay, unit: unit},
      index: prescriptionIndex,
    }
    dispatch(actions.addDrugPrescription(payload));
    showMessage({
      message: 'Thành công',
      description: 'Thêm thành công vào đơn thuốc!',
      type: 'success',
    });
    dispatch(actions.setRandom());
    var _prescription = {};
    prescriptionList.map((item, index) => {
      if(item.id === route.params.prescription.id){
        _prescription = item;
      }
    });
    navigation.navigate('PrescriptionDetailScreen', {data: _prescription});
  }

  const deleteDrug = () => {
    var drugIndex = route.params.drugEdit.drugIndex;
    var prescriptionId = route.params.drugEdit.prescription.id;
    var _drugList = [];
    route.params.drugEdit.prescription.drugList.map((item, index) => {
      if(index === drugIndex){
      }
      else{
        _drugList.push(item);
      }
    })
    prescriptionList.map((item, index) => {
      if(item.id === prescriptionId){
        item.drugList = _drugList;
      }
    })
    showMessage({
      message: 'Thành công',
      description: 'Xoá thành công khỏi đơn thuốc!',
      type: 'success',
    });
    dispatch(actions.setRandom());
    navigation.goBack();
  }

  const updateDrug = () => {
    var prescriptionIndex = -1;
    prescriptionList.map((item, index) => {
      if(item.id === route.params.drugEdit.prescription.id){
        prescriptionIndex = index;
      }
    })
    var payload = {
      drug: {...route.params.drugEdit.prescription.drugList[route.params.drugEdit.drugIndex], perDay: perDay, unit: unit},
      index: prescriptionIndex,
    }
    dispatch(actions.updateDrugPrescription(payload));
    showMessage({
      message: 'Thành công',
      description: 'Thêm thành công vào đơn thuốc!',
      type: 'success',
    });
    dispatch(actions.setRandom());
    var _prescription = {};
    prescriptionList.map((item, index) => {
      if(item.id === route.params.drugEdit.prescription.id){
        _prescription = item;
      }
    });
    navigation.navigate('PrescriptionDetailScreen', {data: _prescription});
  }

  useEffect(() => {
    if(route.params.prescription && route.params.drug){
        setDrugData(route.params.drug);
        route.params.prescription.drugList.map((item, index) => {
          if(item.id === route.params.drug.id){
            setCheck(true);
          }
        })
    }
    else if(route.params.drugEdit){
        var drugIndex = route.params.drugEdit.drugIndex;
        var prescriptionId = route.params.drugEdit.prescription.id;
        prescriptionList.map((item, index) => {
          if(item.id === prescriptionId){
            setDrugData(item.drugList[drugIndex]);
            setPerDay(item.drugList[drugIndex]?.perDay);
            setUnit(item.drugList[drugIndex]?.unit); 
          }
        })
    }
  }, [prescriptionList]);

  return (
    <View style={{flex: 1, backgroundColor: '#F4F5F9'}}>
      <View
        style={{
          flexDirection: 'column',
          padding: 25,
          backgroundColor: '#1479FF',
          height: '30%',
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
            Thông tin thuốc
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <FontAwesome name="file-pdf" size={25} light color={'#fff'} />
          </TouchableOpacity>
        </View>
        <View style={{height: 500}}>
          <View
            style={{
              height: '35%',
              marginTop: 25,
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 5,
              ...Platform.select({
                android: {elevation: 3},
                ios: {
                  shadowColor: '#a8bed2',
                  shadowOpacity: 1,
                  shadowRadius: 6,
                  shadowOffset: {
                    width: 2,
                    height: 2,
                  },
                },
              }),
            }}>
            <Image
              source={require('../../assets/images/medicine.png')}
              style={{borderRadius: 10, height: '100%', width: '100%'}}
              resizeMode="contain"
            />
          </View>
          <ScrollView
            style={{flex: 1, flexDirection: 'column', paddingTop: 10}}>
            <View>
              <Text
                style={{fontSize: 25, fontWeight: 'bold', color: '#36596A'}}>
                {'Tên thuốc: '}<Text style={{fontSize: 25, color: '#36596A'}}>
                {drugData?.tenThuoc ?? ''}
              </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC', fontWeight: 'bold'}}>
                {'Số đăng ký: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {drugData?.soDangKy ?? ''}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC', fontWeight: 'bold'}}>
                {'Dạng bào chế: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {drugData?.baoChe ?? ''}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC', fontWeight: 'bold'}}>
                {'Đóng gói: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {drugData?.dongGoi ?? ''}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC', fontWeight: 'bold'}}>
                {'Hạn SD: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {drugData?.tuoiTho ?? ''}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC', fontWeight: 'bold'}}>
                {'Nước sản xuất: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {drugData?.nuocSx ?? ''}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC', fontWeight: 'bold'}}>
                {'Nước đăng ký: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {drugData?.nuocDk ?? ''}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <KeyboardAvoidingView style={styles.optionBar}>
        <View style={{paddingHorizontal: 20, paddingTop: 20}}>
          <Text style={{color: '#36596A', fontWeight: 'bold', fontSize: 18}}>
            Liều lượng
          </Text>
        </View>
        <View style={{flex: 3, paddingHorizontal: 20}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: '#A7AFBC', fontSize: 18}}>Số lần/ngày</Text>
            </View>
            <View style={{flex: 2}}>
              <TDTextInputNew
                placeholder={'Số lần trên ngày'}
                value={perDay}
                onChangeText={setPerDay}
                keyboardType="numeric"
              />
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: '#A7AFBC', fontSize: 18}}>Đơn vị</Text>
            </View>
            <View style={{flex: 2}}>
              <TDTextInputNew
                placeholder={'Đơn vị'}
                value={unit}
                onChangeText={setUnit}
              />
            </View>
          </View>
        </View>
        <View style={{flex: 3}}></View>
      </KeyboardAvoidingView>
      {route.params.drugEdit ? (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              updateDrug();
            }}
            style={{
              flex: 1,
              backgroundColor: '#F4F5F9',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 35,
            }}>
            <Text style={{color: '#36596A', fontWeight: 'bold', fontSize: 16}}>
              Cập nhật
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              deleteDrug();
            }}
            style={{
              flex: 1,
              backgroundColor: '#2EC28B',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 35,
            }}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 16}}>
              Xoá khỏi đơn
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              if (!perDay || !unit) {
                showMessage({
                  message: 'Không thành công',
                  description: 'Vui lòng điền đầy đủ thông tin thuốc!',
                  type: 'warning',
                });
              } else if (check) {
                showMessage({
                  message: 'Không thành công',
                  description: 'Thuốc đã tồn tại trong đơn!',
                  type: 'danger',
                });
              } else {
                addDrug();
              }
            }}
            style={{
              flex: 1,
              backgroundColor: '#2EC28B',
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 35,
              borderTopLeftRadius: 35,
            }}>
            <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 18}}>
              Thêm vào đơn
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: '10%',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  optionBar: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '30%',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
});
