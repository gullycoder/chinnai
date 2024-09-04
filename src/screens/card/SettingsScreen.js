import { StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, CheckBoxes, CheckBoxesTemp } from '../../context/DesignSystem';
import { UserContext } from '../../context/UserContext';


const SettingsScreen = ({ navigation }) => {
    const { user } = useContext(UserContext);


    return (
        <View style={styles.container}>
            {/* <TouchableOpacity
                style={styles.sectionContainer}
                onPress={() => {
                }}
            >
                <MaterialIcons name="policy" size={iconSizes.large} color={colors.icon} />
                <Text style={styles.sectionHeading}>
                    Privacy Policy
                </Text>
            </TouchableOpacity> */}
            <StatusBar backgroundColor={colors.primaryDark} />
            <TouchableOpacity
                style={styles.sectionContainer}
                onPress={async () => {
                    try {
                        await AsyncStorage.removeItem('userToken');
                        navigation.reset({
                            index: 0,
                            routes: [{
                                name: 'AuthStack',
                                params: { screen: 'PhoneScreen' }
                            }],
                        });
                    }
                    catch (e) {
                        console.log(e);
                    }
                }}
            >
                <MaterialIcons name="logout" size={iconSizes.large} color={colors.icon} />
                <Text style={styles.sectionHeading}>
                    Sign Out
                </Text>
            </TouchableOpacity>
            {(user.phone === "+919910771254" || user.phone === "+919717488155" || user.phone === "+919560912045") &&
                <TouchableOpacity
                    style={styles.sectionContainer}
                    onPress={() => navigation.navigate('TendersStack', { screen: 'CreateTenderScreen' })}
                >
                    <MaterialIcons name="post-add" size={iconSizes.large} color={colors.icon} />
                    <Text style={styles.sectionHeading}>
                        Create Tender
                    </Text>
                </TouchableOpacity>
            }
            <View style={styles.bottomContainer} />

        </View>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    sectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.surface,
        padding: spacings.large,
        marginTop: spacings.medium,
        elevation: 1,
    },
    sectionHeading: {
        ...textStyles.body,
        marginLeft: spacings.medium,
    },

})