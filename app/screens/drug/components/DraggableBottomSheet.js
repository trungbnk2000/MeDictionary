import { useEffect, useRef, useState } from "react";
import { Dimensions, Text, View, StyleSheet, Platform, Animated, PanResponder, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';

const {width, height} = Dimensions.get('window');

const MAX = height * 0.85;
const MIN = height * 0.3;

const MAX_UPWARD = MIN - MAX;
const MAX_DOWNWARD = 0;
const DRAG_THRESHOLD = 70;

const DraggableBottomSheet = (props) => {
    const {item} = props;
    const animatedValue = useRef(new Animated.Value(0)).current;
    const lastGestureDy = useRef(0);
    const [changeTab, setChangeTab] = useState(false);

    useEffect(()=>{
        console.log(item);
    },[])

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                animatedValue.setOffset(lastGestureDy.current);
            },
            onPanResponderMove: (e, gesture) => {
                animatedValue.setValue(gesture.dy);
            },
            onPanResponderRelease: (e, gesture) => {
                animatedValue.flattenOffset();
                //Kéo xuống
                if(gesture.dy > 0){
                    if(gesture.dy <= DRAG_THRESHOLD){
                        springAnimation('up');
                    }
                    else{
                        springAnimation('down');
                    }
                }
                else{
                    if(gesture.dy >= -DRAG_THRESHOLD){
                        springAnimation('down');
                    }
                    else{
                        springAnimation('up');
                    }
                }
            },
        })
    ).current;

    const springAnimation = (direction) => {
        lastGestureDy.current = direction === 'down' ? MAX_DOWNWARD : MAX_UPWARD;
        Animated.spring(animatedValue, {
            toValue: lastGestureDy.current,
            useNativeDriver: true,
        }).start();
    }

    const bottomSheetAnimation = {
        transform : [{translateY: animatedValue.interpolate({
            inputRange: [MAX_UPWARD, MAX_DOWNWARD],
            outputRange: [MAX_UPWARD, MAX_DOWNWARD],
            extrapolate: 'clamp',
        })}],
    }

    return (
        <View style={{flex: 1}}>
            <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
                <View style={styles.dragArea} {...panResponder.panHandlers}>
                </View>
                <View style={{flexDirection: 'row', padding: 10}}>
                    <TouchableOpacity onPress={() => {
                        if(changeTab){
                            setChangeTab(!changeTab);
                        }
                    }} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold' ,color: changeTab ? '#A7AFBC' : '#1479FF'}}>
                            Thông tin
                        </Text>
                        <View style={{backgroundColor: changeTab ? '#F4F5F7' : '#1479FF', width: '100%', height: 2, marginVertical: 15, borderRadius: 20}}></View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        if(!changeTab){
                            setChangeTab(!changeTab);
                        }
                    }} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 18, fontWeight: changeTab ? 'bold' : 'normal' ,color: changeTab ? '#1479FF' : '#A7AFBC'}}>
                            Giá
                        </Text>
                        <View style={{backgroundColor: changeTab ? '#1479FF' : '#F4F5F7', width: '100%', height: 2, marginVertical: 15, borderRadius: 20}}></View>
                    </TouchableOpacity>
                </View>
                <ScrollView style={{flex : 1, paddingHorizontal: 20}}>
                    {
                        !changeTab ? (
                            <View>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Text style={{color: '#36596A', fontSize: 16, fontWeight: 'bold'}}>Dạng bào chế: </Text>
                                    <Text style={{color: '#A7AFBC', fontSize: 16}}>{item.baoChe}</Text>
                                </View>
                                <View style={{flexDirection: 'column', marginTop: 10}}>
                                    <Text style={{color: '#36596A', fontSize: 16, fontWeight: 'bold'}}>Quy cách đóng gói: </Text>
                                    {item.dongGoi.split('; ')?.map((item, index)=>(
                                        <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingStart: 10}}>
                                            <FontAwesome name="capsules" size={15} color='#2EC28B' />
                                            <Text key={index} style={{color: '#A7AFBC', fontSize: 16, paddingLeft: 10}}>{item}</Text> 
                                        </View>
                                    ))}
                                </View>
                                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
                                    <Text style={{color: '#36596A', fontSize: 16, fontWeight: 'bold'}}>Hạn sử dụng: </Text>
                                    <Text style={{color: '#A7AFBC', fontSize: 16}}>{item.tuoiTho}</Text>
                                </View>
                                <View style={{flexDirection: 'column', marginTop: 10}}>
                                    <Text style={{color: '#36596A', fontSize: 16, fontWeight: 'bold'}}>Công ty Sản Xuất: </Text>
                                    <Text style={{color: '#533f03', fontSize: 16, paddingTop: 10}}>{item.congTySx}</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
                                        <FontAwesome name="location" size={15}/>
                                        <Text style={{color: '#A7AFBC', fontSize: 16, fontStyle: 'italic', paddingLeft: 10}}>{item.diaChiSx}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'column', marginTop: 10}}>
                                    <Text style={{color: '#36596A', fontSize: 16, fontWeight: 'bold'}}>Công ty Đăng Ký: </Text>
                                    <Text style={{color: '#533f03', fontSize: 16, paddingTop: 10}}>{item.congTyDk}</Text>
                                    <View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10}}>
                                        <FontAwesome name="location" size={15}/>
                                        <Text style={{color: '#A7AFBC', fontSize: 16, fontStyle: 'italic', paddingLeft: 10}}>{item.diaChiDk}</Text>
                                    </View>
                                </View>
                                
                            </View>
                        ) : (
                            <Text>Giá</Text>
                        )
                    }
                </ScrollView>
            </Animated.View>
        </View>
    )
}
export default DraggableBottomSheet;

const styles = StyleSheet.create({
    bottomSheet : {
        position: 'absolute',  
        width: '100%',
        height: MAX,
        bottom: MIN - MAX,
        ...Platform.select({
            android: {elevation: 3},
            ios: {
                shadowColor: '#a8bed2',
                shadowOpacity: 1,
                shadowRadius: 6,
                shadowOffset: {
                    width: 2,
                    height: 2,
                }
            }
        }),
        backgroundColor: '#FFF',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
    },

    dragHandle: {
        width: 100,
        height: 6,
        backgroundColor: '#d3d3d3',
        borderRadius: 10
    },

    dragArea: {
        width: '100%',
        height: 32,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    }
})