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
import {setInitialState} from '../redux/ReduxPersist/States';
import { setLoginState } from '../redux/ReduxPersist/States';

export const SearchViewComponent = ({onPress, item, state,style={}}) => {
  const {height, width} = useWindowDimensions();
  const login = useSelector(state => state.status.loginState);
  const token = useSelector(state => state.userDetails.token);
  const favData = useSelector(state => state.userDetails.userFavData);
  const [fav, setFav] = useState(false);
  const dispatch = useDispatch();
  // console.log("====",favData);

  const favDatacompare = () => {
    favData?.map(item => {
      if (item._id === favData._id) {
        setFav(true);
        console.log(fav);
      }
    });
  };

  const log1 = () => {
    
    Alert.alert('', 'Login to add  to Favourite', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Login',
        onPress: () => {
          dispatch(setLoginState(0));
        },
      },
    ]);
  };


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
  const addToFavourite = async id => {
    const body = {
      placeId: id,
    };
    const res = await addFavouriteApi(token, body);
    console.log(res);
    dispatch(setInitialState());
  };
  const removeFromFavourite = async id => {
    const body = {
      placeId: id,
    };
    const res = await addFavouriteApi(token, body);
    console.log(res);
    dispatch(setInitialState());
  };

  return (
    <TouchableOpacity style={[styles.Container,{width:width}]} onPress={onPress}>
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
            flex:1,
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
          {login === 1 ? (
            <Pressable onPress={()=>{log1()}}>
              <Image
                source={require('../assets/images/favourite_star.png')}
                style={styles.star}
              />
            </Pressable>
          ) : favData?.length > 0 ? (
            favData.filter(ele => ele?._id === item?._id)?.length > 0 ? (
              <TouchableOpacity
                onPress={() => {
                  addToFavourite(item?._id);
                }}>
                <Image
                  source={require('../assets/images/favourite_icon.png')}
                  style={styles.star}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  removeFromFavourite(item?._id);
                }}>
                <Image
                  source={require('../assets/images/favourite_star.png')}
                  style={styles.star}
                />
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              onPress={() => {
                removeFromFavourite(item?._id);
              }}>
              <Image
                source={require('../assets/images/favourite_star.png')}
                style={styles.star}
              />
            </TouchableOpacity>
          )}
        </View>
        {item?.totalrating >= 8 ? (
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
             {item?.totalrating}
           </Text>
         </View>
        ) : (
          <View
          style={{
            backgroundColor:'#b0e034',
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
            {item?.totalrating}
          </Text>
        </View>
        )}
       
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
   marginHorizontal: 4,
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
    height: 20,
    width: 22,
    marginTop: 8,
    marginRight: 8,
  },
});
