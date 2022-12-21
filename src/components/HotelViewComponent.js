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
  TouchableOpacity,
} from 'react-native';

export const HotelViewComponent = ({onPress, item}) => {
  const {height, width} = useWindowDimensions();
  return (
    <TouchableOpacity style={styles.Container} onPress={onPress}>
      <Image source={{uri: item?.placeImages?.url}} style={styles.hotelimg} />
      <View style={{flex: 1,paddingLeft:7,paddingRight:7,paddingTop:7,paddingBottom:7,}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            // justifyContent:'flex-end',
            //  width: width > height ? '70%' : '80%',
          
          }}>
          <Text
            style={{
              fontFamily: 'Avenir Light',
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {item?.placeName}
          </Text>
          <TouchableOpacity onPress={() => {}}>
          <Image
            source={require('../assets/images/favourite_iconcopy.png')}
            style={styles.star}
          />
          </TouchableOpacity>
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
            {item?.totalrating ? item?.totalrating : '-'}
          </Text>
        </View>
        <View style={{marginTop: 5}}>
          <Text
            style={{
              fontFamily: 'Avenir Book',
              fontSize: 14,
              color: '#7A7A7A',
              fontWeight: '500',
            }}>
            Indian {'·'} {item?.priceRange}{' '}
            {Math.round(item?.dist?.calculated / 1.609, 2 * 100) / 100}
            {'km'}
          </Text>
          <View style={{}}>
            <Text
              style={{
                fontFamily: 'Avenir Book',
                fontSize: 14,
                color: '#7A7A7A',
                fontWeight: '500',
                flexShrink:1,
              }}>
              {item?.address?.length >20 ? item?.address.substring(0,25)+"..." : item?.address}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
    marginVertical: 4,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    height: 140,
  },
  hotelimg: {
    height: 140,
    width: 140,
  },
  star: {
    tintColor: 'red',
    height:20,width:22,
  },
});
