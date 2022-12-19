import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {setRatingState} from '../redux/ReduxPersist/States';
import {Rating, AirbnbRating} from 'react-native-ratings';

export const RatingModel = () => {
  const state = useSelector(state => state.status.ratingState);
  const dispatch = useDispatch();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={state}
      onRequestClose={() => {
        {
          dispatch(setRatingState());
        }
      }}>
      <View style={{backgroundColor: '#7A7A7A', flex: 1}}>
        <View
          style={{
            height: 500,
            marginHorizontal: 20,
            backgroundColor: '#FFF',
            marginTop: Platform.OS === 'ios' ? 180 : 200,
            borderWidth: 0.7,
            borderColor: '#7A7A7A',
          }}>
            <View style={{marginTop:5,marginLeft:Platform.OS === 'ios' ? 320:350}}>
            <TouchableOpacity onPress={() => {
                {
                    dispatch(setRatingState());
                }
                
            }} style={{height:30,width:30}} >
            <Image source={require('../assets/images/close_icon_grey_mdpi.png')} style={{height:20,width:20,}}/>
            </TouchableOpacity>
            </View>
          <Text
            style={{
              fontFamily: 'Avenir Medium',
              color: 'black',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 30,
            }}>
            Overall Rating
          </Text>
          <Text
            style={{
              fontFamily: 'Avenir Medium',
              color: '#36B000',
              fontSize: 38,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
            }}>
            8.5
          </Text>

          <Text
            style={{
              fontFamily: 'Avenir Book',
              color: 'black',
              fontSize: 28,
              textAlign: 'center',
              marginTop: 50,
            }}>
            How would you rate your experience?
          </Text>
          <View style={{marginTop: 30}}>
            <AirbnbRating
              count={5}
              defaultRating={3}
              size={40}
              isDisabled={true}
              showRating={false}
            />
          </View>
          <View
            style={{
              borderWidth: 0.7,
              height: 65,
              borderColor: '#7A7A7A',
              marginTop:Platform.OS === 'ios' ? 52 :43,
            }}>
            <TouchableOpacity onPress={()=>{console.log('=-=-')}}>
              <Text
                style={{
                  fontFamily: 'Avenir Medium',
                  fontWeight: '500',
                  color: '#351347',
                  fontSize: 24,
                  textAlign: 'center',
                  marginTop: Platform.OS === 'ios' ? 13 : 8,
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
