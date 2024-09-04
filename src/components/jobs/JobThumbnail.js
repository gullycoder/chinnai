import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { JobsContext } from '../../context/JobsContext'
import { ButtonTwo, colors, DividerHorizontal, iconSizes, spacings, textStyles } from '../../context/DesignSystem';

const JobThumbnail = ({ job, candidate, navigation }) => {
    const { addNewCandidate } = useContext(JobsContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                addNewCandidate({
                    jobId: job.jobId,
                    candidateStatus: "viewed",
                    navigationCallback: () => navigation.navigate('JobDetailsScreen', { jobId: job.jobId })
                });
            }}>
                {job.jobSalary &&
                    <Text style={styles.amount}>
                        Rs. {job.jobSalary}
                        <Text style={styles.paymentCycle}>  per month</Text>
                    </Text>
                }
                {job.jobDailyWageRate &&
                    <Text style={styles.amount}>
                        Rs. {job.jobDailyWageRate}
                        <Text style={styles.paymentCycle}>  per day</Text>
                    </Text>
                }
                <Text style={styles.jobType}>
                    {job.jobType}
                </Text>
                <Text style={styles.topCaptions}>
                    {job.userCompanyName}
                </Text>
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
                <DividerHorizontal style={styles.divider} />

                {job.jobStartDate &&
                    <View style={styles.datesContainer}>
                        <Text style={styles.topCaptions}>
                            <Text style={styles.bottomCaptions}>Start date: </Text>
                            {job.jobStartDate}
                        </Text>
                        <Text style={styles.topCaptions}>
                            <Text style={styles.bottomCaptions}>End date: </Text>
                            {job.jobEndDate}
                        </Text>
                    </View>
                }
                <View style={styles.datesContainer}>
                    <Text style={styles.topCaptions}>
                        <Text style={styles.bottomCaptions}>Start date: </Text>
                        27 Mar, 2022
                    </Text>
                    <Text style={styles.topCaptions}>
                        <Text style={styles.bottomCaptions}>End date: </Text>
                        26 Apr, 2022
                    </Text>
                </View>
                {candidate && candidate.candidateStatus === "applied" &&
                    <View style={styles.statusContainer}>
                        <Text style={styles.status}>
                            {candidate.candidateStatus}
                        </Text>
                    </View>
                }
                {candidate && candidate.candidateStatus === "viewed" &&
                    <View style={[styles.statusContainer, { backgroundColor: colors.background }]}>
                        <Text style={[styles.status, { color: colors.text }]}>
                            {candidate.candidateStatus}
                        </Text>
                    </View>
                }
                {candidate && candidate.candidateStatus === "eligibility failed" &&
                    <View style={[styles.statusContainer, { backgroundColor: colors.background }]}>
                        <Text style={[styles.status, { color: colors.error }]}>
                            {candidate.candidateStatus}
                        </Text>
                    </View>
                }
                <ButtonTwo
                    title={candidate && candidate.candidateStatus === "applied" ? "Call / Message" : "Apply"}
                    onPress={() => {
                        addNewCandidate({
                            jobId: job.jobId,
                            candidateStatus: "viewed",
                            navigationCallback: () => navigation.navigate('JobDetailsScreen', { jobId: job.jobId })
                        });
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default JobThumbnail

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        elevation: 2,
        marginBottom: spacings.medium,
        padding: spacings.medium,
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    amount: {
        ...textStyles.heading1,
        marginBottom: spacings.small,
    },
    paymentCycle: {
        ...textStyles.caption,
    },
    jobType: {
        ...textStyles.heading3,
        color: colors.primary,
        marginBottom: spacings.small / 4,
    },
    topCaptions: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: spacings.small / 4,
    },
    bottomCaptions: {
        ...textStyles.caption,
        fontWeight: 'normal',
    },
    divider: {
        marginTop: spacings.small / 2,
        marginBottom: spacings.small,
    },
    cityAndOpeningsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
    },
    jobOpeningsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    datesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacings.small,
        justifyContent: 'space-between',
    },
    status: {
        ...textStyles.caption,
        color: colors.primary,
        fontWeight: 'bold',
    },
    statusContainer: {
        backgroundColor: colors.backgroundGreen,
        height: spacings.medium * 3,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: -(spacings.medium),
        top: 0,
        paddingHorizontal: spacings.large,
    },





})