/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Image, StatusBar, StyleSheet, Dimensions, Text, Vibration, Alert, AppState } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NetInfo from '@react-native-community/netinfo';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { Host, Portal } from 'react-native-portalize';
import AppStack from './AppStack';

const Stack = createNativeStackNavigator();

const RootContainerScreen = () => {
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <Host>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="AppStack"
            component={AppStack}
          />
        </Stack.Navigator>
      </Host>
    </NavigationContainer>
  );
};

export default RootContainerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
