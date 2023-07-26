import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LogoComponents from '../../components/LogoComponent'
import HelpSvg from '../../assets/svg/HelpSvg';
import PopupComponent from '../../components/PopupComponent';
import { checkCodeResetPasswordFormData } from '../../interfaces/userInterface';
import { checkCodeResetPassword } from '../../apis/userAPI';

type Props = {}

const CheckOTPScreen = (props: Props) => {
    const [formData, setFormData] = useState<checkCodeResetPasswordFormData>({
        email: '',
        code: ['', '', '', '', '', ''],
    });

    const handleChangeText = (index: number, value: string) => {
        const updatedFormData = { ...formData };
        updatedFormData.code[index] = value;
        setFormData(updatedFormData);
    };

    const handleRegister = async () => {
        try {
            checkCodeResetPassword(formData);
        } catch (error) {
            return null;
        }
    };
    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerLogo}>
                <LogoComponents size={200} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.text, { fontSize: 64, color: '#000000' }]} >กรอก OTP</Text>
                <View style={{ marginLeft: 10 }}>
                        <PopupComponent
                            text={'กรอกเลขที่ส่งไปทาง Gmail'}
                            width={240}
                        >
                            <HelpSvg
                                size={30}
                                color='#000000'
                            />
                        </PopupComponent>
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 30 }}>

                {formData.code.map((digit, index) => (
                    <TextInput
                        key={index}
                        style={styles.textInput}
                        value={digit}
                        onChangeText={(text) => handleChangeText(index, text)}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>

            <TouchableOpacity style={styles.containerButton} onPress={handleRegister}>
                <Text style={[styles.text, { fontSize: 40, color: '#2E2D2D' }]}>ยืนยัน</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default CheckOTPScreen

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
        fontSize: 30,
        backgroundColor: '#FFFFFF',
        width: 50,
        borderRadius: 10,
        marginRight: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
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