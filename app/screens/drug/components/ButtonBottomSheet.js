
import { useEffect, useRef, useState } from "react";
import { Dimensions, Text, View, StyleSheet, Platform, Animated, PanResponder, TouchableOpacity, ActivityIndicator, TextInput } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import { Overlay } from "react-native-elements";
import * as actions from '../../../redux/global/Actions';
import { useSelector, useDispatch} from 'react-redux';
import { showMessage } from "react-native-flash-message";
import { useNavigation } from "@react-navigation/native";

const {width, height} = Dimensions.get('window');

const ButtonBottomSheet = (props) => {
    const {item} = props;
    const [visible, setVisible] = useState(false);
    const [amount, setAmount] = useState(0);
    const [unit, setUnit] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const medicalBox = useSelector(state => state.global.medicalBox);
    const bookmarks = useSelector(state => state.global.bookmarks);

    const toggleOverlay = () => {
        setVisible(!visible);
    }

    const handleAddFavorite = (item) => {
        var check = bookmarks?.findIndex(i => i.id == item?.id);
        if(check === -1){
            dispatch(actions.addBookmarkItem(item));
            showMessage({
                message: 'Thành công',
                description: 'Thêm thành công vào danh sách!',
                type: 'success',
            });
        }
        else{
            showMessage({
                message: 'Không thành công',
                description: 'Thuốc đã có trong danh sách yêu thích!',
                type: 'danger',
            });
        }
    }

    const handleAddMedicalBox = (item) => {
        if(unit==='' || amount===0){
            showMessage({
                message: 'Không thành công',
                description: 'Vui lòng điền đầy đủ số lượng trước khi thêm!',
                type: 'warning',
            });
        }
        else{
            var check = medicalBox?.findIndex(i => i.id == item?.id);
            if(check === -1){
                var medicalBoxItem = {...item, amount: amount, unit: unit }
                //console.log(medicalBoxItem);
                dispatch(actions.addMedicalBoxItem(medicalBoxItem));
                showMessage({
                    message: 'Thành công',
                    description: 'Thêm thành công vào danh sách!',
                    type: 'success',
                });
                setVisible(false);
            }
            else{
                setVisible(false);
                showMessage({
                    message: 'Không thành công',
                    description: 'Thuốc đã được thêm từ trước, vui lòng chọn thuốc khác!',
                    type: 'danger',
                });
            }
        }
    }

    return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    handleAddFavorite(item);
                    navigation.goBack();
                }} style={{flex: 1, backgroundColor: '#FFFFFF', borderTopLeftRadius: 32, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#36596A', fontWeight: 'bold', fontSize: 16}}>
                        Thêm vào yêu thích
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    setVisible(true);
                }} style={{flex: 1, backgroundColor: '#2EC28B', borderTopEndRadius: 32, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 16}}>
                        Thêm vào tủ thuốc
                    </Text>
                </TouchableOpacity>
                <Overlay overlayStyle={{height: '60%', width: '80%', borderRadius: 10, backgroundColor: '#F4F5F9', alignItems: 'center', padding: 20}} isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={{flexDirection: 'row', flex: 1, width: '100%', padding: 10}}>
                        <View style={{flex: 1}}>
                            <Text style={{color: '#36596A', fontSize: 16}}>Số lượng</Text>
                            <View style={{flexDirection: 'row',marginTop: 10, backgroundColor: '#E7F2FF', height: '50%', width: '100%', alignItems: 'center', justifyContent: 'space-evenly'}}>
                                <TouchableOpacity onPress={() => {
                                    if(amount > 0){
                                        setAmount(amount - 1);
                                    }
                                }}>
                                    <FontAwesome name="minus" size={15} color='#1479FF' />
                                </TouchableOpacity>
                                <View style={{height: '60%', width: 2, backgroundColor: '#fff'}} />
                                <Text style={{color: '#36596A', fontSize: 16}}>{amount}</Text>
                                <View style={{height: '60%', width: 2, backgroundColor: '#fff'}} />
                                <TouchableOpacity onPress={() => setAmount(amount + 1)}>
                                    <FontAwesome name="plus" size={15} color='#1479FF' />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{flex: 1}}>
                            <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                                <Text style={{color: '#36596A', fontSize: 16}}>Đơn vị</Text>
                            </View>
                            <View style={{backgroundColor: '#fff', marginTop: 10, height: '50%', width: '100%', borderRadius: 10, padding: 5, borderRadius: 10, borderColor: '#EBEBEB', borderWidth: 1.5}}>
                                <TextInput value={unit} onChangeText={(value) => {
                                    setUnit(value);
                                }} textAlign="right" style={{flex: 1}} />
                            </View>
                        </View>
                    </View>
                    <View style={{width: '100%', backgroundColor: '#fff', flex: 1, borderRadius: 10, borderColor: '#EBEBEB', borderWidth: 1.5, justifyContent: 'space-evenly', paddingStart: 10}}>
                        <Text style={{color: '#ABAEBE'}}>
                            Mã thuốc
                        </Text>
                        <Text style={{color: '#36596A', fontSize: 16, fontWeight: 'bold'}}>
                            {item.soDangKy}
                        </Text>
                    </View>
                    <View style={{width: '100%', backgroundColor: '#fff', flex: 1, borderRadius: 10, borderColor: '#EBEBEB', borderWidth: 1.5, justifyContent: 'space-evenly', paddingStart: 10, marginTop: 20}}>
                        <Text style={{color: '#ABAEBE'}}>
                            Tên thuốc
                        </Text>
                        <Text style={{color: '#36596A', fontSize: 16, fontWeight: 'bold'}}>
                            {item.tenThuoc}
                        </Text>
                    </View>
                    <View style={{width: '100%', backgroundColor: '#fff', flex: 1, borderRadius: 10, borderColor: '#EBEBEB', borderWidth: 1.5, justifyContent: 'space-evenly', paddingStart: 10, marginTop: 20}}>
                        <Text style={{color: '#ABAEBE'}}>
                            Công ty Sản Xuất
                        </Text>
                        <Text style={{color: '#36596A', fontSize: 16, fontWeight: 'bold'}}>
                            {item.congTySx}
                        </Text>
                    </View>
                    <View style={{width: '100%', backgroundColor: '#fff', flex: 1, borderRadius: 10, borderColor: '#EBEBEB', borderWidth: 1.5, justifyContent: 'space-evenly', paddingStart: 10, marginTop: 20}}>
                        <Text style={{color: '#ABAEBE'}}>
                            Nước Sản Xuất
                        </Text>
                        <Text style={{color: '#36596A', fontSize: 16, fontWeight: 'bold'}}>
                            {item.nuocSx}
                        </Text>
                    </View>
                    <View style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => {
                            handleAddMedicalBox(item);
                            navigation.goBack();
                        }} style={{width: '75%', height: '75%', backgroundColor: '#DEE9FA', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#fb8c00" style={{flex: 1, justifyContent: 'center'}} />
                        ) : (
                            <Text style={{color: '#1479FF', fontWeight: '600'}}>
                                Thêm thuốc
                            </Text>
                        )}
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </View>
    )
}

export default ButtonBottomSheet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',  
        width: '100%',
        height: '10%',
        bottom: 0,
        
        backgroundColor: '#fff',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        flexDirection: 'row'
    }
})
