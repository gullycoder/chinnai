import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { JobsContext } from '../../context/JobsContext';
import { ButtonTwo, colors, DividerHorizontal, iconSizes, spacings, textStyles } from '../../context/DesignSystem';


const PostedJobThumbnail = ({ job, navigation }) => {
    const { updateJob } = useContext(JobsContext);

    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => {
                navigation.navigate('PostedJobDetailsScreen', { jobId: job.jobId });
            }}>
                <Text style={styles.jobType}>
                    {job.jobType}
                </Text>
                {job.jobSalary &&
                    <Text style={styles.topCaptions}>
                        <Text style={styles.bottomCaptions}>Monthly salary: </Text>
                        Rs. {job.jobSalary}
                    </Text>
                }
                {job.jobDailyWageRate &&
                    <Text style={styles.topCaptions}>
                        <Text style={styles.bottomCaptions}>Daily wage rate: </Text>
                        Rs. {job.jobDailyWageRate}
                    </Text>
                }
                {/* {job.jobProjectName && */}
                <Text style={styles.topCaptions}>
                    <Text style={styles.bottomCaptions}>Project: </Text>
                    {job.jobProjectName} abc
                </Text>
                {/* } */}
                <View style={styles.cityAndOpeningsContainer}>
                    <Text style={styles.topCaptions}>
                        {job.jobCity}
                    </Text>
                    {job.jobOpenings &&
                        <View style={styles.jobOpeningsContainer}>
                            <MaterialIcons name="groups" size={iconSizes.medium} color={colors.icon} />
                            <Text style={[styles.bottomCaptions, { marginLeft: spacings.small / 2 }]}>
                                {job.jobOpenings} Openings
                            </Text>
                        </View>
                    }
                </View>

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
                            navigation.navigate('CreateJobScreen', { jobId: job.jobId });
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
                            navigation.navigate('CreateJobScreen', { jobId: job.jobId });
                        }} />
                    </View>
                }
            </TouchableOpacity>
        </View>
    )
}

export default PostedJobThumbnail

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        elevation: 2,
        marginBottom: spacings.medium,
        padding: spacings.medium,
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    jobType: {
        ...textStyles.heading3,
        color: colors.primary,
        marginBottom: spacings.small,
    },
    topCaptions: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: spacings.small / 2,
    },
    bottomCaptions: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'normal',
    },
    divider: {
        marginTop: spacings.small / 2,
        marginBottom: spacings.small,
    },
    cityAndOpeningsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    jobOpeningsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statusAndButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: spacings.medium,
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



})