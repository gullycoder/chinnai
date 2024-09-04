import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { FeedsContext } from '../../context/FeedsContext'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory } from '../../context/DesignSystem';


const ClapsCount = ({ feedId, feedReplyId }) => {
    const { feedClaps, feedReplyClaps } = useContext(FeedsContext)

    const feedClapsForFeed = feedClaps ? feedClaps.filter(clap => clap.feedId === feedId) : []
    const feedClapsForFeedReply = feedReplyClaps ? feedReplyClaps.filter(clap => clap.feedReplyId === feedReplyId) : []

    let feedClapsCountForFeed = 0
    let feedClapsCountForFeedReply = 0

    feedClapsForFeed.forEach(clap => {
        feedClapsCountForFeed += clap.feedClapsCount
    })
    feedClapsForFeedReply.forEach(clap => {
        feedClapsCountForFeedReply += clap.feedReplyClapsCount
    })

    return feedId && feedClapsCountForFeed > 0 || feedReplyId && feedClapsCountForFeedReply > 0 ? (
        <View style={[styles.container]}>
            <Text style={[styles.clapsCountText]}>
                {feedId ? feedClapsCountForFeed : feedClapsCountForFeedReply}
            </Text>
            <Text style={[styles.clapsText]}>claps</Text>
        </View>
    ) : <View ></View>
}

export default ClapsCount

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondaryLight,
        padding: spacings.small,
        borderRadius: 4,
        flexDirection: 'row',
    },
    clapsCountText: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'bold',
        marginRight: spacings.small / 2,
    },
    clapsText: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'normal',
    },
    clapsTextColor: {
        ...textStyles.caption,
        color: colors.primaryDark,
        fontWeight: 'normal',
        // opacity: opacities.o4,
        borderRadius: 5,
        // fontWeight: "normal",
    },
})