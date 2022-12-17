import React, {useDebugValue} from 'react';
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
import {MapsDetails} from '../components/MapsDetails';
import LinearGradient from 'react-native-linear-gradient';
import Maps from '../components/Maps';

export const DetailScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('../assets/images/images.jpeg')}
        style={styles.hotelimg}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0, 0.5, 1]}
          style={{height: 330}}
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.0)', 'rgba(0,0,0,0.8)']}>
          <SafeAreaView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
                marginTop: Platform.OS === 'android' ? 30 : 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack()
                }}>
                <Image
                  source={require('../assets/images/back_icon.png')}
                  style={{height: 22, width: 26}}
                />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily: 'Avenir Medium',
                  fontSize: 30,
                  color: '#FFF',
                  marginLeft: 30,
                  marginTop: -5,
                }}>
                Attil
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                  source={require('../assets/images/share_icon.png')}
                  style={{height: 22, width: 26}}
                />
                <Image
                  source={require('../assets/images/favourite_iconcopy.png')}
                  style={{height: 24, width: 26, marginLeft: 20}}
                />
              </View>
            </View>
            <View
              style={{
                marginTop:
                  width > height
                    ? Platform.OS === 'ios'
                      ? 160
                      : 130
                    : Platform.OS === 'ios'
                    ? 120
                    : 120,
                marginHorizontal:
                  width > height
                    ? Platform.OS === 'ios'
                      ? 160
                      : 200
                    : Platform.OS === 'ios'
                    ? 25
                    : 25,
              }}>
              <Text
                style={{
                  fontFamily: 'Avenir Medium',
                  fontSize: 22,
                  color: 'white',
                  justifyContent: 'center',
                  textAlign: 'center',
                }}>
                Indian Restaurant , Indian Restaurant and Indian Restaurant
              </Text>
            </View>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            marginHorizontal: 75,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/rating_icon.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={{color: '#7A7A7A', marginTop: 3}}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require('../assets/images/photos_icon.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={{color: '#7A7A7A', marginTop: 3}}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{navigation.navigate('ViewReviews')}}>
            <Image
              source={require('../assets/images/review_icon.png')}
              style={{height: 40, width: 40}}
            />
            <Text style={{color: '#7A7A7A', marginTop: 3}}>Review</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderWidth: 0.3,
            marginTop: 20,
            marginHorizontal: 25,
            marginBottom: 20,
            opacity: 0.5,
            color: '#7A7A7A',
          }}
        />

        <Text
          style={{
            marginHorizontal: 25,
            fontFamily: 'Avenir Book',
            fontSize: 22,
            color: '#351347',
          }}>
          Overview
        </Text>
        <Text
          style={{
            marginLeft: 25,
            fontFamily: 'Avenir Book',
            fontSize: 18,
            color: '#8D8D8D',
            lineHeight: 23,
            marginTop: 10,
            marginRight: 20,
          }}>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal readable
          content of a page when looking at its layout. The point of using Lorem
          Ipsum is that it has a more-or-less normal
        </Text>
        <View
          style={{height: Platform.OS === 'ios' ? 180 : 230, marginTop: 20}}>
          <Maps/>
        </View>
        <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            locations={[0.4, 0.8]}
            colors={['rgba(249, 245, 238 ,1)', 'rgba(249, 245, 238,0)']}
            style={{
              height: Platform.OS === 'ios' ? 180 : 230,
              marginTop:Platform.OS === 'ios' ? -180 : -230,
            }}>
              <View>
                <Text style={{fontFamily:'Avenir Medium',fontSize:18,color:'#7A7A7A',fontWeight:'500',marginTop:20,}}>
                  Daffodils,Laxmindra
                </Text>
                <Text style={{fontFamily:'Avenir Medium',fontSize:18,color:'#7A7A7A',fontWeight:'500'}}>
                  Nargar, 2nd Cross Udupi
                </Text>
                <Text style={{fontFamily:'Avenir Medium',fontSize:18,color:'#7A7A7A',fontWeight:'500',marginTop:20}}>
                  +91 9884537389
                </Text>
                <Text style={{fontFamily:'Avenir Medium',fontSize:18,color:'#7A7A7A',fontWeight:'500',marginTop:20}}>
                  Drive : 5km
                </Text>
              </View>
            </LinearGradient>
        <View style={styles.buttonbody}>
          <TouchableOpacity  onPress={()=>{navigation.navigate('AddReviews')}} style={styles.button}>
            <Text style={styles.buttontext}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  hotelimg: {
    flex: 1,
    height: 300,
  },
  button: {
    height: 70,
    backgroundColor: '#301934',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonbody: {
    width: '100%',
  },
  buttontext: {
    height: 28,
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
  },
});
