import React from 'react';
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
  Platform
} from 'react-native';

export const Login = () => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={{flex: 1}}>
            <SafeAreaView>
            <View style={styles.viewTop}>
             <Text style={styles.textskip}>Skip {">"}</Text>
            </View>
            <View style={{alignItems:'center',marginTop:30,}}>
            <Image source={require('../assets/images/logo.png')} style={styles.logo}/>
            </View>
            </SafeAreaView>
          
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    viewTop:{
        flexDirection:'row',
        marginTop:Platform.OS === 'android' ? 30 :10,
        justifyContent:'flex-end',
        marginRight:20,
    },
    textskip:{
        fontFamily:'Avenir Book',
        fontSize:28,
        color:'#FFFFFF',
    },
    iconback:{
        marginTop: Platform.OS === 'android' ? 15 : 10,
        marginLeft:10,
    },
    logo:{
        
    }

})
