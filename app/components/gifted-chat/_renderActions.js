/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

import {Actions} from 'react-native-gifted-chat';

const _renderActions = props => {
  return (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => <Icon name={'plus'} size={20} color="#2196f3" />}
      options={{
        'Lựa chọn ảnh': () => {
          props.selectOneImage();
        },
        'Lựa chọn tệp tin': () => {
          props.selectOneFile();
        },
        Hủy: () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
    />
  );
};

export default _renderActions;

const styles = StyleSheet.create({});
