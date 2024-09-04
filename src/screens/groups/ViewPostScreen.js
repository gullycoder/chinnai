import { StyleSheet, Text, View, FlatList, SafeAreaView, Button, StatusBar, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { FeedsContext } from '../../context/FeedsContext'
import ClapsCount from '../../components/groups/ClapsCount'
import CreateClaps from '../../components/groups/CreateClaps'
import RepliesViewCount from '../../components/groups/RepliesViewCount'
import FeedPost from '../../components/groups/FeedPost'
import ReplyFeed from '../../components/groups/ReplyFeed'
import { Overlay } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, SelectStory, DividerHorizontal, ButtonOne, ButtonOneUnfilled } from '../../context/DesignSystem';
import { UserContext } from '../../context/UserContext'

const ViewPostScreen = ({ navigation, route }) => {
    const { user } = useContext(UserContext);
    const { feedId, autoFocusTextInput } = route.params
    const { feeds, createFeedReply } = useContext(FeedsContext)
    const feed = feeds.find((feed) => feed.feedId === feedId)
    const [textInput, setTextInput] = useState('')

    const [visible, setVisible] = useState(false);

    const scrollViewRef = useRef();
    const textInputRef = useRef();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'GroupsScreen' }],
                        });
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


    return (
        <View style={[styles.container]}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView
                ref={scrollViewRef}
                onLayout={() => {
                    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: false });
                }}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                }}
            >
                {feed &&
                    <FeedPost
                        item={feed}
                        navigation={navigation}
                        screen={"View Post Screen"}
                        setAutoFocusTextInput={() => {
                            textInputRef.current.focus()
                        }}
                    />}
            </ScrollView>
            <View style={styles.textInputContainer}>
                <View style={styles.userAvatarContainer}>
                    {user.userPhotoURL
                        ? <Image source={{ uri: user.userPhotoURL }} style={styles.userAvatar} />
                        : <Image source={require('../../resources/images/10.png')} style={styles.userAvatar} />
                    }
                </View>
                <TextInput
                    ref={textInputRef}
                    style={styles.textInput}
                    placeholder="Reply..."
                    keyboardType={'default'}
                    returnKeyType="send"
                    autoCapitalize='sentences'
                    value={textInput}
                    autoFocus={autoFocusTextInput}
                    onChangeText={text => setTextInput(text)}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    disabled={textInput.length === 0}
                    onPress={() => {
                        if (!user.userCardComplete) {
                            setVisible(true);
                            return;
                        }
                        createFeedReply({
                            feedId: feedId,
                            feedReplyContent: textInput,
                        });
                        setTextInput('');
                    }}
                >
                    <MaterialIcons name="send" size={iconSizes.large} color="white" />
                </TouchableOpacity>
            </View>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                <View style={styles.overlayContainer}>
                    <Text style={styles.overlayText}>To create and reply on a post, please complete your visiting card</Text>
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
                                        feedId: feed.feedId,
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
        </View>
    )
}

export default ViewPostScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface,
    },
    textInputContainer: {
        backgroundColor: colors.surface,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacings.small,
        paddingHorizontal: spacings.medium,
        elevation: 5,
        borderTopWidth: 1,
        borderTopColor: colors.borderDisabled,
    },
    textInput: {
        ...textInputStyles.large,
        flex: 1,
        height: spacings.medium * 4,
        borderRadius: spacings.medium * 2,
        backgroundColor: colors.surface,
        paddingLeft: spacings.medium * 4.5,
        borderWidth: 1,
        borderColor: colors.borderDisabled,
        // elevation: 1,
    },
    userAvatarContainer: {
        height: spacings.medium * 2.8,
        width: spacings.medium * 2.8,
        borderRadius: spacings.medium * 1.4,
        alignSelf: 'center',
        position: 'absolute',
        left: spacings.medium * 1.8,
        elevation: 1,
        zIndex: 1,
    },
    userAvatar: {
        height: spacings.medium * 2.8,
        width: spacings.medium * 2.8,
        borderRadius: spacings.medium * 1.4,
        alignSelf: 'center',
    },
    sendButton: {
        height: spacings.medium * 4,
        width: spacings.medium * 4,
        borderRadius: spacings.medium * 2,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: spacings.small / 2,
        paddingLeft: spacings.small / 2,
        elevation: 2,
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