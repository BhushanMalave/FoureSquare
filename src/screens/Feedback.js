import React from 'react';
import {useState} from 'react';
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Platform,
  TextInput,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Formik} from 'formik';
import { giveFeedBack } from '../authorization/Auth';
import { useSelector } from 'react-redux';

export const Feedback = ({navigation}) => {
  const [text, setText] = useState('');
  const token = useSelector(state=>state.userDetails.token);
  const handleText = string => {
    setText(string);
  };
  const handleSubmit =async() => {
    const body=
     {
      feedback:text,
     };

    const res = await giveFeedBack(token,body);
    navigation.goBack();
   



  };
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flex:1}}>
        <View style={styles.topbar}>
          <SafeAreaView>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 20 : 30,
                flexDirection: 'row',
                marginHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  style={styles.menu}
                  source={require('../assets/images/back_icon.png')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Avenir Book',
                  fontSize: 26,
                  color: '#fff',
                  marginTop: -5,
                }}>
                Feedback
              </Text>
              <Icon name="home-outline" size={28} color="#fff"  onPress={()=> {navigation.navigate('HomeStack')}}/>
            </View>
          </SafeAreaView>
        </View>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{marginHorizontal: 15, marginVertical: 15}}>
            <Text
              style={{fontFamily: 'Avenir Book', fontSize: 20, color: 'black'}}>
              Write your feedback
            </Text>
          </View>

          <View style={{marginHorizontal: 15, marginVertical: 15, flex: 1}}>
            <View style={styles.body}>
              <TextInput
                multiline={true}
                numberOfLines={15}
                name="notes"
                onChangeText={handleText}
                style={styles.textNotes}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonbody}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height: Platform.OS === 'ios' ? 110 : 80,
    backgroundColor: '#370F24',
  },
  menu: {
    height: 22,
    width: 22,
  },
  textNotes: {
    height: 180,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#FFF',
    borderColor: '#D7D7D7',
    color: '#3C4858',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  button: {
    height: 60,
    backgroundColor: '#301934',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonbody: {
    bottom: Platform.OS === 'ios' ? 0 : 2,
    position: 'absolute',
    width: '100%',
  },
  buttontext: {
    height: 28,
    width: 80,
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
  },
});
