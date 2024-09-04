import { Button, StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Overlay } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '../../context/UserContext'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, CheckBoxes, CheckBoxesTemp } from '../../context/DesignSystem';
import Card from '../../components/card/Card';
import { MaterialIcons } from '@expo/vector-icons';
import { FeedsContext } from '../../context/FeedsContext';
import FeedPost from '../../components/groups/FeedPost';
import { JobsContext } from '../../context/JobsContext';
import Documents from '../../components/card/Documents';
import { TendersContext } from '../../context/TendersContext';


const CardScreen = ({ navigation }) => {
    const { user, rules } = useContext(UserContext);
    const { feeds, fetchFeed } = useContext(FeedsContext);
    const { jobs, fetchJobs, candidates, fetchCandidates, fetchPostedJobs } = useContext(JobsContext);
    const { tenders, fetchTenders, bidders, fetchBidders } = useContext(TendersContext);

    const [visible, setVisible] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('SettingsScreen')}
                    style={styles.settingsButtonContainer}
                >
                    <MaterialIcons name="settings" size={iconSizes.medium} color='white' />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchCandidates(user.userId);
            fetchBidders(user.userId);
            fetchPostedJobs(user.userId);
            fetchFeed();
        });
        return unsubscribe;
    }, [navigation]);

    const myFeeds = feeds.filter(feed => feed.userId === user.userId);

    const myFeedsList = myFeeds.map((feed, index) => {
        return (
            <FeedPost
                key={index}
                item={feed}
                navigation={navigation}
                screen={"Group Screen"}
                containerStyle={{ marginBottom: spacings.medium }}
                navigateToCardScreen={true}
            />
        )
    })


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView>
                <View style={styles.topContainer}>
                    <View style={styles.editButtonContainer}>
                        <MaterialIcons name="edit" size={iconSizes.small} color={colors.primary} style={styles.editIcon} />
                        <ButtonTwoUnfilled
                            title="Edit Card"
                            style={styles.editButton}
                            onPress={() => {
                                navigation.navigate('CreateEditCardScreen')
                            }}
                        />
                    </View>
                    <View style={styles.cardContainer}>
                        <Card userType={user.userType} />
                    </View>
                    {user.userType === "worker" &&
                        <View style={styles.containerBelowCard}>
                            <TouchableOpacity
                                style={styles.box}
                                onPress={() => {
                                    navigation.navigate('SearchJobsStack', {
                                        screen: 'MyJobsScreen',
                                    })
                                }}
                            >
                                <Text style={styles.boxHeading}>
                                    {candidates.filter(candidate => candidate.candidateStatus === "applied").length}
                                </Text>
                                <Text style={styles.boxText}>
                                    Applied Jobs
                                </Text>
                                <MaterialIcons name="arrow-right" size={iconSizes.large} color='white' style={styles.boxIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.box}
                                onPress={() => setVisible(!visible)}
                            >
                                <Text style={styles.boxHeading}>
                                    {user.userDocuments ? user.userDocuments.length : 0}/{rules.rulesDocuments.length}
                                </Text>
                                <Text style={styles.boxText}>
                                    Documents / Assets
                                </Text>
                                <MaterialIcons name="arrow-right" size={iconSizes.large} color='white' style={styles.boxIcon} />
                            </TouchableOpacity>
                        </View>}
                    {user.userType === "contractor" &&
                        <View style={styles.containerBelowCard}>
                            <TouchableOpacity
                                style={styles.box}
                                onPress={() => {
                                    navigation.navigate('TendersStack', {
                                        screen: 'MyTendersScreen',
                                    })
                                }}
                            >
                                <Text style={styles.boxHeading}>
                                    {bidders.filter(bidder => bidder.bidderStatus === "applied").length}
                                </Text>
                                <Text style={styles.boxText}>
                                    Tenders Applied
                                </Text>
                                <MaterialIcons name="arrow-right" size={iconSizes.large} color='white' style={styles.boxIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.box}
                                onPress={() => {
                                    navigation.navigate('PostJobsStack', {
                                        screen: 'PostJobsScreen',
                                    })
                                }}
                            >
                                <Text style={styles.boxHeading}>
                                    {jobs ? jobs.length : 0}
                                </Text>
                                <Text style={styles.boxText}>
                                    Jobs Posted
                                </Text>
                                <MaterialIcons name="arrow-right" size={iconSizes.large} color='white' style={styles.boxIcon} />
                            </TouchableOpacity>
                        </View>}

                </View>
                <View style={styles.bottomContainer}>
                    <Text style={styles.myActivityHeading}>
                        My Activity
                    </Text>
                    {myFeedsList && myFeedsList.length === 0 &&
                        <View style={styles.myActivityContainer}>
                            <Text style={styles.noActivityText}>
                                You have not created any posts yet
                            </Text>
                            <ButtonOne
                                title="Create a new post"
                                // style={styles.createPostButton}
                                onPress={() => {
                                    navigation.navigate('GroupsStack', { screen: 'CreateFeedScreen' })
                                }}
                            />
                        </View>}
                    <View style={styles.myActivityContainer}>
                        {myFeedsList}
                    </View>
                </View>

                {/* {user.userType === 'contractor' && (
                    <Button
                        title="Create Tender"
                        onPress={() => {
                            navigation.navigate('TendersStack', { screen: 'CreateTenderScreen' })
                        }}
                    />
                )} */}

            </ScrollView>
            <Overlay
                isVisible={visible}
                onBackdropPress={() => setVisible(!visible)}
                overlayStyle={styles.overlay}
            >
                <Text style={styles.overlayHeading}>
                    Please select the documents or assets that you currently have
                </Text>
                <Documents />
                <ButtonOne
                    title="Save"
                    style={styles.overlayButton}
                    onPress={() => {
                        setVisible(!visible);
                    }}
                />
            </Overlay>
        </View>
    )
}

