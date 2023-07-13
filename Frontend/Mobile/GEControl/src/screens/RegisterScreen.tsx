import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LogoComponents from '../components/LogoComponent'
import TextInPutComponent from '../components/TextInPutComponent'

type Props = {}

const RegisterScreen = (props: Props) => {
    return (
        <View style={{ paddingHorizontal: 30, flex: 1, backgroundColor: '#F5F8FF' }}>
            <View style={{ alignSelf: 'center', marginTop: 40, marginBottom: 10 }}>
                <LogoComponents size={250} />
            </View>
            <Text style={[styles.text, { fontSize: 64 }]}>สมัครสมาชิก</Text>
            <View>
                <TextInPutComponent textPlaceHolder='ชื่อผู้ใช้งาน' />
                <TextInPutComponent textPlaceHolder='อีเมล' />
                <TextInPutComponent textPlaceHolder='รหัสผ่าน' />
                <TextInPutComponent textPlaceHolder='รหัสผ่านอีกครั้ง' />
            </View>
            <TouchableOpacity>
                <Text>
                    สมัครสมาชิก
                </Text>
            </TouchableOpacity>

        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    text: {
        fontFamily: 'THSarabun Bold',
        color: '#000000'
    }
})