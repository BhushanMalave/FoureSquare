import React,{useState,useEffect} from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { aboutUsApi } from '../authorization/Auth';



export const AboutUs = ({navigation}) => {

  const [data,setData]= useState(null);

  const call = async () =>{
    const res = await aboutUsApi();
    setData(res);
  }

  useEffect(() => {
    call();
  }, []);

  return (
    <ScrollView contentContainerStyle={{flex:1}}>
      <View style={styles.topbar}>
        <SafeAreaView>
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 20 : 30,
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-between',
            }}>
              <TouchableOpacity onPress={() => {navigation.goBack(); 
              }}>
            <Image
              style={styles.menu}
              source={require('../assets/images/back_icon.png')}
            />
            </TouchableOpacity>
            <Text style={{fontFamily:'Avenir Book',fontSize:26,color:'#fff',marginTop:-5,}}>
               About us
            </Text>
            <Icon name="home-outline" size={28} color="#fff" onPress={()=> {navigation.navigate('HomeStack')}} />
            </View>
        </SafeAreaView>
      </View>
      <View style={{flex:1,backgroundColor:'white'}}>
        { data ? (
           <View style={{flex:1,marginHorizontal:15,marginVertical:15,}}>
           <Text style={{fontFamily:'Avenir Book',fontSize:18,color:'#7A7A7A',letterSpacing:0.9,lineHeight:28,textAlign:'justify'}}>
              {data}
           </Text>
         </View>
        ) : (
          <ActivityIndicator size="large" color="#7A7A7A" />

        )

        }
     
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    topbar: {
        height:Platform.OS === 'ios' ?  110:80,
        backgroundColor: '#370F24',
        
      },
      menu:{
        height:22,
        width:22
      }
});
