import { StyleSheet, Text, View, Button, SafeAreaView, ScrollView, StatusBar } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ButtonGroup } from 'react-native-elements';
import JobTopbar from '../../components/jobs/JobTopbar';
import { JobsContext } from '../../context/JobsContext';
import { UserContext } from '../../context/UserContext';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes, CheckedBoxes, CheckBoxes } from '../../context/DesignSystem';


const EligibilityCheckScreen = ({ route, navigation }) => {
    const { jobId } = route.params;
    const { jobs, candidates, updateCandidate } = useContext(JobsContext);
    const { user, updateUserDocuments } = useContext(UserContext);
    const job = jobs.find(job => job.jobId === jobId);
    const candidate = candidates.find(candidate => candidate.jobId === job.jobId);


    const [documentsSelected, setDocumentsSelected] = useState([]);

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView style={styles.scrollView}>
                <JobTopbar job={job} candidate={candidate} />
                <View style={styles.sectionContainer} >
                    <Text style={styles.sectionHeading}>
                        Job Description
                    </Text>
                    <Text style={styles.sectionBody}>
                        Please select the douments that you have?
                    </Text>
                    <CheckBoxes
                        titlesArray={job.jobDocuments}
                        selectedArray={documentsSelected}
                        setSelectedArray={setDocumentsSelected}
                    />

                </View>
            </ScrollView>

            <View style={styles.applyContainer} >
                <ButtonOne
                    title="Next"
                    style={styles.button}
                    onPress={() => {
                        // if all documents selected, then navigate to JobAppliedScreen
                        if (documentsSelected.length === job.jobDocuments.length) {
                            updateCandidate({
                                jobId: job.jobId,
                                candidateStatus: "applied",
                                navigationCallback: () => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'JobAppliedScreen', params: { jobId: job.jobId } }]
                                    });
                                }
                            });
                            updateUserDocuments(job.jobDocuments);
                        } else {
                            updateCandidate({
                                jobId: job.jobId,
                                candidateStatus: "eligibility failed",
                                navigationCallback: () => {
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'EligibilityFailedScreen', params: { jobId: job.jobId } }]
                                    });
                                }
                            });
                        }
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default EligibilityCheckScreen

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
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
        paddingBottom: spacings.small,
        backgroundColor: colors.surface,
        marginVertical: spacings.medium,
    },
    sectionBody: {
        ...textStyles.heading1,
        marginBottom: spacings.large,
    },
    button: {
        marginHorizontal: spacings.large,
        marginVertical: spacings.medium,
    },
    applyContainer: {
        backgroundColor: colors.surface,
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.medium,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.large,
    },


})