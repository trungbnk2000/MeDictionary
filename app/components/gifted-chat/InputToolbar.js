/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import {InputToolbar, Actions, Composer, Send, Bubble} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: '#222B45',
      paddingTop: 6,
    }}
    primaryStyle={{alignItems: 'center'}}
  />
);

export const _renderLoading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="#2196f3" />
    </View>
  );
};

export const _renderBubble = (props) => {
  return (
    <View>
      {/* <Text style={{color: '#6c757d', fontSize: 13, marginBottom: 3, textAlign: 'right'}}>{props.currentMessage.user.name}</Text> */}
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#2196f3',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    </View>
  );
};

export const _renderSend = (props) => {
  return (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <Icon name={'paper-plane'} size={20} color="#2196f3" />
      </View>
    </Send>
  );
};

export const _scrollToBottomComponent = (props) => {
  return (
    <View style={styles.bottomComponentContainer}>
      <Icon name={'chevron-down'} size={20} color="#2196f3" />
    </View>
  );
};

const styles = StyleSheet.create({
  sendingContainer: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  actionContainer: {justifyContent: 'center', alignItems: 'center', marginStart: 10, marginBottom: 15},
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
