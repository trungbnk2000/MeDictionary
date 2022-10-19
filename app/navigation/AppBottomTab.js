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
        name="ArticleListScreen"
        component={ArticleListScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Bài viết',
          tabBarBadge: null,
          tabBarIcon: ({focused, tintColor, size}) => (
            <View>
              <Icon
                name="newspaper"
                size={isTablet ? 24 : 22}
                color={focused ? Colors.primary : '#757E83'}
                solid={focused ? true : false}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="NhacNhoScreen"
        component={MAIN_HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Tư vấn',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon
              name="comment-medical"
              size={isTablet ? 24 : 22}
              color={focused ? Colors.primary : '#757E83'}
              solid={focused ? true : false}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SettingScreen"
        component={MAIN_HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Thông báo',
          tabBarIcon: ({focused, tintColor, size}) => (
            <Icon
              name="bell"
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
