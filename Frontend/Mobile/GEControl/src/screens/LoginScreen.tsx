import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LogoComponents from '../components/LogoComponent'
import { loginFormData } from '../interfaces/userInterface'

type Props = {}

const LoginScreen = (props: Props) => {
    const [formData, setFormData] = useState<loginFormData>({
        username: '',
        password: '',
    });

    const handleChangeText = (key: keyof loginFormData, value: string) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    const handleRegister = async () => {
        try {
            return null;
        } catch (error) {
            return null;
        }
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerLogo}>
                <LogoComponents size={200} />
            </View>
            <View>
                <Text style={[styles.text, { fontSize: 64, color: '#000000' }]} >เข้าสู่ระบบ</Text>
            </View>
            <TextInput
                style={styles.textInput}
                value={formData.username}
                onChangeText={(text) => handleChangeText('username', text)}
                placeholder="ชื่อผู้ใช้งาน"
            />
            <TextInput
                style={[styles.textInput, { marginBottom: 10 }]}
                value={formData.password}
                onChangeText={(text) => handleChangeText('password', text)}
                placeholder="รหัสผ่าน"
                secureTextEntry
            />
            <View style={{ alignItems: 'flex-end', marginBottom:10 }}>
                <TouchableOpacity onPress={handleRegister}>
                    <Text style={[styles.text, { fontSize: 24, color: '#000000' }]}>ลืมรหัสผ่าน</Text>
                    <View style={{ backgroundColor: '#000000', height: 2,position:'absolute',bottom:3,left:2,right:2 }} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.containerButton} onPress={handleRegister}>
                <Text style={[styles.text, { fontSize: 40, color: '#2E2D2D' }]}>เข้าสู่ระบบ</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity style={{}} onPress={handleRegister}>
                    <Text style={[styles.text, { fontSize: 24, color: '#000000' }]}>สมัครสมาชิก</Text>
                    <View style={{ backgroundColor: '#000000', height: 2,position:'absolute',bottom:3,left:2,right:2 }} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: '#F5F8FF'
    },
    containerLogo: {
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 5
    },
    textInput: {
        fontFamily: 'THSarabun Bold',
        color: '#000000',
        fontSize: 32,
        textAlignVertical: 'center',
        backgroundColor: '#FFFFFF',
        width: 'auto',
        // height: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 25
    },
    text: {
        fontFamily: 'THSarabun Bold',
    },
    containerButton: {
        backgroundColor: '#73CFF6',
        width: 'auto',
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});