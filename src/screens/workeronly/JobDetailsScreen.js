import { StyleSheet, Text, View, Button, StatusBar, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Overlay } from 'react-native-elements';
import * as Linking from 'expo-linking';
import { JobsContext } from '../../context/JobsContext';
import JobTopbar from '../../components/jobs/JobTopbar'
import { ButtonGroup } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/UserContext';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonOneUnfilled, SelectStory, textStyles, opacities, iconSizes, CheckedBoxes } from '../../context/DesignSystem';

const JobDetailsScreen = ({ route, navigation, propsFromPostedJob }) => {

    const { user } = useContext(UserContext);
    const { jobId } = propsFromPostedJob ? propsFromPostedJob : route.params;
    const { jobs, candidates, updateCandidate } = useContext(JobsContext);
    const job = jobId === null ? propsFromPostedJob.job : jobs.find(job => job.jobId === jobId)
    const candidate = propsFromPostedJob ? propsFromPostedJob.candidate : candidates.find(candidate => candidate.jobId === job.jobId);


    const [visible, setVisible] = useState(false);



    useEffect(() => {
        if (propsFromPostedJob) {
            return;
        }
        const unsubscribe = navigation.addListener('focus', () => {
            if (candidate.candidateStatus === "eligibility failed" && user.userDocuments.length === job.jobDocuments.length) {
                updateCandidate({
                    jobId: job.jobId,
                    candidateStatus: "viewed",
                    navigationCallback: () => { }
                });
            }
        });
        return unsubscribe;
    }, [navigation]);


    const documentsFulfilled = (
        propsFromPostedJob
            ? (job.jobDocuments)
                ? job.jobDocuments
                : []
            : (user.userDocuments && job.jobDocuments)
                ? user.userDocuments.filter(document => job.jobDocuments.includes(document))
                : []
    );

    const callPhoneNumber = () => {
        Linking.openURL(`tel:${job.phone}`);
    }
    const sendWhatsappMessage = () => {
        try {
            const message = `Hi ${job.userName}, I am interested in your job for ${job.jobType} posted on Chinaai App.`;
            Linking.openURL(`whatsapp://send?text=${message}&phone=${job.phone}`);
            console.log('whatsapp message sent');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView style={styles.scrollContainer}>
                <JobTopbar job={job} candidate={candidate} />
                <View style={[styles.jobDetailsContainer]}>
                    <DividerHorizontal style={styles.divider} />

                    {/* {job.jobStartDate && */}
                    <View style={styles.datesContainer}>
                        <MaterialIcons name="date-range" size={iconSizes.medium} color={colors.icon} />
                        <View style={styles.datesInnerContainer}>
                            <Text style={styles.topCaptions}>
                                <Text style={styles.bottomCaptions}>Start date: </Text>
                                {job.jobStartDate} 27 Mar 2022
                            </Text>
                            <Text style={styles.topCaptions}>
                                <Text style={styles.bottomCaptions}>End date: </Text>
                                {job.jobEndDate} 27 Apr 2022
                            </Text>
                        </View>
                    </View>
                    {/* } */}

                    <View style={styles.jobDetailsInnerContainers}>
                        <MaterialIcons name="location-on" size={iconSizes.medium} color={colors.icon} />
                        <Text style={[styles.topCaptions, { marginLeft: spacings.medium, alignSelf: 'flex-end' }]}>
                            {job.jobCity}
                        </Text>
                    </View>

                    {job.jobOpenings &&
                        <View style={styles.jobDetailsInnerContainers}>
                            <MaterialIcons name="groups" size={iconSizes.medium} color={colors.icon} />
                            <Text style={[styles.topCaptions, { marginLeft: spacings.medium, alignSelf: 'flex-end' }]}>
                                {job.jobOpenings} Openings
                            </Text>
                        </View>
                    }
                </View>

                {job.jobDocuments &&
                    <View style={styles.sectionContainer} >
                        <Text style={styles.sectionHeading}>Job Requirements</Text>
                        <CheckedBoxes
                            titlesArray={job.jobDocuments}
                            checkedTitlesArray={documentsFulfilled}
                            containerStyle={styles.documentsContainer}
                        />
                    </View>
                }

                {job.jobDescription &&
                    <View style={styles.sectionContainer} >
                        <Text style={styles.sectionHeading}>Job Description</Text>
                        <Text style={styles.jobDescriptionBody}>
                            {job.jobDescription}
                        </Text>
                    </View>}

                <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                    <View style={styles.overlayContainer}>
                        <Text style={styles.overlayText}>To Apply for jobs, please complete your visiting card</Text>
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
                                            jobId: job.jobId,
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
            </ScrollView>



            {job.jobDocuments && (documentsFulfilled.length !== job.jobDocuments.length)
                ? <View style={styles.applyContainer} >
                    <ButtonOne
                        title="Apply"
                        style={styles.applyButton}
                        onPress={() => {
                            (!user.userCardComplete)
                                ? setVisible(true)
                                : navigation.navigate('EligibilityCheckScreen', { jobId: job.jobId })
                        }}
                    />
                </View>
                : <View style={styles.contactContainer}>
                    <ButtonOne
                        title={`Call ${job.phone}`}
                        style={styles.callButton}
                        onPress={() => {
                            if (propsFromPostedJob) {
                                return;
                            }
                            if (!user.userCardComplete) {
                                setVisible(true);
                                return;
                            }
                            callPhoneNumber();
                            updateCandidate({
                                jobId: job.jobId,
                                candidateStatus: "applied",
                                navigationCallback: () => { }
                            });
                        }}
                    />
                    <ButtonOneUnfilled
                        title={`Message ${job.phone}`}
                        onPress={() => {
                            if (propsFromPostedJob) {
                                return
                            }
                            if (!user.userCardComplete) {
                                setVisible(true);
                                return;
                            }
                            sendWhatsappMessage();
                            updateCandidate({
                                jobId: job.jobId,
                                candidateStatus: "applied",
                                navigationCallback: () => { }
                            });
                        }}
                    />
                </View>
            }



        </SafeAreaView>
    )
}

export default JobDetailsScreen



const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    divider: {
        backgroundColor: "black",
        opacity: opacities.o4,
        marginBottom: spacings.large,
    },
    jobDetailsContainer: {
        backgroundColor: colors.surfaceYellow,
        paddingHorizontal: spacings.large,
        // paddingBottom: spacings.medium,
        marginBottom: spacings.medium,
    },
    jobDetailsInnerContainers: {
        flexDirection: 'row',
        marginBottom: spacings.small,
    },
    topCaptions: {
        ...textStyles.heading3,
        marginBottom: spacings.medium,
    },
    bottomCaptions: {
        ...textStyles.heading3,
        fontWeight: 'normal',
        marginBottom: spacings.medium,
    },
    datesContainer: {
        flexDirection: 'row',
    },
    datesInnerContainer: {
        marginLeft: spacings.medium,
    },
    sectionContainer: {
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
        paddingBottom: spacings.small,
        backgroundColor: colors.surface,
        marginBottom: spacings.medium,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.large,
    },
    documentsContainer: {
        // paddingHorizontal: spacings.large,
        // paddingVertical: spacings.medium,
    },
    jobDescriptionBody: {
        flex: 1,
        ...textStyles.body,
        color: colors.text,
        marginBottom: spacings.medium,
    },
    applyContainer: {
        backgroundColor: colors.surface,
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.medium,
    },
    contactContainer: {
        // flexDirection: 'row',
        backgroundColor: colors.surface,
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.medium,
    },
    callButton: {
        marginBottom: spacings.medium,
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