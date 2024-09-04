import { Image, View, Text, Button, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import RepliesViewCount from '../../components/groups/RepliesViewCount'
import CreateClaps from '../../components/groups/CreateClaps'
import ClapsCount from '../../components/groups/ClapsCount'
import { UserContext } from '../../context/UserContext'
import { MaterialIcons } from '@expo/vector-icons';
import { Overlay } from 'react-native-elements';
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, SelectStory, DividerHorizontal, ButtonOne, ButtonOneUnfilled, ButtonTwoUnfilled, UploadPhoto } from '../../context/DesignSystem';
import { FeedsContext } from '../../context/FeedsContext'

const FeedPost = ({ item, navigation, screen, containerStyle, setAutoFocusTextInput, navigateToCardScreen }) => {
    const { user } = useContext(UserContext)
    const { feedReplies, deletFeedsReply, getFeedReply } = useContext(FeedsContext)
    const userNameFirstLetter = user.userName ? user.userName.charAt(0).toUpperCase() : "C"
    const feedRepliesForFeed = feedReplies.filter(reply => reply.feedId === item.feedId)

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getFeedReply();
        });
        return unsubscribe;
    }, [navigation])

    const repliesList = feedRepliesForFeed.map((reply, index) => {
        return (
            <RepliesViewCount
                item={reply}
                screen={"View Post Screen"}
                key={index}
            />
        )
    })

    const replySingle = feedRepliesForFeed.map((reply, index) => {
        if (index === 0) {
            return (
                <RepliesViewCount
                    item={reply}
                    screen={"Group Screen"}
                    key={index}
                />
            )
        } else {
            return null
        }
    })



    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(
                        'GroupsStack', {
                        screen: 'ViewPostScreen',
                        params: {
                            feedId: item.feedId,
                        }
                    })
                }}
            >
                <TouchableOpacity
                    style={styles.userProfileContainer}
                    onPress={() => {
                        if (item.userId === user.userId) {
                            navigation.navigate('CardStack', { screen: 'CardScreen' })
                        } else {
                            navigation.navigate('PublicProfileScreen',
                                { publicProfileUserId: item.userId }
                            )
                        }
                    }}
                >
                    {item.userPhotoUrl
                        ? <Image style={[styles.userProfilePic]} source={{ uri: item.userPhotoUrl }} />
                        : <Image style={[styles.userProfilePic]} source={require('../../resources/images/10.png')} />}
                    <View style={styles.userNameOuterContainer}>
                        <View style={styles.userNameContainer}>
                            <Text style={[styles.userProfileName]}>
                                {item.userName}
                            </Text>
                            <View style={[styles.userTypeContainer, {
                                backgroundColor: item.userIsAdmin === true
                                    ? colors.secondaryDark
                                    : item.userType === "worker"
                                        ? colors.surfaceYellow
                                        : colors.surfaceGreen
                            }]}>
                                <Text style={[styles.userTypeText, {
                                    color: 'black'
                                }]}>
                                    {item.userIsAdmin
                                        ? "chinaai"
                                        : item.userType}
                                </Text>
                            </View>
                        </View>
                        <Text style={[styles.userDetails]}>
                            {item.userJobTitle}{' at '}{item.userCompanyName}{" "}{item.userCity}
                        </Text>
                    </View>
                </TouchableOpacity>
                {item.feedPhotoUrl ?
                    <Image style={styles.feedPhotoContainer} source={{ uri: item.feedPhotoUrl }} />
                    : null}
                <Text
                    // numberOfLines={0}
                    style={[styles.feedContentStyle]}
                >
                    {item.feedContent}
                </Text>
                <View style={[styles.clapsCountAndTimeStampContainer]}>
                    <ClapsCount feedId={item.feedId} />
                    <Text style={[styles.timeStampStyle]}>
                        {item.createdAt.toDate().toLocaleDateString()}
                    </Text>
                </View>
            </TouchableOpacity>
            <DividerHorizontal />
            <View style={[styles.createClapAndReplyContainer]}>
                <CreateClaps feedId={item.feedId} />
                <TouchableOpacity
                    onPress={() => {
                        if (screen === "Group Screen") {
                            navigation.navigate(
                                'GroupsStack', {
                                screen: 'ViewPostScreen',
                                params: {
                                    feedId: item.feedId, autoFocusTextInput: true
                                }
                            })
                        } else {
                            setAutoFocusTextInput()
                        }
                    }}
                    style={styles.replyContainer}
                >
                    <MaterialIcons name="message" size={iconSizes.small} color={colors.icon} style={styles.replyIcon} />
                    <Text style={styles.replyButtonText}>
                        Reply ({feedRepliesForFeed.length})
                    </Text>
                </TouchableOpacity>
                {item.userId === user.userId
                    ? <TouchableOpacity
                        onPress={() => {
                            setVisible(true);
                        }}>
                        <MaterialIcons name="delete-outline" size={iconSizes.medium} color={colors.icon} />
                    </TouchableOpacity>
                    : null}

            </View>
            <DividerHorizontal style={styles.bottomDivider} />
            {screen === "Group Screen"
                ? <>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate(
                            'GroupsStack', {
                            screen: 'ViewPostScreen',
                            params: {
                                feedId: item.feedId, autoFocusTextInput: true
                            }
                        })
                    }}>
                        {replySingle}
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(
                                'GroupsStack', {
                                screen: 'ViewPostScreen',
                                params: {
                                    feedId: item.feedId, autoFocusTextInput: true
                                }
                            })
                        }}
                        style={[styles.createFeedButtonContainer]}
                    >
                        <View style={[styles.profilePicContainer]}>
                            <Text style={[styles.profilePicText]}>
                                {userNameFirstLetter}
                            </Text>
                        </View>
                        <TextInput
                            style={[styles.textInputStylesForReply]}
                            placeholder="Reply..."
                            editable={false}
                        />
                    </TouchableOpacity>
                </>
                : repliesList}

            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                <View style={styles.overlayContainer}>
                    <Text style={styles.overlayText}>Do you want to delete the post?</Text>
                    <View style={styles.overlayButtonsContainer}>
                        <ButtonOneUnfilled
                            title="Cancel"
                            style={styles.overlayCancelButton}
                            onPress={() => {
                                setVisible(!visible);
                            }}
                        />
                        <ButtonOne
                            title="Delete"
                            style={styles.overlayDeleteButton}
                            onPress={() => {
                                deletFeedsReply(item);
                                if (navigateToCardScreen) {
                                    navigation.navigate('CardScreen');
                                } else {
                                    navigation.navigate('GroupsScreen');
                                }
                                setVisible(!visible);
                            }}
                        />
                    </View>
                </View>
            </Overlay>

        </View >
    )
}

