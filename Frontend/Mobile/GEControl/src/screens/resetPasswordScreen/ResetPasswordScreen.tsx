import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LogoComponents from '../../components/LogoComponent'
import HelpSvg from '../../assets/svg/HelpSvg';
import PopupComponent from '../../components/PopupComponent';

type Props = {}

interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

const ResetPasswordScreen = (props: Props) => {
    const [formData, setFormData] = useState<ResetPasswordFormData>({
        password: '',
        confirmPassword: '',
    });

    const handleChangeText = (key: keyof ResetPasswordFormData, value: string) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    const handleRegister = async () => {
        // Perform your API call here using the formData object
        try {
            // Make your API call and handle the response
            // Example code using fetch:
            const response = await fetch('YOUR_API_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Registration successful
                Alert.alert('Registration Successful');
            } else {
                // Registration failed
                Alert.alert('Registration Failed');
            }
        } catch (error) {
            // Error handling
            Alert.alert('Error', 'An error occurred while registering.');
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.containerLogo}>
                <LogoComponents size={200} />
            </View>
            <Text style={[styles.text, { fontSize: 64, color: '#000000' }]} >กรอกรหัสผ่านใหม่</Text>
            <TextInput
                style={styles.textInput}
                value={formData.password}
                onChangeText={(text) => handleChangeText('password', text)}
                placeholder="รหัสผ่านใหม่"
            />
            <TextInput
                style={styles.textInput}
                value={formData.confirmPassword}
                onChangeText={(text) => handleChangeText('confirmPassword', text)}
                placeholder="ยืนยันรหัสผ่าน"
            />
            <TouchableOpacity style={styles.containerButton} onPress={handleRegister}>
                <Text style={[styles.text, { fontSize: 40, color: '#2E2D2D' }]}>ส่ง</Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center', marginTop: 15 }}>
                <TouchableOpacity style={{}} onPress={handleRegister}>
                    <Text style={[styles.text, { fontSize: 24, color: '#000000' }]}>กลับเข้าสู่ระบบ</Text>
                    <View style={{ backgroundColor: '#000000', height: 2, position: 'absolute', bottom: 3, left: 2, right: 2 }} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ResetPasswordScreen

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