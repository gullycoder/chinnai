import { StyleSheet, Text, View, Button, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import JobTopbar from '../../components/jobs/JobTopbar'
import { JobsContext } from '../../context/JobsContext';
import { UserContext } from '../../context/UserContext';
import { ButtonOne, spacings, colors, textStyles } from '../../context/DesignSystem';



const EligibilityFailedScreen = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const { jobId } = route.params;
    const { jobs, candidates } = useContext(JobsContext);
    const job = jobs.find(job => job.jobId === jobId);
    const candidate = candidates.find(candidate => candidate.jobId === job.jobId);

    return (
        <View style={styles.container} >
            <StatusBar backgroundColor={colors.primaryDark} />
            <JobTopbar job={job} candidate={candidate} />
            <View style={styles.sectionContainer} >
                <Text style={styles.sectionBody}>Your profile does not meet the requirements of the job</Text>
                <ButtonOne
                    title="See more jobs"
                    onPress={() => {
                        navigation.navigate('SearchJobsScreen')
                    }}
                />
            </View>
        </View>
    )
}

export default EligibilityFailedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    sectionContainer: {
        height: '50%',
        padding: spacings.large,
        backgroundColor: colors.surface,
        marginVertical: spacings.medium,
        justifyContent: 'center',
    },
    sectionBody: {
        ...textStyles.heading1,
        marginBottom: spacings.large,
        textAlign: 'center',
    },



})