import { View, Text, Image, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const Carousel = () => {
    const navigation = useNavigation();

    return (
        <ScrollView scrollEnabled={false} horizontal style={{flex: 1, padding: 20, backgroundColor: '#1479FF', marginHorizontal: 20, borderRadius: 10}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 18, color: '#FFF', fontWeight: 'bold'}}>TỦ THUỐC CÁ NHÂN</Text>
                            <Text style={{color: '#FFF', paddingTop: 15}}>Quản lý tủ thuốc của bạn.</Text>
                            <Button
                                title="Danh sách"
                                buttonStyle={{borderRadius: 5, backgroundColor: '#2EC28B', width: 120, marginTop: 20, marginLeft: 5}}
                                titleStyle={{fontSize: 14}}
                                onPress={() => {
                                    navigation.navigate('DrugSearchScreen');
                                }}
                            />
                        </View>
                        <View style={{position: 'absolute', justifyContent:'center', alignItems: 'center', backgroundColor: 'white', height: 190, width: 190, borderRadius: 100, right: -190, top: -35}}>
                            <Image source={require('../../../assets/images/family.png')} />
                        </View>
                    </View>
                </ScrollView>
    )
}

export default Carousel;