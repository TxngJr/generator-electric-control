import { StyleSheet} from 'react-native'
import React from 'react'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import SendCodeOnGmailScreen from './screens/resetPasswordScreen/SendCodeOnGmailScreen'
import OTPScreen from './screens/resetPasswordScreen/OTPScreen'
import ResetPasswordScreen from './screens/resetPasswordScreen/ResetPasswordScreen'
import ListsDeviceScreen from './screens/ListsDeviceScreen'

type Props = {}

const App = (props: Props) => {
  return (
    <ListsDeviceScreen/>
  )
}

export default App

const styles = StyleSheet.create({})