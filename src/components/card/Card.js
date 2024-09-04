import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { colors, iconSizes, spacings, textStyles } from '../../context/DesignSystem';
import { UserContext } from '../../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';


const Card = ({ userType }) => {
    const { user, rules } = useContext(UserContext);

    return (
        <View>
            {userType === 'worker' &&
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.imageContainer}>
                            {user.userPhotoUrl
                                ? <Image
                                    source={{ uri: user.userPhotoUrl }}
                                    style={styles.image}
                                />
                                : <Image style={styles.image} source={require('../../resources/images/7.png')} />
                            }
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>
                                {user.userName ? user.userName : 'Your Name'}
                            </Text>
                            <Text style={styles.jobTitle}>
                                {user.userJobTitle}
                                {user.userJobTitle && user.userCompanyName && ' at '}
                                <Text style={styles.jobTitle}>
                                    {user.userCompanyName}
                                </Text>
                            </Text>
                            <Text style={styles.education}>
                                {user.userEducation ? user.userEducation : 'Education'}
                                {user.userEducation && user.userExperience && ' | '}
                                <Text style={styles.education}>
                                    {user.userExperience}
                                </Text>
                            </Text>
                            <Text style={styles.location}>
                                {user.userCity ? user.userCity : 'Preferred job location'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <MaterialIcons name="phone" size={iconSizes.small} color="black" />
                        <Text style={styles.phone}>
                            {user.phone}
                        </Text>
                    </View>
                </View>
            }
            {userType === 'sample-worker' &&
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={require('../../resources/images/7.png')} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>
                                Suresh Kumar
                            </Text>
                            <Text style={styles.jobTitle}>
                                Mistry
                                <Text style={styles.jobTitle}> at Building Construction Pvt Ltd</Text>
                            </Text>
                            <Text style={styles.education}>
                                ITI Diploma
                                <Text style={styles.education}> | 3-5 years</Text>
                            </Text>
                            <Text style={styles.location}>
                                Gurgaon
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <MaterialIcons name="phone" size={iconSizes.small} color="black" />
                        <Text style={styles.phone}>
                            +91-9876543210
                        </Text>
                    </View>
                </View>
            }
            {userType === 'contractor' &&
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.imageContainer}>
                            {user.userPhotoUrl
                                ? <Image
                                    source={{ uri: user.userPhotoUrl }}
                                    style={styles.image}
                                />
                                : <Image style={styles.image} source={require('../../resources/images/7.png')} />
                            }
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>
                                {user.userName ? user.userName : 'Your Name'}
                            </Text>
                            <Text style={styles.jobTitle}>
                                {user.userJobTitle}
                                {user.userJobTitle && user.userCompanyName && ' at '}
                                <Text style={styles.jobTitle}>{
                                    user.userCompanyName}
                                </Text>
                            </Text>
                            <Text style={styles.education}>
                                {user.userPastTenderTypes ? `(${user.userPastTenderTypes.map(tenderType => ` ${tenderType}`)} )` : '(Tender types)'}
                            </Text>
                            <Text style={styles.location}>
                                {user.userCity ? user.userCity : 'Company location'}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <MaterialIcons name="phone" size={iconSizes.small} color="black" />
                        <Text style={styles.phone}>
                            {user.phone}
                        </Text>
                    </View>
                </View>
            }
            {userType === 'sample-contractor' &&
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={require('../../resources/images/7.png')} />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>
                                Suresh Kumar
                            </Text>
                            <Text style={styles.jobTitle}>
                                Owner
                                <Text style={styles.jobTitle}> at Building Construction Company</Text>
                            </Text>
                            <Text style={styles.education}>
                                (Civil/Structure, Barbending, Masonry)
                            </Text>
                            <Text style={styles.location}>
                                Gurgaon
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <MaterialIcons name="phone" size={iconSizes.small} color="black" />
                        <Text style={styles.phone}>
                            {user.phone}
                        </Text>
                    </View>
                </View>
            }
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: colors.surfaceYellow,
        borderRadius: 8,
    },
    topContainer: {
        flexDirection: 'row',
        height: '78%',
        width: '100%',
        backgroundColor: colors.surfaceYellow,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    bottomContainer: {
        flexDirection: 'row',
        height: '22%',
        width: '100%',
        backgroundColor: colors.secondary,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: spacings.large,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    imageContainer: {
        width: '40%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacings.medium,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
        borderColor: colors.secondary,
    },
    textContainer: {
        width: '60%',
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: spacings.large,
    },
    name: {
        ...textStyles.heading1,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    jobTitle: {
        ...textStyles.heading2,
        color: colors.textDark,
        fontWeight: "normal",
        textAlign: 'right',
        marginBottom: spacings.small,
    },
    education: {
        ...textStyles.caption,
        color: colors.textDark,
        textAlign: 'right',
        marginBottom: spacings.small / 2,
    },
    location: {
        ...textStyles.caption,
        color: 'black',
        textAlign: 'right',
    },
    phone: {
        ...textStyles.heading3,
        color: colors.textDark,
        textAlign: 'right',
        marginLeft: spacings.small / 2,
    },
})