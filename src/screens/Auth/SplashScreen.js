import React, { useContext, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../context/UserContext';
import { ActivityIndicator, StatusBar, StyleSheet, Text, TextInput, View, SafeAreaView, Image } from 'react-native';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal } from '../../context/DesignSystem';



const SplashScreen = ({ navigation }) => {
    const { dbUpdateAndNavigate } = useContext(UserContext);

    useEffect(() => {
        AsyncStorage.getItem('userToken').then(token => {
            if (token) {
                const storageUser = JSON.parse(token);
                dbUpdateAndNavigate(
                    storageUser,
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
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'PhoneScreen' }]
                });
            }
        });

    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.greenView}>
                <Image source={require('./logo-light.png')} style={styles.imageStyle} />
            </View>
            <View style={styles.innerContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
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
        flex: 1,
        justifyContent: 'space-evenly',
        padding: spacings.large,
    },

})

export default SplashScreen;