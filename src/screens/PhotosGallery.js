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
  Platform,
  TextInput,
  Pressable,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReviewViewComponent} from '../components/ReviewComponent';

export const PhotosGallery = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  return (
    <View style={{flex: 1}}>
      <View style={styles.topbar}>
        <SafeAreaView>
          <View
            style={{
              marginTop: Platform.OS === 'ios' ? 20 : 40,
              flexDirection: 'row',
              marginHorizontal: 20,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                style={styles.menu}
                source={require('../assets/images/back_icon.png')}
              />
            </TouchableOpacity>

            <Text
              style={{
                fontFamily: 'Avenir Book',
                fontSize: 22,
                color: '#fff',
                marginTop: -5,
              }}>
              Attil
            </Text>
            <Icon name="camera-plus-outline" size={24} color="#fff" />
          </View>
        </SafeAreaView>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: 'black'}}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPhoto');
            }}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{
                height: Platform.OS === 'ios' ? 123 : 135,
                width: Platform.OS === 'ios' ? 123: 135,
                marginVertical: 3,
                marginHorizontal:3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPhoto');
            }}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{
                height: Platform.OS === 'ios' ? 123 : 135,
                width: Platform.OS === 'ios' ? 123 : 135,
                marginVertical: 3,
                marginHorizontal:3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPhoto');
            }}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{
                height: Platform.OS === 'ios' ? 123 : 135,
                width: Platform.OS === 'ios' ? 123 : 135,
                marginVertical: 3,
                marginHorizontal:3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPhoto');
            }}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{
                height: Platform.OS === 'ios' ? 123 : 135,
                width: Platform.OS === 'ios' ? 123: 135,
                marginVertical: 3,
                marginHorizontal:3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPhoto');
            }}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{
                height: Platform.OS === 'ios' ? 123 : 135,
                width: Platform.OS === 'ios' ? 123 : 135,
                marginVertical: 3,
                marginHorizontal:3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPhoto');
            }}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{
                height: Platform.OS === 'ios' ? 123 : 135,
                width: Platform.OS === 'ios' ? 123 : 135,
                marginVertical: 3,
                marginHorizontal:3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPhoto');
            }}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{
                height: Platform.OS === 'ios' ? 123 : 135,
                width: Platform.OS === 'ios' ? 123: 135,
                marginVertical: 3,
                marginHorizontal:3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPhoto');
            }}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{
                height: Platform.OS === 'ios' ? 123 : 135,
                width: Platform.OS === 'ios' ? 123 : 135,
                marginVertical: 3,
                marginHorizontal:3,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ViewPhoto');
            }}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{
                height: Platform.OS === 'ios' ? 123 : 135,
                width: Platform.OS === 'ios' ? 123 : 135,
                marginVertical: 3,
                marginHorizontal:3,
              }}
            />
          </TouchableOpacity>
        

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height: Platform.OS === 'ios' ? 110 : 100,
    backgroundColor: '#370F24',
  },
  menu: {
    height: 22,
    width: 22,
  },
  container: {
    flexDirection: 'row',
    flex: 1,
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    
  },
});
