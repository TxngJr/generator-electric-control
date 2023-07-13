import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

type Props = {
    textPlaceHolder:string;
}

const TextInPutComponent = (props: Props) => {
    return (
        <TextInput style={[styles.text, { fontSize: 32, color: '#818181',textAlignVertical:'center' },{ backgroundColor: '#FFFFFF', width: 'auto', height: 60, alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 10, borderRadius: 10,marginBottom:25 }]} placeholder={props.textPlaceHolder}/>
    )
}

export default TextInPutComponent

const styles = StyleSheet.create({
    text: {
        fontFamily: 'THSarabun Bold',
        color: '#000000'
    }
})