import React, {useState, useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import {HotelViewComponent} from '../components/HotelViewComponent';
import {popularPlaces} from '../authorization/Auth';
export const Popular = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {}, []);

  const popularplaces = async () => {
    const res = await topPickPlaces();
    setData(res);
    console.log(data);
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {!data ? (
        <ActivityIndicator size="large" color="#7A7A7A" />
      ) : (
        <HotelViewComponent
          onPress={() => {
            navigation.navigate('DetailScreen');
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});
