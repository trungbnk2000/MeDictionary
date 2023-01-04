import React, {useCallback, useMemo, useRef} from 'react';
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
  Button,
  Pressable,
} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import {Overlay} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {Swipeable} from 'react-native-gesture-handler';
import * as actions from '../../redux/global/Actions';

const MARGIN_ITEM_HORIZONTAL = 20;
const MARGIN_ITEM_TOP = 25;
const BORDER_RADIUS = 10;

const AmountComp = ({value, forceChangeAmount, isClose, setIsClose}) => {
  const [amount, setAmount] = useState(value);
  // console.log(isClose);
  useEffect(() => {
    if (isClose && value !== amount) {
      forceChangeAmount(amount);
      setIsClose();
    }
  }, [isClose]);
  return (
    <View
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        width: 70,
        marginRight: MARGIN_ITEM_HORIZONTAL,
        height: height / 4 - MARGIN_ITEM_HORIZONTAL * 2,
        marginTop: MARGIN_ITEM_TOP,
        borderRadius: BORDER_RADIUS,
        overflow: 'hidden',
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: '#2EC28B',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setAmount(prevState => prevState + 1)}>
        <FontAwesome name="plus" size={22} />
      </TouchableOpacity>
      <View
        style={{
          borderRightColor: '#ccc',
          borderLeftColor: '#ccc',
          borderRightWidth: 1,
          borderLeftWidth: 1,
        }}>
        <TextInput
          style={{fontSize: 24, textAlign: 'center'}}
          value={`${amount}`}
          keyboardType="numeric"
          onChangeText={setAmount}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: 'red',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setAmount(prevState => prevState - 1)}>
        <FontAwesome name="minus" size={22} />
      </TouchableOpacity>
    </View>
  );
};

const MyDrugListScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [searchFilter, setSearchFilter] = useState('');
  const dispatch = useDispatch();
  const medicalBox = useSelector(state => state.global.medicalBox);
  const prescription = useSelector(state => state.global.prescription);
  const [footerLoad, setFooterLoad] = useState(false);
  const [listFavoriteDrug, setListFavoriteDrug] = useState([]);
  const isClose = useRef(false);
  let row = [];
  let prevOpenedRow;

  const renderRightActions = (progress, dragX, item, index) => {
    const forceChangeAmount = newAmount => {
      if (newAmount < 1) {
        Alert.alert(
          'Xác nhận xoá thuốc khỏi tủ thuốc của bạn!',
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
                setIsLoading(true);
                dispatch(actions.removeMedicalBoxIndex(index));
                setIsLoading(false);
              },
            },
          ],
        );
        return;
      }
      setListFavoriteDrug(prevState => {
        return prevState.map((prev, prevStateIdx) => {
          if (prevStateIdx === index) {
            prev.amount = newAmount;
          }
          return prev;
        });
      });
    };
    return (
      <AmountComp
        value={listFavoriteDrug[index].amount}
        forceChangeAmount={forceChangeAmount}
        isClose={isClose.current}
        setIsClose={() => (isClose.current = false)}
      />
    );
  };
  const _renderDrug = ({item, index}) => {
    const [isFavour, setIsFavour] = useState(false);
    const handleRemoveBookmark = index => {
      Alert.alert(
        'Xác nhận xoá thuốc khỏi tủ thuốc của bạn!',
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
              setIsLoading(true);
              dispatch(actions.removeMedicalBoxIndex(index));
              setIsLoading(false);
            },
          },
        ],
      );
    };
    const closeRow = index => {
      if (prevOpenedRow && prevOpenedRow !== row[index]) {
        prevOpenedRow.close();
      }
      isClose.current = true;
      prevOpenedRow = row[index];
    };

    var check = medicalBox?.findIndex(i => i.id == item?.id);

    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item, index)
        }
        rightOpenValue={-200}
        ref={ref => (row[index] = ref)}
        onSwipeableOpen={() => closeRow(index)}
        onSwipeableClose={() => (isClose.current = false)}
        onSwipeableWillClose={direction => {}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DrugDetailScreen', {data: item})}
          style={{
            backgroundColor: '#FFF',
            justifyContent: 'space-evenly',
            width: width - MARGIN_ITEM_HORIZONTAL * 2,
            height: height / 4 - MARGIN_ITEM_HORIZONTAL * 2,
            marginHorizontal: MARGIN_ITEM_HORIZONTAL,
            marginTop: MARGIN_ITEM_TOP,
            borderRadius: BORDER_RADIUS,
            padding: 10
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  handleRemoveBookmark(check);
                }}>
                <FontAwesome
                  solid={check > -1 ? true : false}
                  name="users-medical"
                  size={25}
                  color={'#2EC28B'}
                />
              </TouchableOpacity>
              <Text
                style={{
                  color: '#36596A',
                  fontSize: 18,
                  fontWeight: 'bold',
                  paddingLeft: 10,
                }}>
                {item.soDangKy}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#1479FF', fontSize: 16}}>Còn: </Text>
              <Text
                style={{fontWeight: 'bold', color: '#1479FF', fontSize: 16}}>
                {item.amount}
              </Text>
              <Text style={{color: '#1479FF', fontSize: 16}}> {item.unit}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="notes-medical" color={'#2EC28B'} size={15} />
            <Text
              style={{
                paddingLeft: 20,
                color: '#A7AFBC',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {item.tenThuoc}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="syringe" color={'#2EC28B'} size={15} />
            <Text style={{paddingLeft: 20, color: '#A7AFBC', fontSize: 16}}>
              {item.baoChe}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesome name="briefcase-medical" color={'#2EC28B'} size={15} />
            <Text style={{paddingLeft: 20, color: '#A7AFBC', fontSize: 16}}>
              {item.congTySxCode}
            </Text>
          </View>
        </TouchableOpacity>
      </Swipeable>
    );
  };

  useEffect(() => {
    var _medicalBox = [];
    if (searchFilter != '') {
      medicalBox.map((item, index) => {
        if (
          item.soDangKy.includes(searchFilter) ||
          item.tenThuoc.includes(searchFilter)
        ) {
          _medicalBox.push(item);
        }
      });
    } else {
      _medicalBox = medicalBox;
    }
    setListFavoriteDrug(_medicalBox ?? []);
  }, [medicalBox, searchFilter]);

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
            Tủ thuốc cá nhân
          </Text>
          <Image source={require('../../assets/images/doctor_profile.jpeg')} style={{height: 42, width: 42, borderRadius: 42}} />
        </View>
        <View
          style={{
            marginTop: 20,
            height: Platform.OS === 'ios' ? '35%' : '50%',
            backgroundColor: '#FFF',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderRadius: 10,
            paddingTop: 0,
          }}>
          <View
            style={{
              flex: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View style={{flex: 10, padding: 10}}>
              <TextInput
                value={searchFilter}
                onChangeText={value => setSearchFilter(value)}
                placeholder="Tìm kiếm thuốc"
                placeholderTextColor={'#ABAEBE'}
                style={{flex: 8, height: '100%', fontSize: 18}}
              />
            </View>
            <TouchableOpacity
              style={{flex: 3, alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome name="search" color={'#A7AFBC'} size={25} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.5, backgroundColor: '#1479FF'}}></View>
          <TouchableOpacity
            style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome name="barcode" size={25} />
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
          <View style={{flex: 1}}>
            <FlatList
              data={listFavoriteDrug}
              renderItem={({item, index}) => (
                <_renderDrug item={item} index={index} />
              )}
              keyExtractor={item => item.id}
              contentContainerStyle={{paddingBottom: 60}}
              showsVerticalScrollIndicator={false}
              onEndReached={() => console.log('End')}
              onEndReachedThreshold={0.3}
              ListFooterComponent={
                footerLoad ? <ActivityIndicator /> : <View />
              }
              ListEmptyComponent={() => (
                <Text
                  style={{textAlign: 'center', color: '#FFF', marginTop: 10}}>
                  Không có kết quả
                </Text>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default MyDrugListScreen;
