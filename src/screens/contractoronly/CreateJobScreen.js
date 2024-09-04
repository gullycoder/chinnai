import React, { useState, useContext, useRef } from 'react';
import { Text, StyleSheet, Button, TextInput, View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import * as Yup from 'yup';
import { UserContext } from '../../context/UserContext';
import { JobsContext } from '../../context/JobsContext';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, RadioButtons, SelectStory, textStyles, opacities, iconSizes, textInputStyles, CheckBoxes } from '../../context/DesignSystem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CreateJobScreen = ({ route, navigation }) => {
    const { jobId } = route.params;
    const { user, rules } = useContext(UserContext);
    const { jobs, setJobForReview } = useContext(JobsContext);
    const job = jobId !== "to-be-created" ? jobs.find(job => job.jobId === jobId) : {};
    const [localJob, setLocalJob] = useState({ ...job, phone: user.phone });

    const [skipDocuments, setSkipDocuments] = useState('');

    const scrollViewRef = useRef();



    return (
        // <KeyboardAwareScrollView extraHeight={100} >

        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView
                ref={scrollViewRef}
                onLayout={() => {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                }}
                onContentSizeChange={(contentWidth, contentHeight) => {
                    scrollViewRef.current.scrollToEnd({ animated: true });
                }}
                style={styles.scrollView}
            >
                <Text style={styles.mainHeading}>
                    Post a Job
                </Text>
                <Text style={styles.sectionHeading}>
                    Job title
                </Text>
                <View style={styles.sectionContainer}>
                    <TextInput
                        style={styles.textInput}
                        autoFocus={true}
                        placeholder="Enter job title"
                        value={localJob.jobTitle}
                        onChangeText={(text) => setLocalJob({ ...localJob, jobTitle: text })}
                    />
                </View>
                {localJob.jobTitle
                    ? <View>
                        <Text style={styles.sectionHeading}>Job types</Text>
                        <View style={styles.sectionContainer}>
                            <RadioButtons
                                titlesArray={rules.rulesJobTypes}
                                selected={localJob.jobType}
                                setSelected={(selected) => {
                                    setLocalJob({ ...localJob, jobType: selected });
                                }}
                            />
                        </View>
                    </View>
                    : null}
                {localJob.jobType
                    ? <>
                        <Text style={styles.sectionHeading}>Education</Text>
                        <View style={styles.sectionContainer}>
                            <RadioButtons
                                titlesArray={[...rules.rulesEducation, 'Skip']}
                                selected={localJob.jobEducation}
                                setSelected={(selected) => {
                                    setLocalJob({ ...localJob, jobEducation: selected });
                                }}
                            />
                        </View>
                    </>
                    : null}
                {localJob.jobEducation
                    ? <>
                        <Text style={styles.sectionHeading}>Experience required</Text>
                        <View style={styles.sectionContainer}>
                            <RadioButtons
                                titlesArray={['Fresher', 'Experienced', 'Skip']}
                                selected={localJob.jobExperience}
                                setSelected={(selected) => {
                                    setLocalJob({ ...localJob, jobExperience: selected });
                                }}
                            />
                            {localJob.jobExperience === "Experienced" &&
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                    value={localJob.jobExperienceMinYears}
                                    placeholder="Minimum years of experience"
                                    onChangeText={(num) => setLocalJob({ ...localJob, jobExperienceMinYears: num })}
                                />
                            }
                        </View>
                    </>
                    : null}
                {localJob.jobExperience
                    ? <>
                        <Text style={styles.sectionHeading}>Job openings</Text>
                        <View style={styles.sectionContainer}>
                            <TextInput
                                style={styles.textInput}
                                keyboardType="numeric"
                                value={localJob.jobOpenings}
                                placeholder="*Number of openings"
                                onChangeText={(num) => setLocalJob({ ...localJob, jobOpenings: num })}
                            />
                        </View>
                    </>
                    : null}
                {localJob.jobOpenings
                    ? <>
                        <Text style={styles.sectionHeading}>Select Payment Type</Text>
                        <View style={styles.sectionContainer}>
                            <RadioButtons
                                titlesArray={['Salaried', 'Daily Wage']}
                                selected={localJob.jobPaymentType}
                                setSelected={(selected) => {
                                    setLocalJob({ ...localJob, jobPaymentType: selected });
                                }}
                            />
                            {localJob.jobPaymentType === "Salaried" &&
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                    value={localJob.jobSalary}
                                    placeholder="*Monthly salary"
                                    onChangeText={(num) => setLocalJob({ ...localJob, jobSalary: num })}
                                />
                            }
                            {localJob.jobPaymentType === "Daily Wage" &&
                                <TextInput
                                    style={styles.textInput}
                                    keyboardType="numeric"
                                    value={localJob.jobDailyWageRate}
                                    placeholder="*Daily wage rate"
                                    onChangeText={(num) => setLocalJob({ ...localJob, jobDailyWageRate: num })}
                                />

                            }
                        </View>
                    </>
                    : null}
                {localJob.jobSalary || localJob.jobDailyWageRate
                    ? <>
                        <Text style={styles.sectionHeading}>Select Documents</Text>
                        <View style={styles.sectionContainer}>
                            <CheckBoxes
                                titlesArray={rules.rulesDocuments}
                                selectedArray={localJob.jobDocuments || []}
                                setSelectedArray={(selected) => {
                                    setLocalJob({ ...localJob, jobDocuments: selected });
                                    setSkipDocuments("");
                                }}
                            />
                            <RadioButtons
                                titlesArray={['Skip']}
                                selected={skipDocuments}
                                setSelected={(selected) => {
                                    setSkipDocuments("Skip");
                                    setLocalJob({ ...localJob, jobDocuments: [] });
                                }}
                            />
                        </View>
                    </>
                    : null}
                {localJob.jobDocuments || skipDocuments === "Skip"
                    ? <>
                        <Text style={styles.sectionHeading}>Job location</Text>
                        <View style={styles.sectionContainer}>
                            <RadioButtons
                                titlesArray={rules.rulesCity}
                                selected={localJob.jobCity}
                                setSelected={(selected) => {
                                    setLocalJob({ ...localJob, jobCity: selected });
                                }}
                            />
                        </View>
                    </>
                    : null}
                {localJob.jobCity
                    ? <ButtonOne
                        title="Review Job"
                        style={styles.button}
                        onPress={() => {
                            if (localJob.jobEducation === "Skip") {
                                delete localJob.jobEducation;
                            }
                            if (localJob.jobExperience === "Skip") {
                                delete localJob.jobExperience;
                            }
                            if (skipDocuments === "Skip") {
                                delete localJob.jobDocuments;
                            }
                            setJobForReview(localJob);
                            navigation.navigate('ReviewJobScreen');
                        }}
                    />
                    : null}
            </ScrollView>
        </SafeAreaView>
        // {/* </KeyboardAwareScrollView> */}
    )
}

export default CreateJobScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundYellow,
    },
    mainHeading: {
        ...textStyles.heading1,
        fontWeight: 'bold',
        margin: spacings.large,
    },
    textInput: {
        ...textInputStyles.large,
        marginBottom: spacings.small,
    },
    sectionContainer: {
        backgroundColor: colors.surface,
        borderRadius: 4,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
        paddingBottom: spacings.small,
        marginBottom: spacings.large,
        marginHorizontal: spacings.large,
        elevation: 2,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.large,
        marginLeft: spacings.large,
    },
    button: {
        marginHorizontal: spacings.large,
    },

});





