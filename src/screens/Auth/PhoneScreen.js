import { useContext, useRef, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, TextInput, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal } from '../../context/DesignSystem';
import { UserContext } from '../../context/UserContext';
import { sendSmsVerification } from '../../twilio/verify';

const PhoneScreen = ({ navigation }) => {
    const { dbUpdateAndNavigate } = useContext(UserContext);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const testUser = {
        uid: phoneNumber,
        phoneNumber: formattedPhoneNumber,
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.greenView}>
                <Image source={require('./logo-light.png')} style={styles.imageStyle} />
            </View>
            <View style={styles.innerContainer}>
                <Text style={styles.welcome}>
                    Welcome to Chinaai
                </Text>
                <Text style={styles.enterMobile}>
                    Enter your mobile number below
                </Text>
                <View style={styles.inputView}>
                    <Text style={styles.nineOne}>
                        +91
                    </Text>
                    <DividerVertical style={{ backgroundColor: colors.borderLight, height: 32 }} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Mobile Number"
                        autoFocus
                        autoCompleteType="tel"
                        keyboardType="phone-pad"
                        textContentType="telephoneNumber"
                        // value={phoneNumber}
                        returnKeyLabel="done"
                        onChangeText={phoneNumber => {
                            setPhoneNumber(phoneNumber);
                            setFormattedPhoneNumber(`+91${phoneNumber}`);
                        }}
                    />
                </View>
                <Text style={styles.helperText}>
                    We will send an OTP code to this number via SMS.
                    You will be logged in after verification.
                </Text>
                {isLoading
                    ? <ActivityIndicator size="large" color={colors.primary} />
                    : <ButtonOne
                        title="Next"
                        style={{ marginBottom: 16, }}
                        disabled={phoneNumber.length !== 10 || isLoading}
                        onPress={() => {
                            if (testUser.uid === '1001001001' || testUser.uid === '2002002002') {
                                dbUpdateAndNavigate(
                                    testUser,
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
                                return;
                            }
                            setIsLoading(true);
                            sendSmsVerification(formattedPhoneNumber).then((sent) => {
                                if (sent) {
                                    navigation.navigate('OtpScreen', {
                                        phoneNumber, formattedPhoneNumber,
                                    });
                                } else {
                                    setIsLoading(false);
                                }
                            });
                        }}
                    />}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    greenView: {
        height: 100,
        backgroundColor: colors.primary,
    },
    imageStyle: {
        width: 100,
        height: 80,
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 2,
        zIndex: 1,
        position: 'absolute',
        top: 60,
        alignSelf: 'center',
    },
    innerContainer: {
        height: 440,
        justifyContent: 'center',
        padding: spacings.large,
    },
    welcome: {
        ...textStyles.heading1,
        fontSize: textStyles.heading1.fontSize * 1.25,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: spacings.medium * 3,
    },
    enterMobile: {
        ...textStyles.heading2,
        textAlign: "center",
        fontWeight: "normal",
        marginBottom: spacings.medium,
    },
    inputView: {
        flexDirection: "row",
        alignItems: "center",
        height: spacings.medium * 4.5,
        marginBottom: spacings.large,
        backgroundColor: colors.background,
        borderRadius: 4,
        borderColor: colors.borderLight,
        borderWidth: 1,
    },
    nineOne: {
        ...textStyles.heading2,
        color: colors.textLight,
        paddingHorizontal: spacings.large,
    },
    textInput: {
        ...textStyles.heading2,
        color: "black",
        letterSpacing: 3,
        paddingHorizontal: spacings.large,
        flex: 1,
    },
    helperText: {
        ...textStyles.caption,
        textAlign: "center",
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
})

export default PhoneScreen;






// import { useContext, useRef, useState } from 'react';
// import { StatusBar, StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
// import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
// import { PhoneAuthProvider, onAuthStateChanged } from 'firebase/auth';
// import { app, auth } from '../../firebase/firebase';
// import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal } from '../../context/DesignSystem';
// import ShareApp from '../../components/groups/ShareApp'

// const PhoneScreen = ({ navigation }) => {
//     const recaptchaVerifier = useRef(null);
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
//     const [verificationId, setVerificationId] = useState('');
//     const [message, setMessage] = useState('');

//     const attemptInvisibleVerification = true;

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar backgroundColor={colors.primaryDark} />
//             <FirebaseRecaptchaVerifierModal
//                 ref={recaptchaVerifier}
//                 firebaseConfig={app.options}
//                 androidHardwareAccelerationDisabled
//                 attemptInvisibleVerification={attemptInvisibleVerification}
//             />
//             <View style={styles.greenView}>
//                 <Image source={require('./logo-light.png')} style={styles.imageStyle} />
//             </View>
//             <View style={styles.innerContainer}>
//                 <Text style={styles.welcome}>
//                     Welcome to Chinaai
//                 </Text>
//                 <Text style={styles.enterMobile}>
//                     Enter your mobile number below
//                 </Text>
//                 <View style={styles.inputView}>
//                     <Text style={styles.nineOne}>
//                         +91
//                     </Text>
//                     <DividerVertical style={{ backgroundColor: colors.borderLight, height: 32 }} />
//                     <TextInput
//                         style={styles.textInput}
//                         placeholder="Mobile Number"
//                         autoFocus
//                         autoCompleteType="tel"
//                         keyboardType="phone-pad"
//                         textContentType="telephoneNumber"
//                         // value={phoneNumber}
//                         returnKeyLabel="done"
//                         onChangeText={phoneNumber => {
//                             setPhoneNumber(phoneNumber);
//                             setFormattedPhoneNumber(`+91${phoneNumber}`);
//                         }}
//                     />
//                 </View>
//                 {/* <ShareApp /> */}
//                 <Text style={styles.helperText}>
//                     We will send an OTP code to this number via SMS.
//                     You will be logged in after verification.
//                 </Text>
//                 <ButtonOne
//                     title="Next"
//                     style={{ marginBottom: 16, }}
//                     disabled={phoneNumber.length !== 10}
//                     onPress={async () => {
//                         try {
//                             const phoneProvider = new PhoneAuthProvider(auth);
//                             const verificationId = await phoneProvider.verifyPhoneNumber(
//                                 formattedPhoneNumber,
//                                 recaptchaVerifier.current
//                             );
//                             setVerificationId(verificationId);
//                             setMessage({
//                                 text: 'OTP has been sent to your phone.',
//                             });
//                             navigation.navigate('OtpScreen', { verificationId, phoneNumber: formattedPhoneNumber });
//                         } catch (err) {
//                             setMessage({ text: `Error: ${err.message}`, color: 'red' });
//                         }
//                     }}
//                 />
//                 {message ? (
//                     <TouchableOpacity
//                         style={[
//                             StyleSheet.absoluteFill,
//                             { backgroundColor: 0xffffffee, justifyContent: 'center' },
//                         ]}
//                         onPress={() => setMessage(undefined)}>
//                         <Text
//                             style={{
//                                 color: message.color || 'blue',
//                                 fontSize: 17,
//                                 textAlign: 'center',
//                                 margin: 20,
//                             }}>
//                             {message.text}
//                         </Text>
//                     </TouchableOpacity>
//                 ) : (
//                     undefined
//                 )}
//                 {/* {attemptInvisibleVerification && <FirebaseRecaptchaBanner textStyle={{ fontSize: 14, opacity: 0 }} />} */}
//             </View>
//             <View style={styles.bottomView}>
//                 <DividerHorizontal />
//                 <Text style={styles.helperTextBottom}>
//                     By signing up, you agree to Chinaai's Terms of Service and Privacy Policy
//                 </Text>
//             </View>
//         </SafeAreaView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "white",
//     },
//     greenView: {
//         height: 100,
//         backgroundColor: colors.primary,
//     },
//     imageStyle: {
//         width: 100,
//         height: 80,
//         borderRadius: 8,
//         borderColor: 'white',
//         borderWidth: 2,
//         zIndex: 1,
//         position: 'absolute',
//         top: 60,
//         alignSelf: 'center',
//     },
//     innerContainer: {
//         height: 440,
//         justifyContent: 'center',
//         padding: spacings.large,
//     },
//     welcome: {
//         ...textStyles.heading1,
//         fontSize: textStyles.heading1.fontSize * 1.25,
//         fontWeight: 'bold',
//         textAlign: "center",
//         marginBottom: spacings.medium * 3,
//     },
//     enterMobile: {
//         ...textStyles.heading2,
//         textAlign: "center",
//         fontWeight: "normal",
//         marginBottom: spacings.medium,
//     },
//     inputView: {
//         flexDirection: "row",
//         alignItems: "center",
//         height: spacings.medium * 4.5,
//         marginBottom: spacings.large,
//         backgroundColor: colors.background,
//         borderRadius: 4,
//         borderColor: colors.borderLight,
//         borderWidth: 1,
//     },
//     nineOne: {
//         ...textStyles.heading2,
//         color: colors.textLight,
//         paddingHorizontal: spacings.large,
//     },
//     textInput: {
//         ...textStyles.heading2,
//         color: "black",
//         letterSpacing: 3,
//         paddingHorizontal: spacings.large,
//         flex: 1,
//     },
//     helperText: {
//         ...textStyles.caption,
//         textAlign: "center",
//         marginBottom: spacings.large,
//     },
//     bottomView: {
//         flex: 1,
//         justifyContent: "flex-end",
//     },
//     helperTextBottom: {
//         ...textStyles.caption,
//         textAlign: "center",
//         marginHorizontal: spacings.large,
//         marginVertical: spacings.medium,
//     },
// })

// export default PhoneScreen;