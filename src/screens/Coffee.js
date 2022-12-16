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
import { HotelViewComponent } from '../components/HotelViewComponent';

export const Coffee = ({navigation}) => {
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <HotelViewComponent onPress={()=>{navigation.navigate('DetailScreen')}}/>
         <HotelViewComponent onPress={()=>{navigation.navigate('DetailScreen')}}/>
         <HotelViewComponent onPress={()=>{navigation.navigate('DetailScreen')}}/>
         <HotelViewComponent onPress={()=>{navigation.navigate('DetailScreen')}}/>
         <HotelViewComponent onPress={()=>{navigation.navigate('DetailScreen')}}/>
         <HotelViewComponent onPress={()=>{navigation.navigate('DetailScreen')}}/>
         <HotelViewComponent onPress={()=>{navigation.navigate('DetailScreen')}}/>
         <HotelViewComponent onPress={()=>{navigation.navigate('DetailScreen')}}/>
        </ScrollView>
    )
}

const styles =StyleSheet.create({

})