export default FeedPost

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        elevation: 1,
        paddingHorizontal: spacings.medium,
        paddingTop: spacings.medium,
    },
    selectGroupTextContainer: {
        paddingVertical: spacings.medium,
        backgroundColor: colors.backgroundYellow,
    },
    selectGroupContainer: {
        borderColor: colors.textLight,
        borderBottomWidth: opacities.o3,
        marginBottom: spacings.small,
        backgroundColor: colors.surface
    },
    userProfileContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        marginBottom: spacings.small,

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
    userNameOuterContainer: {
        flex: 1,
        width: '100%',
    },
    userNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    userTypeContainer: {
        justifyContent: 'center',
        marginLeft: spacings.small,
        borderRadius: spacings.medium,
        paddingHorizontal: spacings.small,
        paddingBottom: spacings.small / 4,
    },
    userTypeText: {
        ...textStyles.caption,
        textAlign: 'center',
    },
    userDetails: {
        ...textInputStyles.caption,
        marginLeft: spacings.small,
        color: colors.textLight,
    },
    feedContentStyle: {
        ...textStyles.body,
        marginBottom: spacings.large,
        paddingHorizontal: spacings.small / 2,
    },
    feedPhotoContainer: {
        width: '100%',
        aspectRatio: 3 / 4,
        justifyContent: 'center',
        alignContent: 'center',
        borderRadius: 6,
        marginBottom: spacings.medium,
        marginTop: spacings.small / 2,
    },
    clapsCountAndTimeStampContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: spacings.small,
        alignItems: 'center',
    },
    timeStampStyle: {
        ...textStyles.caption
    },
    createClapAndReplyContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: spacings.small,
        alignItems: 'center',
    },
    replyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    replyButtonText: {
        ...textStyles.heading3,
        color: colors.textDark,
        paddingLeft: spacings.small * 0.75,
        paddingVertical: spacings.small * 0.5,
    },
    replyIcon: {
        paddingTop: spacings.small * 0.5,
    },
    bottomDivider: {
        marginBottom: spacings.medium,
    },
    createFeedButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: spacings.medium,
        marginTop: spacings.small / 2,
    },
    profilePicContainer: {
        backgroundColor: colors.secondary,
        height: iconSizes.large * 1.2,
        width: iconSizes.large * 1.2,
        borderRadius: iconSizes.large * 1.2 * .5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profilePicText: {
        ...textStyles.heading2,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    overlayContainer: {
        justifyContent: 'center',
        backgroundColor: colors.surface,
        padding: spacings.large,
        width: '95%',
    },
    overlayText: {
        ...textStyles.body,
        fontSize: textStyles.heading2.fontSize,
        textAlign: 'center',
        marginBottom: spacings.large,
    },
    overlayButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    overlayCancelButton: {
        marginTop: spacings.large,
        paddingHorizontal: spacings.large * 2,
    },
    overlayDeleteButton: {
        marginTop: spacings.large,
        paddingHorizontal: spacings.large * 2,
        marginLeft: spacings.small,
    },








    feedReplyContainer: {
        flexDirection: 'row',
        // borderWidth: 1,
    },
    replyText: {
        ...textStyles.heading3,
        fontWeight: 'bold',
        paddingLeft: spacings.small,
    },
    createFeedbuttonNameText: {
        ...textStyles.heading2,
        height: iconSizes.large,
        width: iconSizes.large,
        margin: 0,
        borderRadius: iconSizes.large * 1.25 * .5,
        textAlign: 'center',
        textAlignVertical: 'center',
        // borderWidth: 5,
    },

    createFeedbuttonProfilePic: {
        backgroundColor: colors.secondary,
        height: 30,
        width: 30,
        borderRadius: 15,
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderWidth: 0,
        margin: 0,
    },
    textInputStylesForReply: {
        flex: 1,
        ...textInputStyles.large,
        height: spacings.medium * 3,
        marginLeft: spacings.small,
        borderWidth: 0,
        paddingLeft: spacings.small,
        fontSize: textStyles.caption.fontSize,
    }

})