import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import { FeedsContext } from '../../context/FeedsContext'
import { UserContext } from '../../context/UserContext'
import { Ionicons } from '@expo/vector-icons';
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, SelectStory } from '../../context/DesignSystem';

const CreateClaps = ({ feedId, feedReplyId }) => {

    const { feeds, feedReplies, feedClaps, feedReplyClaps, createOrUpdateFeedClap, createOrUpdateFeedReplyClap } = useContext(FeedsContext)
    const { user } = useContext(UserContext)

    const feedClap = feedClaps.find(clap => clap.feedId === feedId && clap.userId === user.userId) || {}
    const feedReplyClap = feedReplyClaps.find(clap => clap.feedReplyId === feedReplyId && clap.userId === user.userId) || {}

    const userIdfromFeed = feedId ? feeds.find(feed => feed.feedId === feedId).userId : null
    const userIdfromFeedReply = feedReplyId ? feedReplies.find(feedReply => feedReply.feedReplyId === feedReplyId).userId : null


    if (userIdfromFeed === user.userId || userIdfromFeedReply === user.userId) {
        return null;
    }

    return (
        <TouchableOpacity
            onPress={() => {
                if (feedReplyId) {
                    createOrUpdateFeedReplyClap({ feedReplyId, feedReplyClapId: feedReplyClap.feedReplyClapId })
                } else {
                    createOrUpdateFeedClap({ feedId, feedClapId: feedClap.feedClapId })
                }
            }}
            style={[styles.container]}
        >
            <Ionicons name="hand-right-outline" size={iconSizes.small} color={feedClap.feedClapId || feedReplyClap.feedReplyClapId ? colors.primary : colors.icon}
                style={{ transform: [{ rotate: '45deg' }] }} />
            <Ionicons name="hand-right-outline" size={iconSizes.small} color={feedClap.feedClapId || feedReplyClap.feedReplyClapId ? colors.primary : colors.icon}
                style={[styles.handIcon, { transform: [{ rotate: '45deg' }] }]} />
            {!feedReplyId
                ? <Text style={[styles.clapsButtonText, { color: feedClap.feedClapId || feedReplyClap.feedReplyClapId ? colors.primary : colors.textDark }]}>Clap</Text>
                : null
            }
        </TouchableOpacity>
    )
}


export default CreateClaps
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacings.small,
    },
    clapsButtonText: {
        ...textStyles.heading3,
        color: colors.textDark,
        paddingLeft: spacings.small * 0.75,
    },
    handIcon: {
        position: 'absolute',
        left: 2.5,
        alignSelf: 'center',
        paddingTop: 5,
    },
})