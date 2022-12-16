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
import {Formik} from 'formik';

export const Feedback = ({navigation}) => {
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
            <Image
              style={styles.menu}
              source={require('../assets/images/back_icon.png')}
            />
            <Text
              style={{
                fontFamily: 'Avenir Book',
                fontSize: 26,
                color: '#fff',
                marginTop: -5,
              }}>
              Feedback
            </Text>
            <Icon name="home-outline" size={28} color="#fff" />
          </View>
        </SafeAreaView>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{marginHorizontal: 15, marginVertical: 15}}>
          <Text
            style={{fontFamily: 'Avenir Book', fontSize: 20, color: 'black'}}>
            Write your feedback
          </Text>
        </View>
        <Formik
          initialValues={{}}
          onSubmit={values => {
            console.log(values);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => (
            <>
              <View style={{marginHorizontal: 15, marginVertical: 15, flex: 1}}>
                <View style={styles.body}>
                  <TextInput
                    multiline={true}
                    numberOfLines={15}
                    name="notes"
                    onChangeText={handleChange('notes')}
                    onBlur={handleBlur('notes')}
                    value={values.notes}
                    style={styles.textNotes}
                    textAlignVertical='top'
                  />
                </View>
              </View>

              <View style={styles.buttonbody}>
                <Pressable onPress={handleSubmit} style={styles.button}>
                  <Text style={styles.buttontext}>Submit</Text>
                </Pressable>
              </View>
            </>
          )}
        </Formik>
      </View>
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
  textNotes: {
    height: 180,
    borderWidth: 2,
    borderRadius: 4,
    backgroundColor: '#FFF',
    borderColor: '#D7D7D7',
    color: '#3C4858',
    fontSize:16,
    paddingHorizontal:10,
    paddingVertical:15,
  },
  button: {
    height: 60,
    backgroundColor: '#301934',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonbody: {
    bottom: 10,
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
