import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, Vibration, Alert } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { showMessage } from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import { MAIN_HomeScreen,ArticleDetailScreen, CategoryScreen, ProductListScreen,ArticleListScreen, DetailProductScreen } from '../screens/main';
import { DrugSearchScreen, DrugDetailScreen } from '../screens/drug';
import FavoriteDrugScreen from '../screens/favorite';
import MyDrugListScreen from '../screens/medicalbox/MyDrugListScreen';
import {PrescriptionListScreen, PrescriptionAddScreen, PrescriptionDetailScreen, PrescriptionDrugDetailScreen} from '../screens/prescription';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppBottomTab from './AppBottomTab';

const Stack = createNativeStackNavigator();

const App_ = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    return (
        <Stack.Navigator
            initialRouteName="DrugSearchScreen"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DrugSearchScreen" component={AppBottomTab} />
            <Stack.Screen name="ProductListScreen" component={ProductListScreen} />

            <Stack.Screen name="DrugDetailScreen" component={DrugDetailScreen} />
            <Stack.Screen name="FavoriteDrugScreen" component={FavoriteDrugScreen} />
            <Stack.Screen name="MyDrugListScreen" component={MyDrugListScreen} />

            <Stack.Screen name="PrescriptionListScreen" component={PrescriptionListScreen} />
            <Stack.Screen name="PrescriptionAddScreen" component={PrescriptionAddScreen} />
            <Stack.Screen name="PrescriptionDetailScreen" component={PrescriptionDetailScreen} />
            <Stack.Screen name="PrescriptionDrugDetailScreen" component={PrescriptionDrugDetailScreen} />
        </Stack.Navigator>
    );
};

export default App_;
