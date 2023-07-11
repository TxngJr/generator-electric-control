import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

type Props = {}

const App = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 50, flexDirection: 'row' }}>
        <TouchableOpacity style={{ marginHorizontal: 10, backgroundColor: 'blue', width: 100, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
          <Text style={{ paddingHorizontal: 10 }}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 10, backgroundColor: 'blue', width: 100, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
          <Text style={{ paddingHorizontal: 10 }}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginHorizontal: 10, marginBottom: 10, backgroundColor: 'blue', width: 100, height: 60, alignItems: 'center', justifyContent: 'center', borderRadius: 20 }}>
          <Text style={{ paddingHorizontal: 10 }}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: 330, height: 700, backgroundColor: 'yellow', alignSelf: 'center' }}>
        <Text style={{ alignItems: 'center', justifyContent: 'center' }}>App</Text>
      </View>
    </View>
  )
}

export default App

const styles = StyleSheet.create({})