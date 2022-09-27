import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Vibration, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { MAIN_HomeScreen } from '../screens/main';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const App_ = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <Stack.Navigator
            initialRouteName="MAIN_HomeScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MAIN_HomeScreen" component={MAIN_HomeScreen} />
        </Stack.Navigator>
    );
};

export default App_;
