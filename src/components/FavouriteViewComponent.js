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

import {useDispatch, useSelector} from 'react-redux';
import {addFavouriteApi} from '../authorization/Auth';
import { setInitialState } from '../redux/ReduxPersist/States';

export const FaviouriteViewComponent = ({item,onPress,navigation}) => {
  const token = useSelector(state=>state.userDetails.token);
  const state = useSelector(state=> state.status.initialState);
  const {height, width} = useWindowDimensions();
  const dispatch=useDispatch();
  const convertPriceRange = number => {
    if (number < 10) {
      return '₹';
    } else if (number < 100) {
      return '₹₹';
    } else if (number < 1000) {
      return '₹₹₹';
    } else {
      return '₹₹₹₹';
    }
  };
  const removeFromFavourite = async (id) => {
    const body ={
      "placeId":id,
    }
    const res = await addFavouriteApi(token,body);
    console.log(res);
  }


  return (
    <TouchableOpacity style={styles.Container}   onPress={()=>{ navigation.navigate('DetailScreen', {item})}}>
      <Image source={{uri: item?.placeImages?.url}} style={styles.hotelimg} />
      <View
        style={{
          flex: 1,
          paddingLeft: 7,
          paddingRight: 7,
          paddingTop: 7,
          paddingBottom: 7,
        }}>
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
              width: '70%',
              height: 60,
            }}>
            {item?.placeName}
          </Text>
                <TouchableOpacity onPress={onPress}>
                  <Image
                    source={require('../assets/images/close_icon_grey_mdpi.png')}
                    style={styles.star}
                  />
                </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: '#74d434',
            height: 23,
            width: 25,
            borderRadius: 4,
            marginTop: 0,
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
            {item?.totalrating / 2}
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
             {item?.keywords?.length >10 ? item?.keywords.substring(0,10)+'...' : (item?.keywords)} 
            {' • '}
          {`${convertPriceRange(item?.priceRange)}  `}
           
            {Math.round(item?.dist?.calculated * 100) / 100}
            {'km'}
          </Text>
          <View style={{}}>
            <Text
              style={{
                fontFamily: 'Avenir Book',
                fontSize: 14,
                color: '#7A7A7A',
                fontWeight: '500',
                flexShrink: 1,
              }}>
               {
              width > height ? (
                item?.address
              ):(
               item?.address?.length > 33
                ? item?.address.substring(0, 33) + '...'
                : item?.address
              )
              
              }
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
    height: 18,
    width: 18,
    marginTop: 8,
    marginRight: 8,
  },
});
