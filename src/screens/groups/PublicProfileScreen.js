import { Button, StyleSheet, Text, Image, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, CheckBoxes, CheckBoxesTemp } from '../../context/DesignSystem';
import { MaterialIcons } from '@expo/vector-icons';
import { FeedsContext } from '../../context/FeedsContext';
import FeedPost from '../../components/groups/FeedPost';


const PublicProfileScreen = ({ route, navigation }) => {
    const { publicProfileUserId } = route.params;
    const { userForPublicProfile, fetchUserForPublicProfile, rules } = useContext(UserContext);
    const { feeds, fetchFeed } = useContext(FeedsContext);


    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{
                        marginRight: spacings.large * 2,
                    }}
                >
                    <MaterialIcons name="arrow-back" size={iconSizes.medium} color='white' />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserForPublicProfile(publicProfileUserId);
            fetchFeed();
        });
        return unsubscribe;
    }, [navigation]);

    const myFeeds = feeds.filter(feed => feed.userId === userForPublicProfile.userId);

    const myFeedsList = myFeeds.map((feed, index) => {
        return (
            <FeedPost
                key={index}
                item={feed}
                navigation={navigation}
                screen={"Group Screen"}
                containerStyle={{ marginBottom: spacings.medium }}
            />
        )
    })


    return (
        <View style={styles.mainContainer}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView>
                <View style={styles.topMostContainer}>
                    <View style={styles.cardOuterContainer}>

                        {userForPublicProfile.userType === 'worker' &&
                            <View style={styles.container}>
                                <View style={styles.topContainer}>
                                    <View style={styles.imageContainer}>
                                        {userForPublicProfile.userPhotoUrl
                                            ? <Image
                                                source={{ uri: userForPublicProfile.userPhotoUrl }}
                                                style={styles.image}
                                            />
                                            : <Image style={styles.image} source={require('../../resources/images/7.png')} />
                                        }
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>
                                            {userForPublicProfile.userName ? userForPublicProfile.userName : 'Your Name'}
                                        </Text>
                                        <Text style={styles.jobTitle}>
                                            {userForPublicProfile.userJobTitle}
                                            {userForPublicProfile.userJobTitle && userForPublicProfile.userCompanyName && ' at '}
                                            <Text style={styles.jobTitle}>
                                                {userForPublicProfile.userCompanyName}
                                            </Text>
                                        </Text>
                                        <Text style={styles.education}>
                                            {userForPublicProfile.userEducation ? userForPublicProfile.userEducation : 'Education'}
                                            {userForPublicProfile.userEducation && userForPublicProfile.userExperience && ' | '}
                                            <Text style={styles.education}>
                                                {userForPublicProfile.userExperience}
                                            </Text>
                                        </Text>
                                        <Text style={styles.location}>
                                            {userForPublicProfile.userCity ? userForPublicProfile.userCity : 'Preferred job location'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.bottomContainer}>
                                    <MaterialIcons name="phone" size={iconSizes.small} color="black" />
                                    <Text style={styles.phone}>
                                        {userForPublicProfile.phone}
                                    </Text>
                                </View>
                            </View>
                        }
                        {userForPublicProfile.userType === 'contractor' &&
                            <View style={styles.container}>
                                <View style={styles.topContainer}>
                                    <View style={styles.imageContainer}>
                                        {userForPublicProfile.userPhotoUrl
                                            ? <Image
                                                source={{ uri: userForPublicProfile.userPhotoUrl }}
                                                style={styles.image}
                                            />
                                            : <Image style={styles.image} source={require('../../resources/images/7.png')} />
                                        }
                                    </View>
                                    <View style={styles.textContainer}>
                                        <Text style={styles.name}>
                                            {userForPublicProfile.userName ? userForPublicProfile.userName : 'Your Name'}
                                        </Text>
                                        <Text style={styles.jobTitle}>
                                            {userForPublicProfile.userJobTitle}
                                            {userForPublicProfile.userJobTitle && userForPublicProfile.userCompanyName && ' at '}
                                            <Text style={styles.jobTitle}>{
                                                userForPublicProfile.userCompanyName}
                                            </Text>
                                        </Text>
                                        <Text style={styles.education}>
                                            {userForPublicProfile.userPastTenderTypes ? `(${userForPublicProfile.userPastTenderTypes.map(tenderType => `${tenderType}, `)})` : '(Tender types)'}
                                        </Text>
                                        <Text style={styles.location}>
                                            {userForPublicProfile.userCity ? userForPublicProfile.userCity : 'Company location'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.bottomContainer}>
                                    <MaterialIcons name="phone" size={iconSizes.small} color="black" />
                                    <Text style={styles.phone}>
                                        {userForPublicProfile.phone}
                                    </Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
                <View style={styles.bottomMostContainer}>
                    <Text style={styles.myActivityHeading}>
                        {userForPublicProfile.userName}'s Activity
                    </Text>
                    {myFeedsList && myFeedsList.length === 0 &&
                        <View style={styles.myActivityContainer}>
                            <Text style={styles.noActivityText}>
                                {userForPublicProfile.userName} has not created any posts yet
                            </Text>
                        </View>}
                    <View style={styles.myActivityContainer}>
                        {myFeedsList}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default PublicProfileScreen

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    topMostContainer: {
        backgroundColor: colors.primary,
        padding: spacings.large,
        elevation: 1,
    },
    cardOuterContainer: {
        height: 190,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 2,
    },

    bottomMostContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    myActivityHeading: {
        ...textStyles.heading2,
        marginTop: spacings.large,
        marginLeft: spacings.large,
    },
    myActivityContainer: {
        flex: 1,
        marginTop: spacings.medium,
        marginHorizontal: spacings.large,
    },






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