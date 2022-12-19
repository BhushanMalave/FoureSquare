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
import Icon from 'react-native-vector-icons/AntDesign';
import { ReviewViewComponent } from '../components/ReviewComponent';

export const ViewReview = ({navigation}) => {
  const {height,width} = useWindowDimensions();
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.topbar}>
        <SafeAreaView>
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 20 : 40,
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-between',
            }}>
               <TouchableOpacity onPress={()=>{navigation.goBack()}}>
            <Image
              style={styles.menu}
              source={require('../assets/images/back_icon.png')}
            />
            </TouchableOpacity>
            
            <Text
              style={{
                fontFamily: 'Avenir Book',
                fontSize: 22,
                color: '#fff',
                marginTop: -5,
              }}>
              Attil
            </Text>
            <Icon name="addfile" size={24} color="#fff"   onPress={()=>{navigation.navigate('AddReviews')}} />
          </View>
        </SafeAreaView>
      </View>
      <View style={{backgroundColor: 'white', flex: 1}}>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        <ReviewViewComponent/>
        </View>
       
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height: Platform.OS === 'ios' ? 110 : 100,
    backgroundColor: '#370F24',
  },
  menu: {
    height: 22,
    width: 22,
  },
});
