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
  Dimensions,
} from 'react-native';
import TDTextInputNew from '../../components/TDTextInputNew';
import {useState} from 'react';
import {Button, Divider} from 'react-native-elements';
import {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {useNavigation, useRoute} from '@react-navigation/native';
import {DraggableBottomSheet, ButtonBottomSheet} from './components';

const DrugDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data} = route.params;
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollY = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    console.log(data.hoatChat);
  }, []);

  const handlePress = () => {
    let fileUrl = data.fileName ?? '';
    if (Platform.OS === 'ios' && fileUrl != '') {
      Linking.openURL(fileUrl).catch(err =>
        console.error('An error occurred', err),
      );
    } else {
      Linking.openURL(fileUrl).catch(err =>
        console.error('An error occurred', err),
      );
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F4F5F9'}}>
      <View
        style={{
          flexDirection: 'column',
          padding: 25,
          backgroundColor: '#1479FF',
          height: '25%',
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
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
            Th??ng tin thu???c
          </Text>
          {data.fileName ? (
            <TouchableOpacity onPress={() => handlePress()}>
              <FontAwesome name="file-pdf" size={25} light color={'#fff'} />
            </TouchableOpacity>
          ) : (
            <Image
              source={require('../../assets/images/doctor_profile.jpeg')}
              style={{height: 42, width: 42, borderRadius: 42}}
            />
          )}
        </View>
        <View style={{height: Dimensions.get('window').width * 2 - Dimensions.get('window').height * 0.1}}>
          <View
            style={{
              height: '30%',
              marginTop: 25,
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 5,
              ...Platform.select({
                android: {elevation: 3},
                ios: {
                  shadowColor: '#a8bed2',
                  shadowOpacity: 0.7,
                  shadowRadius: 3,
                  shadowOffset: {
                    width: 1,
                    height: 1,
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
            showsVerticalScrollIndicator={false}
            style={{flex: 1, flexDirection: 'column', paddingTop: 10}}>
            <View>
              <Text
                style={{fontSize: 25, fontWeight: 'bold', color: '#36596A'}}>
                {'T??n thu???c: '}
                <Text style={{fontSize: 25, color: '#36596A'}}>
                  {data?.tenThuoc ?? ''}
                </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 18,
                  color: '#A7AFBC',
                  fontWeight: 'bold',
                }}>
                {'S??? ????ng k??: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {data?.soDangKy ?? ''}
              </Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 18,
                  color: '#A7AFBC',
                  fontWeight: 'bold',
                }}>
                {'D???ng b??o ch???: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {data?.baoChe ?? ''}
              </Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 4, alignItems: 'flex-start'}}>
                <Text
                  style={{
                    paddingTop: 10,
                    fontSize: 18,
                    color: '#A7AFBC',
                    fontWeight: 'bold',
                  }}>
                  Ho???t ch???t
                </Text>
                {data.hoatChat?.split('; ')?.map((item, index) => (
                  <Text
                    key={index}
                    style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                    {item}
                  </Text>
                ))}
              </View>
              {data.nongDo ? (
                <View style={{flex: 2, alignItems: 'flex-end'}}>
                  <Text
                    style={{
                      paddingTop: 10,
                      fontSize: 18,
                      color: '#A7AFBC',
                      fontWeight: 'bold',
                    }}>
                    N???ng ?????
                  </Text>
                  {data.nongDo?.split(';')?.map((item, index) => (
                    <Text
                      key={index}
                      style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                      {item}
                    </Text>
                  ))}
                </View>
              ) : (
                <></>
              )}
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 18,
                  color: '#A7AFBC',
                  fontWeight: 'bold',
                }}>
                {'Quy c??ch ????ng g??i: '}
              </Text>
              {data.dongGoi.split('; ')?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10,
                    paddingStart: 10,
                  }}>
                  <FontAwesome name="capsules" size={15} color="#2EC28B" />
                  <Text
                    key={index}
                    style={{color: '#A7AFBC', fontSize: 18, paddingLeft: 10}}>
                    {item}
                  </Text>
                </View>
              ))}
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 18,
                  color: '#A7AFBC',
                  fontWeight: 'bold',
                }}>
                {'H???n s??? d???ng: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {data?.tuoiTho ?? ''}
              </Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 18,
                  color: '#A7AFBC',
                  fontWeight: 'bold',
                }}>
                {'C??ng ty s???n xu???t: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {data?.congTySx ?? ''}
              </Text>
            </View>
            <View style={{flexDirection: 'column'}}>
              <Text
                style={{
                  paddingTop: 10,
                  fontSize: 18,
                  color: '#A7AFBC',
                  fontWeight: 'bold',
                }}>
                {'C??ng ty ????ng k??: '}
              </Text>
              <Text style={{paddingTop: 10, fontSize: 18, color: '#A7AFBC'}}>
                {data?.congTyDk ?? ''}
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <ButtonBottomSheet item={data} />
    </View>
  );
};

export default DrugDetailScreen;
