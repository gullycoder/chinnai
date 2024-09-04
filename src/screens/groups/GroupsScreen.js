import { Image, View, Text, Button, FlatList, StyleSheet, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { FeedsContext } from '../../context/FeedsContext'
import { UserContext } from '../../context/UserContext'
import { Overlay } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import FeedPost from '../../components/groups/FeedPost'
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, SelectStory, DividerHorizontal, ButtonOne, ButtonOneUnfilled } from '../../context/DesignSystem';


const GroupsScreen = ({ navigation }) => {

    const { user, rules } = useContext(UserContext)
    const { feeds, fetchFeed, getFeedReply, feedReplies, fetchClaps, fetchFeedReplyClaps } = useContext(FeedsContext)
    const [selectedGroup, setSelectedGroup] = useState("All Group");
    const groupArray = ['All Group', ...rules.rulesGroups]
    const uniqueFeeds = feeds.filter((feed, index) => feeds.indexOf(feed) === index);
    const flatListFeeds = selectedGroup === "All Group" ? uniqueFeeds : uniqueFeeds.filter(feed => feed.feedGroup === selectedGroup)
    const userNameFirstLetter = user.userName ? user.userName.charAt(0).toUpperCase() : "C"

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getFeedReply();
            fetchFeed();
            fetchClaps();
            fetchFeedReplyClaps();
        });
        return unsubscribe;
    }, [navigation])

    const feedsList = flatListFeeds.map((feed, index) => {
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
        <View style={styles.container}>
            {/* <View style={[styles.container]}> */}
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView>
                <View style={styles.topContainer}>
                    <Text style={styles.selectGroupHeading}>
                        Select Group
                    </Text>
                    <View style={styles.selectGroupsContainer}>
                        <FlatList
                            data={groupArray}
                            renderItem={({ item }) => (
                                <SelectStory
                                    title={item}
                                    selected={selectedGroup}
                                    setSelected={setSelectedGroup}
                                />
                            )}
                            keyExtractor={item => item}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>

                <View style={styles.feedsContainer}>
                    {feedsList && feedsList.length > 0 ? feedsList : <Text style={styles.noFeeds}>
                        No matching posts found in your selected group.
                    </Text>}
                </View>
                <View style={styles.spacer} />

            </ScrollView>
            <View style={styles.createPostButtonContainer}>
                <TouchableOpacity
                    onPress={() => {
                        if (!user.userCardComplete) {
                            setVisible(true);
                            return;
                        };
                        navigation.navigate('CreateFeedScreen');
                    }}
                    style={[styles.touchableOpacityContainer]}
                >
                    <View style={[styles.createFeedbuttonProfilePic]}>
                        <Text style={[styles.createFeedbuttonNameText]}>
                            {userNameFirstLetter}
                        </Text>
                    </View>
                    <Text Style={[styles.floatingText]}>
                        Create a Post
                    </Text>
                    <View style={[styles.arrowRightDropCircle]}>
                        <MaterialIcons name="send" size={iconSizes.small} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                <View style={styles.overlayContainer}>
                    <Text style={styles.overlayText}>To create or reply on a post, please complete your visiting card</Text>
                    <ButtonOne
                        title="Complete visiting card"
                        style={styles.overlayButton}
                        onPress={() => {
                            navigation.reset({
                                index: 0,
                                routes: [{
                                    name: 'CardStack',
                                    params: {
                                        screen: 'CreateEditCardScreen',
                                    }
                                }]
                            });
                            setVisible(!visible);
                        }}
                    />
                    <ButtonOneUnfilled
                        title="Cancel"
                        onPress={() => {
                            setVisible(!visible);
                        }}
                    />
                </View>
            </Overlay>
        </View >
    )
}

export default GroupsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    topContainer: {
        flex: 1,
        backgroundColor: colors.surface,
        elevation: 5,
    },
    noFeeds: {
        ...textStyles.heading2,
        fontWeight: 'normal',
        textAlign: 'center',
        margin: spacings.large,
    },

    selectGroupHeading: {
        ...textStyles.heading2,
        marginTop: spacings.medium,
        marginHorizontal: spacings.large,
    },
    selectGroupsContainer: {
        marginTop: spacings.medium,
        marginBottom: spacings.small,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: spacings.large,
    },
    feedsContainer: {
        flex: 1,
        marginTop: spacings.large,
        marginHorizontal: spacings.large,
    },
    spacer: {
        height: spacings.medium * 4.5 + spacings.small,
    },
    createPostButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.small,
    },
    touchableOpacityContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        height: spacings.medium * 4.5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacings.small,
    },
    createFeedbuttonProfilePic: {
        backgroundColor: colors.secondary,
        height: iconSizes.large * 1.25,
        width: iconSizes.large * 1.25,
        borderRadius: iconSizes.large * 1.25 * .5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    createFeedbuttonNameText: {
        ...textStyles.heading2,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    floatingText: {
        ...textStyles.heading3,
        fontWeight: 'bold',
    },
    arrowRightDropCircle: {
        backgroundColor: colors.primary,
        height: iconSizes.large * 1.25,
        width: iconSizes.large * 1.25,
        borderRadius: iconSizes.large * 1.25 * .5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: spacings.small / 3,
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
    overlayButton: {
        marginBottom: spacings.large,
    },


})