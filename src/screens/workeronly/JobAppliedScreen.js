import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useContext, useEffect } from 'react'
import * as Linking from 'expo-linking';
import { JobsContext } from '../../context/JobsContext';
import JobTopbar from '../../components/jobs/JobTopbar';
import { UserContext } from '../../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { ButtonOne, ButtonOneUnfilled, colors, iconSizes, spacings, textStyles } from '../../context/DesignSystem';


const JobAppliedScreen = ({ route, navigation }) => {
    const { jobId } = route.params;
    const { jobs, candidates } = useContext(JobsContext);
    const { user } = useContext(UserContext);
    const job = jobs.find(job => job.jobId === jobId);
    const candidate = candidates.find(candidate => candidate.jobId === job.jobId);

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
            <ScrollView style={styles.scrollView}>
                <JobTopbar job={job} candidate={candidate} />
                <View style={styles.sectionContainer} >
                    <View style={styles.jobAppliedContainer}>
                        <MaterialIcons name="check-circle" size={iconSizes.large * 1.25} color={colors.primary} />
                        <Text style={styles.sectionBody}>
                            Job Applied
                        </Text>
                    </View>
                    <Text style={styles.sectionBody}>Call the company now</Text>
                    <ButtonOne
                        title={`Call ${job.phone}`}
                        style={styles.callButton}
                        onPress={() => callPhoneNumber()}
                    />
                    <ButtonOneUnfilled
                        title={`Message ${job.phone}`}
                        onPress={() => sendWhatsappMessage()}
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonsContainer}>
                <ButtonOneUnfilled
                    title="Job Details"
                    onPress={() => navigation.navigate('JobDetailsScreen', { jobId: job.jobId })}
                />
                <ButtonOne
                    title="See More Jobs"
                    style={styles.seeMoreJobsButton}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'SearchJobsScreen' }]
                    })}
                />
            </View>
        </SafeAreaView>
    )
}

export default JobAppliedScreen

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    sectionContainer: {
        padding: spacings.large,
        backgroundColor: colors.surface,
        marginVertical: spacings.medium,
        height: "90%",
        justifyContent: "center",
    },
    jobAppliedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: spacings.large * 2,
    },
    sectionBody: {
        ...textStyles.heading1,
        marginVertical: spacings.large,
        marginHorizontal: spacings.small / 2,
        textAlign: 'center',
    },
    callButton: {
        marginBottom: spacings.large,
    },
    buttonsContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        padding: spacings.large,
        justifyContent: 'space-between',
    },
    seeMoreJobsButton: {
        flex: 1,
        marginLeft: spacings.large,
    },
})