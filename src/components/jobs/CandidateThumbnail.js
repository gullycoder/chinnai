import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, SelectStory, DividerHorizontal, ButtonTwo, ButtonOneUnfilled, ButtonTwoUnfilled, UploadPhoto } from '../../context/DesignSystem';



const CandidateThumbnail = ({ candidate, job }) => {

    const navigation = useNavigation();

    const callPhoneNumber = () => {
        Linking.openURL(`tel:${candidate.phone}`);
    }
    const sendWhatsappMessage = () => {
        try {
            const message = `Hi ${candidate.userName}, You have applied on Chinaai App for ${job.jobType} job. Please contact me when you are available.`;
            Linking.openURL(`whatsapp://send?text=${message}&phone=${candidate.phone}`);
            console.log('whatsapp message sent');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.userProfileContainer}
                onPress={() => {
                    // navigation.navigate('PublicProfileScreen', { publicProfileUserId: candidate.userId });
                    navigation.navigate('GroupsStack', {
                        screen: 'PublicProfileScreen',
                        params: {
                            publicProfileUserId: candidate.userId
                        }
                    });
                }}
            >
                {candidate.userPhotoUrl
                    ? <Image style={[styles.userProfilePic]} source={{ uri: candidate.userPhotoUrl }} />
                    : <Image style={[styles.userProfilePic]} source={require('../../resources/images/10.png')} />}
                <View>
                    <View style={styles.userNameContainer}>
                        <Text style={[styles.userProfileName]}>
                            {candidate.userName}
                        </Text>
                    </View>
                    <Text style={[styles.userDetails]}>
                        {candidate.userJobTitle}{' at '}{candidate.userCompanyName}{" "}{candidate.userCity}
                    </Text>
                </View>
            </TouchableOpacity>
            <View style={styles.bottomContainer}>
                <Text style={styles.topCaptions}>
                    <Text style={styles.bottomCaptions}>City: </Text>
                    {candidate.userCity}
                </Text>
                <Text style={styles.topCaptions}>
                    <Text style={styles.bottomCaptions}>Education: </Text>
                    {candidate.userEducation}
                </Text>
                <Text style={styles.topCaptions}>
                    <Text style={styles.bottomCaptions}>Experience: </Text>
                    {candidate.userExperienceOrNot === 'yes' ? candidate.userExperience : 'Fresher'}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <ButtonTwo
                    title={'Call'}
                    onPress={() => callPhoneNumber()}
                    style={styles.callButton}
                />
                <ButtonTwoUnfilled
                    title={'Whatsapp'}
                    onPress={() => sendWhatsappMessage()}
                    style={styles.messageButton}
                />
            </View>

        </View>
    )
}

export default CandidateThumbnail

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        elevation: 2,
        marginBottom: spacings.medium,
        padding: spacings.medium,
        borderRadius: 4,
        justifyContent: 'space-between',
    },

    userProfileContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: spacings.large
    },
    userProfileName: {
        ...textStyles.heading2,
        marginLeft: spacings.small,
    },
    userProfilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    userDetails: {
        ...textInputStyles.caption,
        marginLeft: spacings.small,
        color: colors.textLight,
    },
    topCaptions: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: spacings.small / 4,
    },
    bottomCaptions: {
        ...textStyles.caption,
        fontWeight: 'normal',
    },
    bottomContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: spacings.large,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: spacings.small,
    },
    callButton: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        marginRight: spacings.small,
    },
    messageButton: {
        justifyContent: 'center',
    },



})