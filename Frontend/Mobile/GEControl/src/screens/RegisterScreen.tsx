import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LogoComponents from '../components/LogoComponent'
import { registerFormData } from '../interfaces/userInterface'
import { register } from '../apis/userAPI'

type Props = {
    navigation:any
}


const RegisterScreen = (props: Props) => {
    const [formData, setFormData] = useState<registerFormData>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChangeText = (key: keyof registerFormData, value: string) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    const handleRegister = async () => {
        try {
            register(formData);
        } catch (error) {
            return null;
        }
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerLogo}>
                <LogoComponents size={200} />
            </View>
            <View style={{height:65}}>
                <Text style={[styles.text, { fontSize: 64, color: '#000000' }]} >สมัครสมาชิก</Text>
            </View>
            <View style={{ paddingLeft: 10 }}>
                <Text style={styles.text}>
                    {(formData.username.length >= 10 ? ' ' : 'ชื่อสั้นเกินไป')}
                </Text>
            </View>
            <TextInput
                style={styles.textInput}
                value={formData.username}
                onChangeText={(text) => handleChangeText('username', text)}
                placeholder="ชื่อผู้ใช้งาน"
            />
            <View style={{ paddingLeft: 10 }}>
                <Text style={styles.text}>
                    {(formData.email.length >= 5 ? formData.email.endsWith('@gmail.com') ? ' ' : 'กรุณากรอก@gmail.com' : 'กรุณากรอกอีเมล')}
                </Text>
            </View>
            <TextInput
                style={styles.textInput}
                value={formData.email}
                onChangeText={(text) => handleChangeText('email', text)}
                placeholder="อีเมล                    @gmail.com"
            />
            <View style={{ paddingLeft: 10 }}>
                <Text style={styles.text}>
                    {(formData.password.length >= 8 ? ' ' : 'รหัสผ่านสั้นเกินไป')}
                </Text>
            </View>
            <TextInput
                style={[styles.textInput]}
                value={formData.password}
                onChangeText={(text) => handleChangeText('password', text)}
                placeholder="รหัสผ่าน"
                secureTextEntry
            />
            <View style={{ paddingLeft: 10 }}>
                <Text style={styles.text}>
                    {( formData.password == formData.confirmPassword ? ' ' : 'รหัสผ่านไม่ตรงกัน')}
                </Text>
            </View>
            <TextInput
                style={styles.textInput}
                value={formData.confirmPassword}
                onChangeText={(text) => handleChangeText('confirmPassword', text)}
                placeholder="รหัสผ่านอีกครั้ง"
                placeholderTextColor={'#818181'}
                secureTextEntry
            />
            <TouchableOpacity style={[styles.containerButton,{marginTop:10}]} onPress={handleRegister} disabled={!(formData.username.length >= 10 && formData.email.length >= 5 && formData.email.endsWith('@gmail.com') && formData.password == formData.confirmPassword && formData.password.length >= 8)}>
                <Text style={[styles.text, { fontSize: 40, color: '#2E2D2D' }]}>สมัครสมาชิก</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity style={{}} onPress={() => props.navigation.navigate('Login')}  >
                    <Text style={[styles.text, { fontSize: 24, color: '#000000' }]}>เข้าสู่ระบบ</Text>
                    <View style={{ backgroundColor: '#000000', height: 2, position: 'absolute', bottom: 1, left: 2, right: 2 }} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: '#F5F8FF'
    },
    containerLogo: {
        alignSelf: 'center',
        marginTop: 15,
    },
    textInput: {
        fontFamily: 'THSarabun Bold',
        color: '#000000',
        fontSize: 28,
        textAlignVertical: 'center',
        backgroundColor: '#FFFFFF',
        width: 'auto',
        // height: 60,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingLeft: 10,
        borderRadius: 10,
        marginBottom: 5
    },
    text: {
        fontFamily: 'THSarabun Bold',
        color: '#000000',
        fontSize: 16
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