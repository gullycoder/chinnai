import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { ButtonOne, ButtonOneUnfilled, colors, iconSizes, spacings, textStyles } from '../../context/DesignSystem';
import Card from '../../components/card/Card';

const BeginCardScreen = ({ navigation }) => {
    const { user, updateBeginCard, updateFlowComplete } = useContext(UserContext);


    return (
        <SafeAreaView style={styles.safeContainer}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.container}>
                <View>
                    <Text style={styles.headingText}>
                        Let's make your Visiting Card
                    </Text>
                    {user.userType === 'worker' &&
                        <Text style={styles.subheadingText}>
                            This will be your Resume/Identity-Card that helps companies and contractors know you
                        </Text>}
                    {user.userType === 'contractor' &&
                        <Text style={styles.subheadingText}>
                            This will be your Visiting-Card/Business-profile that helps companies and general contractors know you
                        </Text>}
                </View>
                <TouchableOpacity
                    style={styles.cardContainer}
                    onPress={() => {
                        updateBeginCard(() => navigation.navigate('CreateEditCardScreen'));
                    }}
                >
                    {user.userType === 'worker' &&
                        <Card userType='sample-worker' />}
                    {user.userType === 'contractor' &&
                        <Card userType='sample-contractor' />}
                </TouchableOpacity>
                <View>
                    <ButtonOne
                        title='Next'
                        style={styles.nextButton}
                        onPress={() => {
                            updateBeginCard(() => navigation.navigate('CreateEditCardScreen'));
                        }}
                    />
                    <ButtonOneUnfilled
                        title="I'll do it later"
                        onPress={() => {
                            if (user.userType === 'worker') {
                                updateFlowComplete(() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{
                                            name: 'WorkerTab',
                                            params:
                                                { screen: 'GroupsStack' }
                                        }],
                                    })
                                });
                            }
                            else if (user.userType === 'contractor') {
                                updateFlowComplete(() => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{
                                            name: 'ContractorTab',
                                            params:
                                                { screen: 'GroupsStack' }
                                        }],
                                    })
                                });
                            } else {
                                console.log('BeginCardScreen userType: ', user.userType);
                            }
                        }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
        backgroundColor: colors.surface,
        padding: spacings.large,
        justifyContent: 'space-between',
    },
    headingText: {
        ...textStyles.heading1,
        fontWeight: 'bold',
        textAlign: "center",
        marginBottom: spacings.small,
        marginTop: spacings.large * 4,
    },
    subheadingText: {
        ...textStyles.heading2,
        fontWeight: "normal",
        textAlign: 'center',
    },
    cardContainer: {
        height: 190,
    },
    nextButton: {
        marginBottom: spacings.large,
    },

})

export default BeginCardScreen

