import React, { useContext, useEffect } from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Background} from '../components/Background';
import {WhiteLog} from '../components/WhiteLog';
import {loginStyles} from '../theme/loginTheme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}


export const LoginScreen = ({navigation}: Props) => {

  const {signIn, errorMessage, removeError} = useContext(AuthContext);

  const {email, password, onChange} = useForm({
    email: '',
    password: ''
  });

  useEffect(() => {
    if(errorMessage.length === 0) return;
    Alert.alert('Login incorrecto', errorMessage, [{text: 'OK', onPress: removeError}]);
  }, [errorMessage])
  

  const onLogin = () => {
    Keyboard.dismiss();
    signIn({correo: email, password});
  }

  return (
    <>
      {/* Background */}
      <Background />

      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={(Platform.OS === 'ios') ? 'padding': 'height' }
        
      >
        <View style={loginStyles.formContainer}>
          {/* Keyboard avoid view */}
          <WhiteLog />

          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email:</Text>
          <TextInput
            placeholder="Ingrese su Email"
            placeholderTextColor="rgba(255,255,255, 0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            //TODO: onChange, value
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Text style={loginStyles.label}>Contraseña:</Text>

          <TextInput
            placeholder="*******"
            placeholderTextColor="rgba(255,255,255, 0.4)"
            keyboardType="email-address"
            underlineColorAndroid="white"
            secureTextEntry
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            //TODO: onChange, value
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}

            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Boton login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={loginStyles.button}
              onPress={onLogin}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          {/* Crear una nueva cuenta */}

          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')}>
              <Text style={loginStyles.buttonText}>Nueva Cuenta </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
