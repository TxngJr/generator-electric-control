import { StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './navigations/AppNavigator';
import AuthNavigator from './navigations/AuthNavigator';
type Props = {}

const App = (props: Props) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLogin(true);
      }
      setLoading(false);
    }
    checkToken();

  }, []);
  return (
    <NavigationContainer>
      {
        isLogin ?
          <AppNavigator /> : <AuthNavigator />
      }
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})