import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ResetPasswordNavigator from './ResetPasswordNavigator';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

type Props = {}

const AuthNavigator = (props: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login" >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ResetPasswordNavigator" component={ResetPasswordNavigator} />
      <Stack.Screen name="AppNavigator" component={AppNavigator} />
    </Stack.Navigator>
  )
}

export default AuthNavigator