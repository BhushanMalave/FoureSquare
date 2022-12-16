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
import Maps from '../components/Maps';

export const NearYou = ({navigation}) => {
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height:230}}>
        <Maps/>
        </View>
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