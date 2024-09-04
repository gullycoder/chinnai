import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '../../context/UserContext';
import { colors, iconSizes, spacings, textStyles } from '../../context/DesignSystem';

const SelectUserTypeScreen = ({ navigation }) => {
    const { updateUserType } = useContext(UserContext);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <Text style={styles.selectProfile}>
                Select your profile
            </Text>
            <Text style={styles.welcome}>
                Welcome to Chinaai
            </Text>
            <TouchableOpacity
                style={styles.buttonContainerWorker}
                onPress={() => {
                    updateUserType('worker', () => navigation.navigate('BeginCardScreen'));
                }}
            >
                <Text style={styles.buttonText}>
                    I am a
                </Text>
                <Text style={styles.buttonTextLarge}>
                    Worker
                </Text>
            </TouchableOpacity>
            <View style={styles.helperTextContainer} >
                <MaterialIcons name="check" size={iconSizes.medium} color={colors.primary} />
                <Text style={styles.helperText}>
                    Get new jobs
                </Text>
            </View>
            <TouchableOpacity
                style={styles.buttonContainerContractor}
                onPress={() => {
                    updateUserType('contractor', () => navigation.navigate('BeginCardScreen'));
                }}
            >
                <Text style={styles.buttonText}>
                    I am a
                </Text>
                <Text style={styles.buttonTextLarge}>
                    Contractor
                </Text>
            </TouchableOpacity>
            <View style={styles.helperTextContainer} >
                <MaterialIcons name="check" size={iconSizes.medium} color={colors.primary} />
                <Text style={styles.helperText}>
                    Get new work / tenders
                </Text>
            </View>
            <View style={styles.helperTextContainer} >
                <MaterialIcons name="check" size={iconSizes.medium} color={colors.primary} />
                <Text style={styles.helperText}>
                    Hire workers
                </Text>
            </View>
        </View>
    )
}

export default SelectUserTypeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
        alignItems: 'center',
    },
    selectProfile: {
        ...textStyles.heading1,
        fontWeight: 'bold',
        textAlign: "center",
        marginTop: spacings.large * 5,
        marginBottom: spacings.small,
    },
    welcome: {
        ...textStyles.heading2,
        fontWeight: "normal",
        textAlign: 'center',
        marginBottom: spacings.large,
    },
    buttonContainerWorker: {
        width: '50%',
        backgroundColor: colors.surfaceYellow,
        paddingVertical: spacings.large,
        marginBottom: spacings.medium,
        marginTop: spacings.large * 3,
        borderRadius: 4,
        elevation: 2,

    },
    buttonContainerContractor: {
        width: '50%',
        backgroundColor: colors.surfaceGreen,
        paddingVertical: spacings.large,
        marginBottom: spacings.medium,
        marginTop: spacings.large * 3,
        borderRadius: 4,
        elevation: 2,
    },
    buttonText: {
        ...textStyles.heading2,
        textAlign: "center",
        // color: colors.primaryDark,
    },
    buttonTextLarge: {
        ...textStyles.heading1,
        fontSize: textStyles.heading1.fontSize * 1.25,
        fontWeight: "bold",
        textAlign: "center",
        color: colors.primaryDark,
        marginVertical: spacings.small,
    },
    helperTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacings.small,
    },
    helperText: {
        ...textStyles.heading2,
        fontWeight: "normal",
        color: colors.textDark,
        marginLeft: spacings.small / 2,
    },

})