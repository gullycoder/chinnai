import { Image, StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { FeedsContext } from '../../context/FeedsContext'
import ClapsCount from './ClapsCount'
import CreateClaps from './CreateClaps'
import { MaterialIcons } from '@expo/vector-icons';
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerHorizontal } from '../../context/DesignSystem';
import { UserContext } from '../../context/UserContext'
import { useNavigation } from '@react-navigation/native';


const RepliesViewCount = ({ item, screen }) => {
    const { user } = useContext(UserContext)
    const { feedReplies, deletFeedsReply } = useContext(FeedsContext)
    const reply = feedReplies.find(reply => reply.feedReplyId === item.feedReplyId)
    const navigation = useNavigation();


    return (
        <View style={[styles.container]}>
            <TouchableOpacity
                style={[styles.userPhotoContainer]}
                onPress={() => {
                    if (item.userId === user.userId) {
                        navigation.navigate('CardScreen')
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
            </TouchableOpacity>
            <View style={[styles.replyAndFooterContainer]}>
                <View style={[styles.replyContainer]}>
                    <View style={[styles.replyContainerTop]}>
                        <Text style={[styles.userNameText]}>
                            {reply.userName}
                        </Text>
                        {reply.userId === user.userId
                            ? <TouchableOpacity
                                onPress={() => deletFeedsReply(reply)}>
                                <MaterialIcons name="delete-outline" size={iconSizes.small} color={colors.icon} />
                            </TouchableOpacity>
                            : null}
                    </View>
                    <Text style={[styles.replyContentText]}>
                        {reply.feedReplyContent}
                    </Text>
                </View>
                {screen === 'View Post Screen'
                    ? <View style={[styles.footerContainer]}>
                        <View style={[styles.clapsContainer]}>
                            <CreateClaps feedReplyId={reply.feedReplyId} />
                            <ClapsCount feedReplyId={reply.feedReplyId} />
                        </View>
                        <Text style={[styles.timeStampStyle]}>
                            {reply.createdAt.toDate().toLocaleDateString()}
                        </Text>
                    </View>
                    : null
                }
            </View>
        </View>

    )
}

export default RepliesViewCount

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    replyAndFooterContainer: {
        flex: 1,
        marginLeft: spacings.small,
        justifyContent: 'flex-start',
    },
    replyContainer: {
        paddingHorizontal: spacings.small,
        paddingVertical: spacings.small,
        marginBottom: spacings.small,
        backgroundColor: colors.background,
        borderRadius: 5,
        flex: 1,
    },
    replyContainerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        marginBottom: spacings.small / 2,
    },
    userNameText: {
        ...textStyles.caption,
        fontWeight: 'bold',
    },
    replyContentText: {
        ...textStyles.body,
        marginBottom: spacings.small / 2,
    },
    footerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacings.small,
    },
    timeStampStyle: {
        ...textStyles.caption
    },




    feedRepliesComponentContainer: {
        backgroundColor: colors.surface,
        marginVertical: spacings.small,

    },
    viewAllFeedRepliesText: {
        ...textStyles.caption,
        color: colors.primaryLight,
        fontWeight: 'bold',
    },
    userPhotoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    userProfilePic: {
        width: spacings.medium * 2.5,
        height: spacings.medium * 2.5,
        borderRadius: spacings.medium * 1.25,
    },

    feedReplyContentAndUserDetailContainerOnGroupScreen: {
        flexDirection: 'row',
        paddingTop: spacings.small,
        marginBottom: spacings.small,
        justifyContent: 'flex-start',
        flex: 1,
        // borderWidth: 1,
    },
    feedReplyContentAndUserNameContainerOnGroupScreen: {
        ...textStyles.heading3,
        color: colors.text,
        paddingLeft: spacings.small,
        paddingVertical: spacings.small,
        backgroundColor: colors.background,
        borderRadius: 5,
        marginLeft: spacings.small,
        flex: 1,
        // borderWidth: 1,
    },
    feedReplyContainerOnViewScreen: {
        paddingTop: spacings.small,
        marginHorizontal: 0,
        justifyContent: 'flex-start',
        flex: 1,
    },


    clapsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },


})