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
import TopTabNav from '../navigation/TopTabNavigation';

export const Home = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <View style={styles.topbar}>
        <SafeAreaView>
          <View style={{marginTop:Platform.OS === 'ios' ?  20: 40, flexDirection: 'row',marginHorizontal:20,justifyContent:'space-between',}}>
          <TouchableOpacity onPress={() => {navigation.openDrawer()}}>
            <Image style={styles.menu} source={require('../assets/images/menu_icon.png')} />
            </TouchableOpacity>
            <Image style={styles.logo}  source={require('../assets/images/logo.png')} />
            <View style={{flexDirection:'row'}}>
            <Image style={styles.filter}  source={require('../assets/images/filter_icon.png')} />
            <TouchableOpacity onPress={() => {navigation.navigate('Search')}}>
            <Image style={styles.search}  source={require('../assets/images/search_icon.png')} />
            </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
      <TopTabNav/>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height:Platform.OS === 'ios' ?  120:100,
    backgroundColor: '#370F24',
    
  },
  logo:{
    height:20,
    width:150,
    marginLeft:50,
  },
  filter:{
    marginRight:20,
    marginLeft:10,
    height:22,
    width:22
  },
  search:{
    height:22,
    width:22
  },
  menu:{
    height:22,
    width:22
  }

});
