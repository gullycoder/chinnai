import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';
import React, { useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../context/UserContext';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerHorizontal } from '../../context/DesignSystem';
import { checkVerification } from '../../twilio/verify';

const OtpScreen = ({ route, navigation }) => {
    const { dbUpdateAndNavigate } = useContext(UserContext);
    const { phoneNumber, formattedPhoneNumber } = route.params;
    const [invalidCode, setInvalidCode] = useState(false);
    const [code, setCode] = useState('');
    const user = {
        uid: phoneNumber,
        phoneNumber: formattedPhoneNumber,
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.innerContainer}>
                <Text style={styles.enterOtp}>
                    Enter OTP
                </Text>
                <Text style={styles.otpSent}>
                    We have sent an OTP on {formattedPhoneNumber}
                </Text>
                <TextInput
                    style={styles.textInput}
                    autoFocus
                    autoComplete="sms-otp"
                    placeholder="4-digit OTP code"
                    keyboardType="number-pad"
                    onChangeText={setCode}
                />
                {invalidCode && <Text style={styles.error}>Incorrect OTP</Text>}

                <ButtonOne
                    title="Submit"
                    disabled={code.length !== 4}
                    onPress={() => {
                        checkVerification(formattedPhoneNumber, code).then(async (success) => {
                            if (success) {
                                const userToken = { uid: user.uid, phoneNumber: user.phoneNumber };
                                await AsyncStorage.setItem('userToken', JSON.stringify(userToken));
                                dbUpdateAndNavigate(
                                    user,
                                    () => navigation.reset({
                                        index: 0,
                                        routes: [{
                                            name: 'WorkerTab',
                                            params:
                                                { screen: 'GroupsStack' }
                                        }],
                                    }),
                                    () => navigation.reset({
                                        index: 0,
                                        routes: [{
                                            name: 'ContractorTab',
                                            params:
                                                { screen: 'GroupsStack' }
                                        }],
                                    }),
                                    () => navigation.reset({
                                        index: 0,
                                        routes: [{
                                            name: 'IncompleteRegistrationStack',
                                            params:
                                                { screen: 'CreateEditCardScreen' }
                                        }],
                                    }),
                                    () => navigation.reset({
                                        index: 0,
                                        routes: [{
                                            name: 'IncompleteRegistrationStack',
                                            params:
                                                { screen: 'BeginCardScreen' }
                                        }],
                                    }),
                                    () => navigation.reset({
                                        index: 0,
                                        routes: [{
                                            name: 'IncompleteRegistrationStack',
                                            params:
                                                { screen: 'SelectUserTypeScreen' }
                                        }],
                                    })
                                );
                            } else {
                                setInvalidCode(true);
                            }
                        });
                    }}
                />
            </View>
            <View style={styles.bottomView}>
                <DividerHorizontal />
                <Text style={styles.helperTextBottom}>
                    By signing up, you agree to Chinaai's Terms of Service and Privacy Policy
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default OtpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    innerContainer: {
        justifyContent: "center",
        height: 300,
        padding: spacings.large,
    },
    enterOtp: {
        ...textStyles.heading1,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: spacings.medium * 2,
    },
    otpSent: {
        ...textStyles.heading3,
        textAlign: "center",
        fontWeight: "normal",
        marginBottom: spacings.medium,
    },
    textInput: {
        ...textInputStyles.large,
        fontWeight: "bold",
        textAlign: "center",
        letterSpacing: 4,
        marginBottom: spacings.large,
    },
    bottomView: {
        flex: 1,
        justifyContent: "flex-end",
    },
    helperTextBottom: {
        ...textStyles.caption,
        textAlign: "center",
        marginHorizontal: spacings.large,
        marginVertical: spacings.medium,
    },
    error: {
        ...textStyles.caption,
        textAlign: "center",
        color: colors.error,
        marginBottom: spacings.medium,
    }
})