export default CardScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    topContainer: {
        backgroundColor: colors.primary,
        paddingTop: spacings.large + spacings.small / 2,
        paddingHorizontal: spacings.large,
        paddingBottom: spacings.large,
        elevation: 1,
    },
    cardContainer: {
        height: 190,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        // elevation: 2,
    },
    editButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: spacings.small / 2,
        alignSelf: 'center',
        zIndex: 1,
    },
    editButton: {
        paddingLeft: spacings.large * 1.35,
        paddingRight: spacings.small / 1.35,
    },
    editIcon: {
        position: 'absolute',
        left: spacings.small / 2,
        zIndex: 2,
    },
    containerBelowCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacings.large,
    },
    box: {
        height: spacings.medium * 5,
        width: '48%',
        borderRadius: 4,
        backgroundColor: colors.primaryDark,
        elevation: 2,
        paddingHorizontal: spacings.medium,
        paddingVertical: spacings.small,
        justifyContent: 'space-between',
    },
    boxHeading: {
        ...textStyles.heading1,
        fontSize: textStyles.heading1.fontSize * 0.8,
        fontWeight: 'bold',
        color: 'white',
    },
    boxText: {
        ...textStyles.caption,
        color: colors.surfaceGreen,
    },
    boxIcon: {
        position: 'absolute',
        right: spacings.small / 2,
        top: spacings.small,
    },
    bottomContainer: {
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
    overlay: {
        width: '80%',
        height: 'auto',
        backgroundColor: colors.surface,
        borderRadius: 8,
        padding: spacings.large * 2,
    },
    overlayHeading: {
        ...textStyles.heading1,
        fontSize: textStyles.heading1.fontSize * 0.8,
        marginBottom: spacings.large * 2,
        textAlign: 'center',
    },
    overlayButton: {
        marginTop: spacings.large * 2,
    },
    settingsButtonContainer: {
        backgroundColor: colors.primaryDark,
        height: spacings.medium * 2.8,
        width: spacings.medium * 2.8,
        borderRadius: spacings.medium * 2.8 / 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noActivityText: {
        ...textStyles.heading2,
        fontWeight: 'normal',
        textAlign: 'center',
        marginTop: spacings.large * 2,
        marginBottom: spacings.large,
    },


})