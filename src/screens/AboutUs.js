import React from 'react';
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

export const AboutUs = ({navigation}) => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.topbar}>
        <SafeAreaView>
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 20 : 30,
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <Image
              style={styles.menu}
              source={require('../assets/images/back_icon.png')}
            />
            <Text style={{fontFamily:'Avenir Book',fontSize:26,color:'#fff',marginTop:-5,}}>
               About us
            </Text>
            <Icon name="home-outline" size={28} color="#fff" />
            </View>
        </SafeAreaView>
      </View>
      <View style={{backgroundColor:'white',flex:1}}>
      <View style={{flex:1,marginHorizontal:15,marginVertical:15,backgroundColor:'white'}}>
        <Text style={{fontFamily:'Avenir Book',fontSize:18,color:'#7A7A7A',letterSpacing:0.9,lineHeight:28}}>
            hgjdfkhgldfshgsjdfvbfdvbdfvbfhushdfuhsd dfhusdhfhsud usdhfusdhfus usdhfuasdhfuajsdh usdhfusdhfuasdhf asfhsdukfhasdkl fsudhfujkasd fasduhfsjdh
        </Text>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    topbar: {
        height:Platform.OS === 'ios' ?  110:80,
        backgroundColor: '#370F24',
        
      },
      menu:{
        height:22,
        width:22
      }
});
