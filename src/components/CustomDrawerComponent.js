import React,{useEffect,useState} from 'react';
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
import { useSelector,useDispatch } from 'react-redux';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';
import { gettProfile } from '../authorization/Auth';
import { logoutApi } from '../authorization/Auth';
import { setToken } from '../redux/ReduxPersist/User';
import { setLoginState } from '../redux/ReduxPersist/States';
export const DrawerContent = ({navigation, props}) => {
  const login = useSelector(state=>state.status.loginState)
  const token = useSelector(state=>state.userDetails.token);
  const [data,setData] =useState(null); 
  const dispatch=useDispatch(null);

  const call = async() => {
    const res = await gettProfile(token);
    setData(res);
  }

  useEffect(() => {
    call();
   
  }, []);
  return (
    <ImageBackground
      source={require('../assets/images/backgroundcopy.png')}
      style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <SafeAreaView style={{flex: 1}}>
          {login === 2 ? (  <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              marginTop: Platform.OS === 'ios' ? 0 : 60,
            }}>
            <Image
              source={{uri:data?.profileImage?.public_id}}
              style={{height: 110, width: 110, borderRadius: 50}}
            />
            <Text
              style={{
                fontFamily: 'Avenir Medium',
                fontSize: 24,
                color: '#fff',
                marginTop: 20,
              }}>
             {data?.fullName}
            </Text>
          </View>) : (  <View
            style={{
              alignContent: 'center',
              alignItems: 'center',
              marginTop: Platform.OS === 'ios' ? 0 : 60,
            }}>
            <Image
              source={require('../assets/images/login.webp')}
              style={{height: 110, width: 110, borderRadius: 50}}
            />
            <TouchableOpacity onPress={() => {
              dispatch(setLoginState(0));
            }}>
            <Text
              style={{
                fontFamily: 'Avenir Medium',
                fontSize: 24,
                color: '#fff',
                marginTop: 20,
              }}>
             Login
            </Text>
            </TouchableOpacity>
          </View>)}
          
          <View
            style={{
              marginHorizontal: 20,
            }}>
              {login === 2 ? ( <View
              style={{
                marginTop: Platform.OS === 'ios' ? 60 : 80,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Favourite');
                }}
                style={{
                  flexDirection: 'row',
                  borderBottomColor: '#52434D',
                  borderBottomWidth: 2,
                  height: 60,
                }}>
                <Image
                  source={require('../assets/images/favourite_iconcopy.png')}
                  style={{height: 24, width: 26, marginLeft: 20}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Avenir Medium',
                    fontWeight: '500',
                    fontSize: 24,
                    marginTop: -5,
                    marginLeft: 20,
                  }}>
                  Favourites
                </Text>
              </TouchableOpacity>
            </View>):( <View
              style={{
                marginTop: Platform.OS === 'ios' ? 60 : 80,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  borderBottomColor: '#52434D',
                  borderBottomWidth: 2,
                  height: 60,
                }}>
                <Image
                  source={require('../assets/images/favourite_iconcopy.png')}
                  style={{height: 24, width: 26, marginLeft: 20,tintColor: '#474049'}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Avenir Medium',
                    fontWeight: '500',
                    fontSize: 24,
                    marginTop: -5,
                    marginLeft: 20,
                    color: '#474049'
                  }}>
                  Favourites
                </Text>
              </View>
            </View>)}
           
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 40 : 40,
              }}>
                {login === 2 ? (
                   <TouchableOpacity
                   onPress={() => {
                     navigation.navigate('Feedback');
                   }}
                   style={{
                     flexDirection: 'row',
                     borderBottomColor: '#52434D',
                     borderBottomWidth: 2,
                     height: 60,
                   }}>
                   <Image
                     source={require('../assets/images/feedback.png')}
                     style={{height: 24, width: 26, marginLeft: 20}}
                   />
                   <Text
                     style={{
                       color: 'white',
                       fontFamily: 'Avenir Medium',
                       fontWeight: '500',
                       fontSize: 24,
                       marginTop: -5,
                       marginLeft: 20,
                     }}>
                     Feedback
                   </Text>
                 </TouchableOpacity>
                ):(
                  <View
                  style={{
                    flexDirection: 'row',
                    borderBottomColor: '#52434D',
                    borderBottomWidth: 2,
                    height: 60,
                  }}>
                  <Image
                    source={require('../assets/images/feedback.png')}
                    style={{height: 24, width: 26, marginLeft: 20,tintColor:'#474049'}}
                  />
                  <Text
                    style={{
                      color: '#474049',
                      fontFamily: 'Avenir Medium',
                      fontWeight: '500',
                      fontSize: 24,
                      marginTop: -5,
                      marginLeft: 20,
                    }}>
                    Feedback
                  </Text>
                </View>
                )}
             
            </View>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 40 : 40,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AboutUs');
                }}
                style={{
                  flexDirection: 'row',
                  borderBottomColor: '#52434D',
                  borderBottomWidth: 2,
                  height: 60,
                }}>
                <Image
                  source={require('../assets/images/about.png')}
                  style={{height: 24, width: 26, marginLeft: 20}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Avenir Medium',
                    fontWeight: '500',
                    fontSize: 24,
                    marginTop: -5,
                    marginLeft: 20,
                  }}>
                 About us
                </Text>
              </TouchableOpacity>
            </View>
            {login === 2 ? (<View
              style={{
                marginTop: Platform.OS === 'ios' ? 40 : 40,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                  dispatch(setLoginState(0));
                  const res = logoutApi(token);
                  dispatch(setToken(null));

                }}
                style={{
                  flexDirection: 'row',
                  borderBottomColor: '#52434D',
                  borderBottomWidth: 2,
                  height: 60,
                }}>
                <Image
                  source={require('../assets/images/logout.png')}
                  style={{height: 24, width: 26, marginLeft: 20}}
                />
                <Text
                  style={{
                    color: 'white',
                    fontFamily: 'Avenir Medium',
                    fontWeight: '500',
                    fontSize: 24,
                    marginTop: -5,
                    marginLeft: 20,
                  }}>
                 Logout
                </Text>
              </TouchableOpacity>
            </View>) : (<View
              style={{
                marginTop: Platform.OS === 'ios' ? 40 : 40,
              }}>
              <View
               
                style={{
                  flexDirection: 'row',
                  borderBottomColor: '#52434D',
                  borderBottomWidth: 2,
                  height: 60,
                }}>
                <Image
                  source={require('../assets/images/logout.png')}
                  style={{height: 24, width: 26, marginLeft: 20,tintColor: '#474049'}}
                />
                <Text
                  style={{
                    color: '#474049',
                    fontFamily: 'Avenir Medium',
                    fontWeight: '500',
                    fontSize: 24,
                    marginTop: -5,
                    marginLeft: 20,
                  }}>
                 Logout
                </Text>
              </View>
            </View>)}
            
          </View>
        </SafeAreaView>
      </DrawerContentScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({});
