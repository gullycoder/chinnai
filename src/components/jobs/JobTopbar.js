import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from '../../context/DesignSystem';


const JobTopbar = ({ job, candidate }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.jobType}>{job.jobType}</Text>
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
            <Text style={styles.bottomCaptions}>
                Company:
                <Text style={styles.topCaptions}> {job.userCompanyName}</Text>
            </Text>
            {job.jobProjectName &&
                <Text style={styles.bottomCaptions}>
                    Project:
                    <Text style={styles.topCaptions}> {job.jobProjectName}</Text>
                </Text>
            }
            <Text style={styles.bottomCaptions}>
                Project:
                <Text style={styles.topCaptions}> Housing project, sector-56</Text>
            </Text>
            {candidate && candidate.candidateStatus === "applied" &&
                <View style={styles.statusContainer}>
                    <Text style={styles.status}>
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
        </View>
    )
}

export default JobTopbar

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surfaceYellow,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
        paddingBottom: spacings.small / 2,
    },
    jobType: {
        ...textStyles.heading2,
        color: colors.primary,
        marginBottom: spacings.medium,
    },
    amount: {
        ...textStyles.heading1,
        marginBottom: spacings.medium
    },
    paymentCycle: {
        ...textStyles.heading3,
        fontWeight: 'normal',
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
        right: 0,
        top: spacings.large,
        paddingHorizontal: spacings.large,
    },

})