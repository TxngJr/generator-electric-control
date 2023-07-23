import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LogoComponents from '../../components/LogoComponent'
import HelpSvg from '../../assets/svg/HelpSvg';
import PopupComponent from '../../components/PopupComponent';

type Props = {}

interface OTPFormData {
    OTP: string[];
}

const OTPScreen = (props: Props) => {
    const [formData, setFormData] = useState<OTPFormData>({
        OTP: ['', '', '', '', '', ''],
    });

    const handleChangeText = (index: number, value: string) => {
        // Create a copy of the existing formData
        const updatedFormData = { ...formData };
        // Update the OTP value at the specified index
        updatedFormData.OTP[index] = value;
        // Update the state with the new formData
        setFormData(updatedFormData);
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
            <Text style={[styles.text, { fontSize: 64, color: '#000000' }]} >กรอก OTP</Text>
            <View style={{flexDirection:'row',marginBottom:30}}>

                {formData.OTP.map((digit, index) => (
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
        </View>
    )
}

export default OTPScreen

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
        marginRight:10,
        textAlign:'center',
        textAlignVertical:'center'
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