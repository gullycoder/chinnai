import { Button, SafeAreaView, StyleSheet, Text, View, ScrollView, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { JobsContext } from '../../context/JobsContext';
import { MaterialIcons } from '@expo/vector-icons';

import JobDetailsScreen from '../workeronly/JobDetailsScreen';
import CandidateThumbnail from '../../components/jobs/CandidateThumbnail';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, RadioButtons, SelectStory, textStyles, opacities, iconSizes, textInputStyles, CheckBoxes, ButtonOneUnfilled } from '../../context/DesignSystem';


const PostedJobDetailsScreen = ({ route, navigation }) => {
    const { jobId } = route.params;
    const { jobs, candidates, updateJob, fetchCandidatesByJobId } = useContext(JobsContext);
    const job = jobs.find(job => job.jobId === jobId);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'PostJobsScreen' }],
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


    useEffect(() => {
        fetchCandidatesByJobId(jobId);
    }, [jobId])

    const [activeTab, setActiveTab] = useState('Candidates');

    const CandidatesList = candidates.map((candidate, index) => {
        return (
            <CandidateThumbnail
                candidate={candidate}
                job={job}
                key={index}
                navigation={navigation}
            />
        )
    })


    if (job.jobStatus === "not-approved") {
        return (
            <View style={styles.notApprovedContainer}>
                <StatusBar backgroundColor={colors.primaryDark} />
                <Text style={styles.notApprovedText}>
                    Job not approved
                </Text>
                <Text style={styles.tabContentsSubHeading}>
                    Your job post was not approved because it did not meet our requirements.
                    Please contact the employer to approve your job post.
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.sectionContainer}>
                <Text style={styles.mainHeading}>
                    {job.jobType}
                </Text>
                <>
                    {job.jobProjectName &&
                        <Text style={styles.bottomCaptions}>
                            Project:
                            <Text style={styles.topCaptions}> {job.jobProjectName} | </Text>
                        </Text>}
                    {job.jobSalary &&
                        <Text style={styles.bottomCaptions}>
                            Monthly Salary:
                            <Text style={styles.topCaptions}> {job.jobSalary}</Text>
                        </Text>}
                    {job.jobDailyWageRate &&
                        <Text style={styles.bottomCaptions}>
                            Daily Wage Rate:
                            <Text style={styles.topCaptions}> {job.jobDailyWageRate}</Text>
                        </Text>}
                </>
                {job.jobStatus === "expired" &&
                    <View style={styles.statusAndButtonContainer}>
                        <View style={[styles.statusContainer, { backgroundColor: colors.background }]}>
                            <Text style={[styles.status, { color: colors.error }]}>
                                {job.jobStatus}
                            </Text>
                        </View>
                        <ButtonTwo title="Renew Job" onPress={() => {
                            updateJob({
                                jobId: job.jobId,
                                jobStatus: "active",
                            });
                        }} />
                    </View>
                }
                {job.jobStatus === "active" &&
                    <View style={styles.statusAndButtonContainer}>
                        <View style={[styles.statusContainer, { backgroundColor: colors.background }]}>
                            <Text style={[styles.status, { color: colors.primary }]}>
                                {job.jobStatus}
                            </Text>
                        </View>
                        <ButtonTwo title="Expire Job" onPress={() => {
                            updateJob({
                                jobId: job.jobId,
                                jobStatus: "expired",
                            });
                        }} />
                    </View>
                }
                {job.jobStatus === "not-approved" &&
                    <View style={styles.statusAndButtonContainer}>
                        <View style={[styles.statusContainer, { backgroundColor: colors.background }]}>
                            <Text style={[styles.status, { color: colors.text }]}>
                                {job.jobStatus}
                            </Text>
                        </View>
                        <ButtonTwo title="Edit Job" onPress={() => {
                            navigation.navigate('CreateJobScreen', { jobId });
                        }} />
                    </View>
                }
                {job.jobStatus === "under-review" &&
                    <View style={styles.statusAndButtonContainer}>
                        <View style={[styles.statusContainer, { backgroundColor: colors.background }]}>
                            <Text style={[styles.status, { color: colors.secondaryDark }]}>
                                {job.jobStatus}
                            </Text>
                        </View>
                        <ButtonTwo title="Edit Job" onPress={() => {
                            navigation.navigate('CreateJobScreen', { jobId });
                        }} />
                    </View>
                }
                <DividerHorizontal />
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            setActiveTab('Candidates');
                        }}
                        style={[
                            styles.tabContainer,
                            { borderBottomColor: activeTab === 'Candidates' ? colors.primary : colors.background }
                        ]}
                    >
                        <Text style={[
                            styles.tabText,
                            { color: activeTab === 'Candidates' ? colors.primary : colors.text }]
                        }>
                            Candidates
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setActiveTab('Job Details');
                        }}
                        style={[
                            styles.tabContainer,
                            { borderBottomColor: activeTab === 'Job Details' ? colors.primary : colors.background }
                        ]}
                    >
                        <Text style={[
                            styles.tabText,
                            { color: activeTab === 'Job Details' ? colors.primary : colors.text }]
                        }>
                            Job Details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView>


                {activeTab === 'Candidates'
                    ? job.jobStatus === "under-review"
                        ? <View style={styles.tabContentsContainer}>
                            <Text style={styles.tabContentsHeading}>
                                Under Review
                            </Text>
                            <Text style={styles.tabContentsSubHeading}>
                                Your job is currently under review. It will be visible to candidates after it is approved.
                            </Text>
                        </View>
                        : <View style={styles.tabContentsContainer}>
                            {CandidatesList}
                        </View>
                    : <View style={styles.tabContentsContainer}>
                        <Text style={styles.sectionHeading}>This is how your job will like to the candidates</Text>
                        <View style={styles.jobDetailsContainer} >
                            <JobDetailsScreen
                                propsFromPostedJob={{
                                    jobId: job.jobId,
                                    candidate: {
                                        candidateStatus: "viewed",
                                    }
                                }} />
                        </View>
                    </View>
                }
            </ScrollView>

            <View style={styles.bottomButtonContainer}>
                <ButtonOne
                    title="See All Posted Jobs"
                    style={styles.seeAllPostedJobsButton}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'PostJobsScreen' }],
                    })}
                />
            </View>
        </SafeAreaView>
    )
}

