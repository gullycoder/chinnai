import { Button, FlatList, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { JobsContext } from '../../context/JobsContext';
import { UserContext } from '../../context/UserContext';
import PostedJobThumbnail from '../../components/jobs/PostedJobThumbnail';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from '../../context/DesignSystem';

const PostJobsScreen = ({ navigation }) => {
    const { user } = useContext(UserContext)
    const { jobs, fetchPostedJobs } = useContext(JobsContext);

    useEffect(() => {
        fetchPostedJobs(user.userId);
    }, [])

    const postedJobsList = jobs.map((job) => {
        return (
            <PostedJobThumbnail
                key={job.jobId}
                job={job}
                navigation={navigation}
            />
        )
    })

    return (
        <View style={styles.container} >
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.buttonContainer}>
                <ButtonOne
                    title="Post a New Job"
                    onPress={() => navigation.navigate('CreateJobScreen', { jobId: "to-be-created" })}
                />
            </View>
            <ScrollView style={styles.listContainer}>
                <Text style={styles.sectionHeading}>
                    My Posted Jobs
                </Text>
                {jobs.length > 0
                    ? postedJobsList
                    : <Text style={styles.noJobsText}>No jobs posted yet</Text>
                }
            </ScrollView>
        </View>
    )
}

export default PostJobsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    buttonContainer: {
        padding: spacings.large,
        backgroundColor: colors.surface,
        elevation: 2,
    },
    listContainer: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.large,
    },
    noJobsText: {
        ...textStyles.heading2,
        fontWeight: 'normal',
        textAlign: 'center',
        margin: spacings.large * 2,
    },




})