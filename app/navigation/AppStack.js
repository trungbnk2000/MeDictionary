import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Vibration, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { MAIN_HomeScreen,ArticleDetailScreen, CategoryScreen, ProductListScreen,ArticleListScreen, DetailProductScreen } from '../screens/main';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppBottomTab from './AppBottomTab';

const Stack = createNativeStackNavigator();

const App_ = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <Stack.Navigator
            initialRouteName="MAIN_HomeScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MAIN_HomeScreen" component={AppBottomTab} />
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
            <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
            <Stack.Screen name="DetailProductScreen" component={DetailProductScreen} />
            <Stack.Screen name="ArticleListScreen" component={ArticleListScreen} />
            <Stack.Screen name="ArticleDetailScreen" component={ArticleDetailScreen} />
        </Stack.Navigator>
    );
};

export default App_;
