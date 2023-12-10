import React, { useContext, useEffect } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import { loginStyles } from '../theme/loginTheme'
import { WhiteLog } from '../components/WhiteLog'
import { TextInput } from 'react-native-gesture-handler'
import { useForm } from '../hooks/useForm'
import { StackScreenProps } from '@react-navigation/stack'
import { AuthContext } from '../context/AuthContext'

interface Props extends StackScreenProps<any, any> {}

export const RegisterScreen = ({navigation}: Props) => {
  
  const {signUp, errorMessage, removeError} = useContext(AuthContext);

  const {name, email, password, onChange} = useForm({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if(errorMessage.length === 0) return;
    Alert.alert('Login incorrecto', errorMessage, [{text: 'OK', onPress: removeError}]);
  }, [errorMessage])

  const onRegister = () => {
    Keyboard.dismiss();
    signUp({nombre: name, correo: email, password})
  }
  
  return (
    
    <>
      {/* Background */}
      <KeyboardAvoidingView
        style={{flex: 1, backgroundColor: '#5856D6'}}
        behavior={(Platform.OS === 'ios') ? 'padding': 'height' }
        
      >
        <View style={loginStyles.formContainer}>
          {/* Keyboard avoid view */}
          <WhiteLog />

          <Text style={loginStyles.title}>Registro</Text>
          <Text style={loginStyles.label}>Nombre:</Text>
          <TextInput
            placeholder="Ingrese su Nombre"
            placeholderTextColor="rgba(255,255,255, 0.4)"
            underlineColorAndroid="white"
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIOS,
            ]}
            selectionColor="white"
            //TODO: onChange, value
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
            autoCapitalize="words"
            autoCorrect={false}
          />

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
            onSubmitEditing={onRegister}
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
            onSubmitEditing={onRegister}

            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Boton login */}
          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity 
              activeOpacity={0.8} 
              style={loginStyles.button}
              onPress={onRegister}
            >
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>
          </View>

          {/* Crear una nueva cuenta */}

          <TouchableOpacity
            onPress={() => navigation.replace('LoginScreen')}
            activeOpacity={0.8}
            style={loginStyles.buttonReturn}
          >
            <Text style={loginStyles.buttonText}>Login</Text>

          </TouchableOpacity>
          
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
