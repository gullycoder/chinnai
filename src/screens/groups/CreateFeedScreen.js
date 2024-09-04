import { Image, StyleSheet, Text, View, Button, TextInput, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import React, { useContext, useReducer, useState } from 'react'
import { FeedsContext } from '../../context/FeedsContext'
import { UserContext } from '../../context/UserContext'
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, SelectStory, DividerHorizontal, ButtonOne, RadioButtons, RadioButtonsTemp, UploadPhoto } from '../../context/DesignSystem';

const CreateFeedScreen = ({ navigation }) => {
    const { rules, user } = useContext(UserContext);
    const [feed, setFeed] = useState({ feedGroup: rules.rulesGroups[1] });
    const { createFeed } = useContext(FeedsContext);
    const [loading, setLoading] = useState(false);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView>
                <View style={styles.topContainer}>
                    <View style={styles.userProfileContainer}>
                        <Image source={{ uri: user.userPhotoUrl }} style={[styles.userProfilePic]} />
                        <View >
                            <Text style={[styles.userProfileName]}>
                                {user.userName}
                            </Text>
                            <Text style={[styles.userDetails]}>
                                {user.userJobTitle}{' at '}{user.userCompanyName}{" "}{user.userCity}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            placeholder="Share your story, project photos, construction tips, or job advise  with people of same field as yours. 
                        Example: How to find work in construction industry..."
                            multiline={true}
                            onScroll={() => { }}
                            style={styles.textInput}
                            onChangeText={text => setFeed({ ...feed, feedContent: text })}
                        />
                    </View>
                </View>
                <DividerHorizontal />
                <View style={styles.groupsContainer}>
                    <Text style={styles.selectrGroupText}> Select Group for Your Post </Text>
                    <View style={[styles.groupListContainer]}>
                        <RadioButtonsTemp
                            titlesArray={rules.rulesGroups}
                            selected={feed.feedGroup}
                            setSelected={(group) => {
                                setFeed({ ...feed, feedGroup: group })
                            }}
                            style={styles.radioButton}
                            horizontal={true}
                        />
                    </View>
                </View>
                <DividerHorizontal />
                <View style={styles.mediaContainer}>
                    <UploadPhoto
                        onUrlChange={(url) => {
                            if (url) {
                                setFeed({ ...feed, feedPhotoUrl: url })
                            } else {
                                // delete feed.feedPhotoUrl
                                (delete feed.feedPhotoUrl);
                                setFeed({ ...feed })
                            }
                        }}
                        title="Add Photo"
                    />
                </View>

                <DividerHorizontal />
                <View style={styles.spacer} />
            </ScrollView>

            <View style={[styles.buttonContainer]}>
                {loading
                    ? <ActivityIndicator size="large" color={colors.primary} />
                    : <ButtonOne
                        title="Post"
                        disabled={!feed.feedContent || loading}
                        onPress={() => {
                            setLoading(true);
                            createFeed(
                                {
                                    feed: feed,
                                    navigationCallback: (feedId) => navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'ViewPostScreen', params: { feedId } }],
                                    }),
                                    setLoading: (loading) => setLoading(loading)
                                }
                            );
                        }}
                    />}
            </View>
        </View>
    )
}

export default CreateFeedScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        flex: 1,
    },
    topContainer: {
        flex: 1,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
    },
    userProfileContainer: {
        flexDirection: 'row',
        marginBottom: spacings.medium,

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
    textInputContainer: {
        minHeight: 150,
        marginBottom: spacings.large,
    },
    textInput: {
        ...textStyles.body,
        height: '100%',
        paddingHorizontal: spacings.small,
        textAlignVertical: 'top',
    },
    groupsContainer: {
        paddingTop: spacings.large,
    },
    selectrGroupText: {
        ...textStyles.heading2,
        marginHorizontal: spacings.large,
    },
    radioButton: {
        marginRight: spacings.small,
        marginBottom: spacings.small / 3,
    },
    groupListContainer: {
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.large,
    },
    mediaContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.large * 1.5,
    },
    addMediaButtonContainer: {
        height: spacings.large * 6,
        width: spacings.large * 6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        marginRight: spacings.small,
    },
    addMediaText: {
        ...textStyles.body,
        marginTop: spacings.small / 2,
    },
    buttonContainer: {
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.large,
        backgroundColor: colors.surface,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    spacer: {
        height: spacings.medium * 4.5 + spacings.large * 2,
    }







})
