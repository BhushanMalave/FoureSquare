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

export const ReviewViewComponent = ({item}) => {
  const {height, width} = useWindowDimensions();
  return (
    <View style={styles.Container} >
      <View style={{backgroundColor: 'white',}}>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 20,
            marginVertical: 20,
            height: 52,
          }}>
          <Image
             source={{uri:item?.userId?.profileImage?.public_id}}
            style={{height: 50, width: 50, borderRadius: 50}}
          />
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <View style={{width: '60%', marginLeft: 15}}>
              <Text
                style={{
                  fontFamily: 'Avenir Medium',
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'black',
                  textTransform:'capitalize',
                }}>
               {item?.userId?.fullName}
              </Text>
              <Text
                style={{
                  fontFamily: 'Avenir Book',
                  fontSize: 14,
                  color: '#7A7A7A',
                  marginTop: 0,
                  textTransform:'capitalize',
                  height:60,
                  textAlign:'justify',
                  width:width>height ? '150%':"100%",

                }}>
            {item?.review?.length > 50
                ? item?.review.substring(0, 50) + '...'
                : item?.review}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontFamily: 'Avenir Book',
                  fontSize: 14,
                  color: '#7A7A7A',
                  marginLeft:
                    width > height
                      ? Platform.OS === 'ios'
                        ? 150
                        : 185
                      : Platform.OS === 'ios'
                      ? -10
                      : -10,
                }}>
                June 24,2015
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            borderWidth: 0.3,
            marginTop: 20,
            marginBottom: 0,
            opacity: 0.5,
            color: '#CCCCCC',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
   
  },
  hotelimg: {
    height: 140,
    width: 140,
  },
  star: {
    tintColor: 'red',
  },
});
