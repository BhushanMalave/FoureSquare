import React from 'react';
import {useState} from 'react';
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

import ImagePicker from 'react-native-image-crop-picker';

export const AddReview = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const handleText = string => {
    setText(string);
  };
  const handleSubmit = () => {
    console.log(text);
    console.log(image);
    console.log(profilePhoto);
  };

  const changeProfileImageFromLibrary = () => {
    ImagePicker.openPicker({
      width: 110,
      height: 110,
      cropping: true,
    }).then(img => {
      setImage(img.path);
      const {filename, mime, path} = img;
      setProfilePhoto({filename, mime, path});
    });
  };
  const changeProfileImageFromCamera = () => {
    ImagePicker.openCamera({
      width: 110,
      height: 110,
      cropping: true,
    }).then(img => {
      setImage(img.path);
      const {filename, mime, path} = img;
      setProfilePhoto({filename, mime, path});
    });
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <View style={styles.topbar}>
          <SafeAreaView>
            <View
              style={{
                marginTop: Platform.OS === 'ios' ? 20 : 30,
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
                  fontSize: 26,
                  color: '#fff',
                  marginTop: -5,
                  marginRight:
                    width > height
                      ? Platform.OS === 'ios'
                        ? 300
                        : 370
                      : Platform.OS === 'ios'
                      ? 105
                      : 120,
                }}>
                AddReview
              </Text>
            </View>
          </SafeAreaView>
        </View>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <View style={{marginHorizontal: 15, marginVertical: 15}}>
            <Text
              style={{fontFamily: 'Avenir Book', fontSize: 20, color: 'black'}}>
              Write Review
            </Text>
          </View>

          <View style={{marginHorizontal: 15, marginVertical: 0, flex: 1}}>
            <View style={styles.body}>
              <TextInput
                multiline={true}
                numberOfLines={15}
                name="notes"
                onChangeText={handleText}
                style={styles.textNotes}
                textAlignVertical="top"
              />
            </View>
          </View>
        </View>
        <Text
          style={{
            marginHorizontal: 15,
            marginVertical: 15,
            color: '#351347',
            fontFamily: 'Avenir Book',
            fontSize: 20,
          }}>
          Add a photos to your review
        </Text>
        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 0,
            flex: 1,
            flexDirection: 'row',
          }}>
          {image !== null  && (
            <Image
              source={{uri: image}}
              style={{height: 90, width: 90, borderRadius: 10,marginRight:20,}}
            />
          )}
          <TouchableOpacity onPress={() => changeProfileImageFromLibrary()}>
            <Image
              source={require('../assets/images/images.jpeg')}
              style={{height: 90, width: 90,}}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.buttonbody}>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttontext}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height: Platform.OS === 'ios' ? 110 : 80,
    backgroundColor: '#370F24',
  },
  menu: {
    height: 22,
    width: 22,
  },
  textNotes: {
    height: 200,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#FFF',
    borderColor: '#D7D7D7',
    color: '#3C4858',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  button: {
    height: 60,
    backgroundColor: '#301934',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonbody: {
    bottom: Platform.OS === 'ios' ? 0 : 2,
    position: 'absolute',
    width: '100%',
  },
  buttontext: {
    height: 28,
    width: 80,
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
  },
});
