import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ResetPasswordScreen from '../screens/resetPasswordScreen/ResetPasswordScreen';
import CheckOTPScreen from '../screens/resetPasswordScreen/CheckOTPScreen';
import SendCodeOnGmailScreen from '../screens/resetPasswordScreen/SendCodeOnGmailScreen';

const Stack = createStackNavigator();

type Props = {}

const ResetPasswordNavigator = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SendCodeOnGmail" component={SendCodeOnGmailScreen} />
      <Stack.Screen name="CheckOTP" component={CheckOTPScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </Stack.Navigator>
  )
}

export default ResetPasswordNavigator