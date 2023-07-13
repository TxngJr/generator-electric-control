import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {
    size: Number|any;
}

const LogoComponents = (props: Props) => {
    return (
        <View>
            <Image
                source={require('./../assets/Images/logo.png')}
                style={{ width: props.size, height: props.size }}
            />
        </View>
    )
}

export default LogoComponents

const styles = StyleSheet.create({})