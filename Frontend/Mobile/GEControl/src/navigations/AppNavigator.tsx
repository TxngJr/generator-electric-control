import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ListsDeviceScreen from '../screens/ListsDeviceScreen';

const Stack = createStackNavigator();

type Props = {}

const AppNavigator = (props: Props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListsDevice" component={ListsDeviceScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigator