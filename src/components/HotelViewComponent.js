import React, {useState, useEffect, useLayoutEffect} from 'react';

import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
  Platform,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';

export const HotelViewComponent = ({onPress}) => {
  const {height, width} = useWindowDimensions();
  return (
    <TouchableOpacity style={styles.Container} onPress={onPress}>
      <Image
        source={require('../assets/images/images.jpeg')}
        style={styles.hotelimg}
      />
      <View style={{marginHorizontal: 13,marginVertical:6,}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: width > height ? '66%' : '60%',
          }}>
          <Text
            style={{
              fontFamily: 'Avenir Light',
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Attil
          </Text>
          <Image
            source={require('../assets/images/favourite.png')}
            style={styles.star}
          />
        </View>
        <View
          style={{
            backgroundColor: '#76B947',
            height: 23,
            width: 25,
            borderRadius: 4,
            marginTop: 25,
          }}>
          <Text
            style={{
              fontFamily: 'Avenir Light',
              fontSize: 14,
              textAlign: 'center',
              alignSelf: 'center',
              color: 'white',
              marginTop: 2,
            }}>
            8.5
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text
            style={{
              fontFamily: 'Avenir Book',
              fontSize: 16,
              color: '#7A7A7A',
              fontWeight: '500',
            }}>
            Indian{'·'}
          </Text>
          <Text
            style={{
              fontFamily: 'Avenir Book',
              fontSize: 16,
              color: '#7A7A7A',
              fontWeight: '500',
            }}>
            fhgjdkfhgsdfkjghfdhjg
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  hotelimg: {
    height: 140,
    width: 140,
  },
  star: {
    tintColor: 'red',
  },
});