export default PostedJobDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    mainHeading: {
        ...textStyles.heading1,
        fontWeight: 'bold',
        marginBottom: spacings.small / 2
    },
    sectionContainer: {
        backgroundColor: colors.surface,
        borderRadius: 4,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
        elevation: 4,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.large,
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
    statusAndButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: spacings.small,
        marginBottom: spacings.small,
    },
    statusContainer: {
        backgroundColor: colors.background,
        height: spacings.medium * 3,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: spacings.large,
    },
    status: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'bold',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    tabContainer: {
        flex: 1,
        borderBottomWidth: 3,
        borderBottomColor: colors.background,
        paddingVertical: spacings.medium,
        paddingHorizontal: spacings.large,
    },
    tabText: {
        ...textStyles.heading3,
        textAlign: 'center',
    },
    candidatesContainer: {
        flex: 1,
        marginBottom: spacings.large,
    },
    title: {
        ...textStyles.heading3,
        fontWeight: 'bold',
        marginBottom: spacings.medium,
    },
    tabViewContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    jobDetailsContainer: {
        marginHorizontal: spacings.large,
        marginVertical: spacings.small,
        padding: spacings.small / 1.5,
        backgroundColor: colors.border,
        borderColor: colors.borderLight,
        borderRadius: 12,
    },
    tabContentsContainer: {
        backgroundColor: colors.background,
        borderRadius: 4,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
    },
    tabContentsHeading: {
        ...textStyles.heading1,
        textAlign: 'center',
        marginTop: spacings.large * 2,
        marginBottom: spacings.medium,
    },
    bottomButtonContainer: {
        backgroundColor: colors.surface,
        padding: spacings.large,
    },
    tabContentsSubHeading: {
        ...textStyles.body,
        marginBottom: spacings.medium,
        textAlign: 'center',
        marginHorizontal: spacings.large,
    },
    notApprovedContainer: {
        flex: 1,
        backgroundColor: colors.background,
        padding: spacings.large,
    },
    notApprovedText: {
        ...textStyles.heading1,
        textAlign: 'center',
        marginTop: spacings.large * 2,
        marginBottom: spacings.medium,
    },










})