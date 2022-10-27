/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text} from 'react-native';
import { Colors } from '../themes';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
import DeviceInfo from 'react-native-device-info';
let isTablet = DeviceInfo.isTablet();

import { MAIN_HomeScreen, ArticleListScreen } from '../screens/main';
import CompanyListScreen from '../screens/company';
import { DrugSearchScreen } from '../screens/drug';
import FavoriteDrugScreen from '../screens/favorite';
import MyDrugListScreen from '../screens/medicalbox/MyDrugListScreen';


const AppBottomTab = () => {
  return (
    <Tab.Navigator
      headerMode={'none'}
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarShowLabel: true,
        tabBarActiveBackgroundColor: '#FFF',
        tabBarInactiveBackgroundColor: '#FFF',
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#757E83',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '400',
        },
        tabBarStyle: {paddingHorizontal: isTablet ? 100 : 0, backgroundColor: '#FFFFFF'},
      }}
      backBehavior={'initialRoute'}>
      <Tab.Screen
        headerMode={'none'}
        name="HomeScreen"
        component={MAIN_HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({focused, tintColor, size}) => (
            <View>
              <Icon
                name="home"
                size={isTablet ? 24 : 22}
                color={focused ? Colors.primary : '#757E83'}
                solid={focused ? true : false}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CompanyListScreen"
        component={CompanyListScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Doanh nghiệp',
          tabBarBadge: null,
          tabBarIcon: ({focused, tintColor, size}) => (
            <View>
              <Icon
                name="briefcase-medical"
                size={isTablet ? 24 : 22}
                color={focused ? Colors.primary : '#757E83'}
                solid={focused ? true : false}
              />
            </View>
          ),
        }}
      />
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
              color={focused ? Colors.primary : '#757E83'}
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
              color={focused ? Colors.primary : '#757E83'}
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
              color={focused ? Colors.primary : '#757E83'}
              solid={focused ? true : false}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppBottomTab;
