/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import { Colors } from '../themes';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet();

import { DrugSearchScreen } from '../screens/drug';
import FavoriteDrugScreen from '../screens/favorite';
import MyDrugListScreen from '../screens/medicalbox/MyDrugListScreen';
import ChatScreen from '../screens/openAi';
import {PrescriptionListScreen} from '../screens/prescription';


const AppBottomTab = () => {
  return (
    <Tab.Navigator
      headerMode={'none'}
      initialRouteName="DrugSearchScreen"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: '#FFF',
        tabBarInactiveBackgroundColor: '#FFF',
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#ABAEBE',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '400',
        },
        tabBarStyle: {paddingHorizontal: isTablet ? 100 : 0, backgroundColor: '#FFFFFF', ...Platform.select({
          android: {elevation: 3},
          ios: {
            shadowColor: '#a8bed2',
            shadowOpacity: 1,
            shadowRadius: 3,
            shadowOffset: {
              width: 1,
              height: 1,
            },
          },
        })},
      }}
      backBehavior={'initialRoute'}>
      <Tab.Screen
        name="DrugSearchScreen"
        component={DrugSearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Thuốc',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon
              name="capsules"
              size={isTablet ? 24 : 22}
              color={focused ? Colors.primary : '#ABAEBE'}
              solid={focused ? true : false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyDrugListScreen"
        component={MyDrugListScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Tủ thuốc',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon
              name="star-of-life"
              size={isTablet ? 24 : 22}
              color={focused ? Colors.primary : '#ABAEBE'}
              solid={focused ? true : false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="PrescriptionListScreen"
        component={PrescriptionListScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Đơn thuốc',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon
              name="prescription-bottle"
              size={isTablet ? 24 : 22}
              color={focused ? Colors.primary : '#ABAEBE'}
              solid={focused ? true : false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavoriteDrugScreen"
        component={FavoriteDrugScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Yêu thích',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon
              name="heart"
              size={isTablet ? 24 : 22}
              color={focused ? Colors.primary : '#ABAEBE'}
              solid={focused ? true : false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Chatbot',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon
              name="robot"
              size={isTablet ? 24 : 22}
              color={focused ? Colors.primary : '#ABAEBE'}
              solid={focused ? true : false}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTab;
