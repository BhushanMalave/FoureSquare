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
import {Formik} from 'formik';
import * as yup from 'yup';
import {TextField} from 'rn-material-ui-textfield';

export const VerifyOtp = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const width2 = width < height ? -19.5 : -45;
  const signinValidationSchema = yup.object().shape({
    password: yup
      .string()
      .matches(/\d\d\d\d\d/)
      .max(5),
  });

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/images/background.png')}
        style={{flex: 1}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SafeAreaView style={{flex: 1, marginHorizontal: 30}}>
            <View style={{alignItems: 'center', marginTop: Platform.OS === 'ios' ?  40 :70}}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
              />
              <Text style={styles.text}>We have sent you an OTP.</Text>
              <Text style={styles.text1}>Please enter it below.</Text>
            </View>
            <View style={styles.viewTextInput}>
              <Formik
                validationSchema={signinValidationSchema}
                initialValues={{otp: ''}}
                onSubmit={async (values, {resetForm}) => {
                  console.log(values);
                  navigation.navigate('Forgot Password')
                  resetForm({initialValues: ''});
                }}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  isValid,
                }) => (
                  <>
                    <TextField
                      label="Enter OTP"
                      name="otp"
                      keyboardType='number-pad'
                      formatText={this.formatText}
                      onSubmitEditing={this.onSubmit}
                      ref={this.fieldRef}
                      textColor="#FFFFFF"
                      tintColor="#b5abab"
                      baseColor="#b5abab"
                      lineWidth={1}
                      autoCapitalize="none"
                      labelFontSize={18}
                      labelOffset={{y1: -5, x1: width2}}
                      onChangeText={handleChange('otp')}
                      onBlur={handleBlur('otp')}
                      value={values.otp}
                      autoCorrect={false}
                      style={{
                        fontFamily: 'Avenir Book',
                        fontSize: 22,
                        marginBottom: 5,
                        textAlign: 'center',
                        marginRight: 0,
                        marginTop: 18,
                        height:30,
                      }}
                      labelTextStyle={{
                        textAlign: 'center',
                        color: '#b5abab',
                        fontFamily: 'Avenir Book',
                        alignSelf: 'center',
                        height: 50,
                        paddingTop: Platform.OS === 'ios' ? 2 : 4,
                      }}
                      containerStyle={
                        {
                          // height:200,
                          // borderWidth:1,
                        }
                      }
                    />

                    <TouchableOpacity style={{}}>
                      <Text style={styles.text2}>Resend OTP</Text>
                    </TouchableOpacity>
                    <View style={styles.container}>
                      <TouchableOpacity
                        onPress={handleSubmit}
                        style={styles.button}
                        disabled={!isValid}>
                        <Text style={styles.textbutton}>Get in !</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  viewTop: {
    flexDirection: 'row',
    marginTop: Platform.OS === 'android' ? 30 : 10,
    justifyContent: 'flex-end',
  },
  viewTextInput: {
    marginTop: 40,
  },
  textskip: {
    fontFamily: 'Avenir Book',
    fontSize: 24,
    color: '#FFFFFF',
  },
  iconback: {
    marginTop: Platform.OS === 'android' ? 15 : 10,
    marginLeft: 10,
  },
  logo: {
    height: 28,
    width: 200,
    marginTop: 60,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#fff',
    marginTop: 90,
    fontSize: 24,
  },
  text1: {
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#fff',
    marginTop: 0,
    fontSize: 24,
  },
  text2: {
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#fff',
    marginTop: 30,
    fontSize: 20,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom:30,
  },
  button: {
    backgroundColor: 'transparent',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#FFF',
    width: '100%',
  },
  textbutton: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#FFFFFF',
  },
  textacc: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Avenir Book',
    color: '#FFFFFF',
    marginTop: 40,
  },
});
