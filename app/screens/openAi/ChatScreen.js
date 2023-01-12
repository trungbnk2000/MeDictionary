import React, {useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Alert,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
import {useEffect} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5Pro';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';

const ChatScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [searchFilter, setSearchFilter] = useState('');
  const [answer, setAnswer] = useState('');
  const [messages, setMessages] = useState([
    {name: 'OpenAI', message: 'Xin chào, tôi có thể giúp gì bạn?'},
  ]);
  const [replying, setReplying] = useState(false);
  const dispatch = useDispatch();
  const scrollViewRef = useRef();

  const fetchBot = async () => {
    const res = await axios.post('https://api.openai.com/v1/completions',
    JSON.stringify({
      model: 'text-davinci-003',
      prompt: searchFilter,
      max_tokens: 512,
      temperature: 0
    }),{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      }
    },
    )

    return res;
  };

  const handleSubmit = () => {
    setMessages(prevMessages => [
      ...prevMessages,
      {name: 'Tôi', message: searchFilter},
    ]);
    setReplying(true);
    fetchBot().then(res => {
      setReplying(false);
      setMessages(prevMessages => [
        ...prevMessages,
        {
          name: 'OpenAI',
          message: res?.data.choices[0].text.trim().includes('?\n\n') ? res?.data.choices[0].text.trim().split('?\n\n')[1] : res?.data.choices[0].text.trim(),
        },
      ]);
    });
    setSearchFilter('');
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'column',
          padding: 25,
          backgroundColor: '#1479FF',
          height: '15%',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          paddingHorizontal: 20,
        }}>
        <View style={{height: Platform.OS === 'ios' ? '43%' : '0%'}}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 0,
          }}>
          <TouchableOpacity
            onPress={() => {
            }}>
            <FontAwesome name={'arrow-left'} size={25} color="#1479FF" />
          </TouchableOpacity>
          <Text style={{fontSize: 25, color: '#FFF', fontWeight: '600'}}>
            Trợ lý thông minh
          </Text>
          <View style={{height: 42, width: 42, borderRadius: 42, backgroundColor: '#1479FF'}}></View>
        </View>
      </View>
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#fb8c00"
            style={{flex: 1, justifyContent: 'center'}}
          />
        ) : (
          <KeyboardAvoidingView
            enabled
            style={{flexGrow: 1, height: '100%', flex: 1}}
            keyboardVerticalOffset={Platform.select({ios: 140, android: 500})}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() =>
                scrollViewRef.current.scrollToEnd({animated: true})
              }
              style={{
                flex: 1,
                backgroundColor: 'white',
                margin: 20,
              }}>
              {messages.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      alignItems:
                        item.name === 'OpenAI' ? 'flex-start' : 'flex-end',
                      padding: 10,
                    }}>
                    <View
                      key={index}
                      style={{
                        borderRadius: 10,
                        flexDirection: 'column',
                        marginTop: index === 0 ? 0 : 10,
                        alignItems:
                          item.name === 'OpenAI' ? 'flex-start' : 'flex-end',
                        backgroundColor:
                          item.name === 'OpenAI' ? '#E7F2FF' : '#EAF9F3',
                        padding: 20,
                      }}>
                      <Text style={{textAlign: 'left'}}>{item.message}</Text>
                    </View>
                    {item.name === 'OpenAI' ? (
                      <View style={{position: 'absolute'}}>
                        <FontAwesome
                          name={'robot'}
                          light
                          size={25}
                          color="#000"
                        />
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>
                );
              })}
              {replying ? (
                <View
                  style={{
                    alignItems: 'flex-start',
                    padding: 10,
                  }}>
                  <View
                    style={{
                      borderRadius: 10,
                      marginTop: 10,
                      alignItems: 'flex-start',
                      backgroundColor: '#E7F2FF',
                      padding: 20,
                    }}>
                    <ActivityIndicator size="small" color="#fb8c00" />
                  </View>
                  <View style={{position: 'absolute'}}>
                    <FontAwesome name={'robot'} light size={25} color="#000" />
                  </View>
                </View>
              ) : (
                <></>
              )}
            </ScrollView>
            <View
              style={{
                padding: 15,
                flexDirection: 'row',
                height: '12%',
                backgroundColor: '#FFFFFF',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
                ...Platform.select({
                  android: {elevation: 3},
                  ios: {
                    shadowColor: '#a8bed2',
                    shadowOpacity: 1,
                    shadowRadius: 3,
                    shadowOffset: {
                      width: 2,
                      height: 2,
                    },
                  },
                }),
              }}>
              <View style={{flex: 6, backgroundColor: '#FFF'}}>
                <TextInput
                  value={searchFilter}
                  onChangeText={setSearchFilter}
                  placeholder="Nhập câu hỏi"
                  placeholderTextColor={'#A7AFBC'}
                  style={{
                    color: '#A7AFBC',
                    flex: 8,
                    height: '100%',
                    fontSize: 18,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if(!searchFilter) {
                    showMessage({
                        message: 'Không thành công',
                        description: 'Vui lòng nhập câu hỏi!',
                        type: 'warning',
                    });
                  }
                  else if(replying){
                    showMessage({
                        message: 'Không thành công',
                        description: 'Vui lòng đợi trợ lý trả lời câu hỏi trước!',
                        type: 'warning',
                    });
                  }
                  else{
                    handleSubmit();
                  }
                }}
                style={{
                  flex: 1,
                  borderRadius: 25,
                  backgroundColor: '#2EC28B',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <FontAwesome
                  name={'paper-plane'}
                  light
                  size={20}
                  color="#FFF"
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}
      </View>
    </View>
  );
};

export default ChatScreen;
