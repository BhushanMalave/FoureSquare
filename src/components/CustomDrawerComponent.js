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
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useSelector, useDispatch} from 'react-redux';
import {setToken} from '../redux/ReduxPersist/UserDetails';
import {useIsFocused} from '@react-navigation/native';
import {drawerDataApiCall} from '../redux/ThunkToolkit/DrawerDataApi/DrawerData';

export const CustomDrawerComponent = props => {
  const token = useSelector(state => state.userDetails.token);
  const dispatch = useDispatch();
  const data = useSelector(state => state.drawerData.data);
  const log = () => {
    props.navigation.goBack();
    Alert.alert('', 'Are you sure want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },
      {
        text: 'Logout',
        onPress: () => {
          dispatch(setToken(null));
        },
      },
    ]);
  };
  const focus = useIsFocused();

  useLayoutEffect(() => {
    dispatch(drawerDataApiCall(token));
  }, [focus]);



  return (
    <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? -52 : -4}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={{uri: data?.profilePhoto}}
          style={styles.backgroundimg}>
          <View style={styles.backgroundImgBlur}>
            <View style={styles.topinfo}>
              <Image
                source={{uri: data?.profilePhoto}}
                style={styles.imgprofile}
              />
              <View style={styles.topinfotext}>
                <Text style={styles.textname}>{data?.fullName}</Text>
                <Text style={styles.textdesc}>{data?.occupation}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <DrawerItemList {...props} />
        {data?.notificationCount > 0 ? (
          <>
            <View style={styles.notify}>
              <Text style={styles.notifyText}>{data?.notificationCount}</Text>
            </View>
            <Pressable style={{marginTop: 95}} onPress={log}>
              <View style={styles.ViewText}>
                <Image
                  source={require('../assets/images/icn_logout_menu.png')}
                  style={{
                    height: 16,
                    width: 15,
                    marginBottom: 0,
                    tintColor: 'black',
                  }}
                />
                <Text style={styles.textlog}>Logout</Text>
              </View>
            </Pressable>
          </>
        ) : (
          <Pressable style={{marginTop: 20}} onPress={log}>
            <View style={styles.ViewText}>
              <Image
                source={require('../assets/images/icn_logout_menu.png')}
                style={{
                  height: 16,
                  width: 15,
                  marginBottom: 0,
                  tintColor: 'black',
                }}
              />
              <Text style={styles.textlog}>Logout</Text>
            </View>
          </Pressable>
        )}
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundimg: {
    height: 188,
    marginBottom: 30,
  },
  backgroundImgBlur: {
    backgroundColor: '#042C5C',
    opacity: 0.9,
    height: 188,
  },
  topinfo: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 80,
  },
  topinfotext: {
    marginLeft: 15,
  },
  viewinfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginTop: 25,
  },
  viewpass: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 24,
    marginVertical: 30,
    backgroundColor: '#FEFEFF',
    shadowOpacity: 0.1,
    borderRadius: 6,
  },
  ViewText: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  textname: {
    color: '#FFFFFF',
    fontWeight: Platform.OS == 'ios' ? 'bold' : 'normal',
    fontFamily: Platform.OS == 'ios' ? 'Biko' : 'Biko_Bold',
    fontSize: 16,
    marginTop: 15,
    textAlign: 'left',
  },
  textdesc: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Proxima Nova' : 'proximanova-semibold',
    fontWeight: Platform.OS == 'ios' ? 'bold' : 'normal',
    fontSize: 12,
    marginTop: 10,
  },
  textlog: {
    color: '#373737',
    fontFamily: Platform.OS === 'ios' ? 'Proxima Nova' : 'ProximaNova-Regular',
    fontWeight: Platform.OS == 'ios' ? 'bold' : '500',
    fontSize: 16,
    marginLeft: 21,
    marginTop: Platform.OS === 'ios' ? 1 : -3,
  },
  notifyText: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Proxima Nova' : 'proximanova-semibold',
    fontWeight: Platform.OS == 'ios' ? 'bold' : 'normal',
    fontSize: 12,
    textAlign: 'center',
    marginTop: Platform.OS === 'ios' ? 4 : 1,
  },
  notify: {
    height: 19,
    width: 28,
    borderRadius: 15,
    backgroundColor: '#E83F3F',
    marginLeft: 165,
    marginTop: Platform.OS === 'ios' ? -95 : -95,
  },
  imgprofile: {
    height: 58,
    width: 58,
    marginTop: 5,
    borderRadius: 6,
  },
});
