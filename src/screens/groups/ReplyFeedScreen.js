import { Image, View, Text, FlatList, TextInput, SafeAreaView, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Keyboard, StatusBar } from 'react-native'
import { FeedsContext } from '../../context/FeedsContext'
import React from 'react';
import { UserContext } from '../../context/UserContext'
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, SelectStory, DividerHorizontal, ButtonOne } from '../../context/DesignSystem';


const ReplyFeedScreen = ({ navigation, route }) => {
    const [feedReplyContent, setFeedReplyContent] = React.useState('')
    const { feeds, createFeedReply } = React.useContext(FeedsContext)
    const { user } = React.useContext(UserContext);
    const { feedId } = route.params
    const feed = feeds.filter(feed => feed.feedId === feedId)

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={[{ flexDirection: 'row' }, styles.userProfileContainer]}>
                <Image source={require('../../resources/images/10.png')} style={[styles.userProfilePic]} />
                <View >
                    <Text style={[styles.userProfileName]}>
                        {user.userName}
                    </Text>
                    <Text style={[styles.userDetails]}>
                        {user.userJobTitle}{' at '}{user.userCompanyName}{" "}{user.userCity}
                    </Text>
                </View>
            </View>
            <View style={[styles.textInputContainer]}>
                <ScrollView >
                    <TextInput
                        placeholder="Post your reply here. Please do not share your private infor like phone number."
                        multiline={true}
                        onScroll={() => Keyboard.dismiss()}
                        style={[styles.textInputContainer]}
                        onChangeText={text => setFeedReplyContent(text)}
                    />
                </ScrollView>
            </View>
            <View style={[styles.buttonContainer]}>
                <ButtonOne
                    title="Post"
                    style={{ marginBottom: 16 }}
                    disabled={feedReplyContent.length === 0}
                    onPress={() => {
                        createFeedReply({
                            feedId: feedId,
                            feedReplyContent: feedReplyContent,
                            navigateToViewPostScreen:
                                () => navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'GroupsScreen' }]
                                })
                        })
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default ReplyFeedScreen
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        margin: spacings.medium,
    },
    userProfileContainer: {
        backgroundColor: colors.surface,
        marginTop: spacings.large,
        borderRadius: 5,
    },
    userProfilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userProfileName: {
        ...textStyles.heading2,
        marginLeft: spacings.small,
    },
    userDetails: {
        ...textInputStyles.caption,
        marginLeft: spacings.small,
        color: colors.textLight,
    },
    feedContentStyle: {
        ...textStyles.body,
        marginTop: spacings.small,
        backgroundColor: colors.surface,
        flexWrap: 'wrap',
    },
    textInputContainer: {
        flex: 1,

    },
    buttonContainer: {
        // marginTop: -spacings.medium * 5,
        // borderWidth: 1,
        // alignSelf: 'flex-end',
        // height: 100,
    },
})