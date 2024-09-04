import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar } from 'react-native'
import React, { useContext, useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { JobsContext } from '../../context/JobsContext';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, RadioButtons, SelectStory, textStyles, opacities, iconSizes, textInputStyles, CheckBoxes, ButtonOneUnfilled } from '../../context/DesignSystem';
import JobDetailsScreen from '../workeronly/JobDetailsScreen';



const ReviewJobScreen = ({ navigation }) => {
    const { jobForReview, createJob } = useContext(JobsContext);
    const [loading, setLoading] = useState(false);

    const [checked, setChecked] = useState(false);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView>
                <Text style={styles.mainHeading}>Review Job</Text>
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeading}>This is how your job will like to the candidates</Text>
                    <View style={styles.previewContainer}>
                        <JobDetailsScreen propsFromPostedJob={{
                            job: jobForReview,
                            jobId: null,
                            candidate: {
                                candidateStatus: "viewed",
                            }
                        }} />
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionHeading}>Please note</Text>
                    <View style={styles.instructionsContainer}>
                        <MaterialIcons name="phone-callback" size={iconSizes.large} color="purple" />
                        <Text style={styles.instructions}>
                            Please answer the phone when candidates call you or message you a on WhatsApp
                        </Text>
                    </View>
                    <View style={styles.instructionsContainer}>
                        <MaterialIcons name="fact-check" size={iconSizes.large} color={colors.primary} />
                        <Text style={styles.instructions}>
                            Please provide complete information to the candidates about the job location and mobilization support, if any
                        </Text>
                    </View>
                    <View style={styles.instructionsContainer}>
                        <MaterialIcons name="toggle-off" size={iconSizes.large} color={colors.error} />
                        <Text style={styles.instructions}>
                            Deactivate the job if you don't want to accept any more candidates
                        </Text>
                    </View>
                    <DividerHorizontal style={styles.divider} />
                    <TouchableOpacity
                        onPress={() => {
                            setChecked(!checked);
                        }}
                        style={styles.conditionsContainer}
                    >
                        {!checked ?
                            <MaterialIcons name="check-box-outline-blank" size={iconSizes.large} color={colors.icon} />
                            : <MaterialIcons name="check-box" size={iconSizes.large} color={colors.primary} />
                        }
                        <Text style={styles.conditionsText}>
                            I agree to the Chinaai Employer Terms of Service and Code of Conduct
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.buttonsContainer}>
                        <ButtonOneUnfilled
                            title="Go back"
                            onPress={() => {
                                // go back
                                navigation.goBack();
                            }}
                        />
                        {!loading
                            ? <ButtonOne
                                title="Create Job Post"
                                disabled={!checked || loading}
                                style={styles.createJobButton}
                                onPress={() => {
                                    setLoading(true);
                                    createJob(
                                        {
                                            job: jobForReview,
                                            setLoading: setLoading,
                                            navigationCallback: (jobId) => navigation.reset({
                                                index: 0,
                                                routes: [{ name: 'PostedJobDetailsScreen', params: { jobId } }],
                                            })
                                        }
                                    );
                                }}
                            />
                            : <ActivityIndicator size="large" color={colors.primary} />
                        }
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ReviewJobScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    mainHeading: {
        ...textStyles.heading1,
        fontWeight: 'bold',
        // textAlign: 'center',
        margin: spacings.large,
    },
    sectionContainer: {
        backgroundColor: colors.surface,
        borderRadius: 4,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
        paddingBottom: spacings.small,
        marginBottom: spacings.large,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.large,
    },
    previewContainer: {
        marginHorizontal: spacings.large,
        marginVertical: spacings.small,
        padding: spacings.small / 1.5,
        backgroundColor: colors.border,
        borderColor: colors.borderLight,
        borderRadius: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        paddingVertical: spacings.small,
        justifyContent: 'space-between',
    },
    createJobButton: {
        flex: 1,
        marginLeft: spacings.large,
    },
    instructionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacings.large,
        paddingHorizontal: spacings.medium,
    },
    instructions: {
        ...textStyles.body,
        marginHorizontal: spacings.large,
        marginBottom: spacings.medium,
    },
    divider: {
        marginVertical: spacings.small,
    },
    conditionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacings.large,
    },
    conditionsText: {
        ...textStyles.heading3,
        margin: spacings.medium,
    },

})