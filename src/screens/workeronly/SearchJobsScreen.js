import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { ButtonGroup } from 'react-native-elements';
import { UserContext } from '../../context/UserContext';
import { JobsContext } from '../../context/JobsContext';
import JobThumbnail from '../../components/jobs/JobThumbnail';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from '../../context/DesignSystem';

const SearchJobsScreen = ({ navigation }) => {
    const { user, rules } = useContext(UserContext);
    const { jobs, fetchJobs, candidates, fetchCandidates } = useContext(JobsContext);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (user.userJobTypes === undefined || user.userCity === undefined) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'ChangeJobTypesScreen' }]
                });
            }
            fetchCandidates(user.userId);
        });
        return unsubscribe;
    }, [navigation]);


    const [selectedCity, setSelectedCity] = useState(
        user.userCity ? user.userCity : ''
    );
    useEffect(() => {
        fetchJobs(selectedCity);
    }, [selectedCity]);
    const [value, setValue] = useState(
        user.userCity ? user.userCity : ''
    );
    const [isFocus, setIsFocus] = useState(false);

    const dropdownData = rules.rulesCity.map(rule => {
        return {
            value: rule,
            label: rule,
        };
    });

    const buttonsArray = user.userJobTypes ? ["All", ...user.userJobTypes] : ["All", ...rules.rulesJobTypes]
    const [selectedJobType, setSelectedJobType] = useState("All");
    const selectedJobs = selectedJobType === "All" ? jobs.filter(job => user.userJobTypes.includes(job.jobType)) : jobs.filter(job => job.jobType === selectedJobType);
    const notSelectedJobs = selectedJobType === "All" ? jobs.filter(job => !user.userJobTypes.includes(job.jobType)) : jobs.filter(job => job.jobType !== selectedJobType);

    const selectedJobsList = selectedJobs.map(job => {
        return (
            <JobThumbnail
                job={job}
                candidate={candidates.find(candidate => candidate.jobId === job.jobId)}
                navigation={navigation}
                key={job.jobId}
            />
        )
    })
    const notSelectedJobsList = notSelectedJobs.map(job => {
        return (
            <JobThumbnail
                job={job}
                candidate={candidates.find(candidate => candidate.jobId === job.jobId)}
                navigation={navigation}
                key={job.jobId}
            />
        )
    })

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar backgroundColor={colors.primaryDark} />
            <TouchableOpacity
                style={styles.myJobsContainer}
                onPress={() => navigation.navigate('MyJobsScreen')}
            >
                <Text style={styles.myJobs}>
                    Applied jobs
                    <Text style={styles.myJobsCount}> ({candidates.filter(candidate => candidate.candidateStatus === "applied").length})</Text>
                </Text>
                <Text style={styles.viewAll}>
                    View All
                </Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.icon} />
            </TouchableOpacity>
            <DividerHorizontal />
            <ScrollView>
                <Text style={styles.sectedJobTypes}>
                    Your selected job types
                </Text>
                <View style={styles.selectButtonsContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ChangeJobTypesScreen')}
                        style={styles.editJobTypesContainer}>
                        <View style={styles.editJobTypesCircle}>
                            <MaterialIcons name="edit" size={iconSizes.large} color={colors.icon} />
                        </View>
                        <View style={styles.editJobTypesTextContainer} >
                            <Text style={styles.editJobTypesText}>
                                Change job types
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        data={buttonsArray}
                        renderItem={({ item }) => (
                            <SelectStory
                                title={item}
                                selected={selectedJobType}
                                setSelected={setSelectedJobType}
                            />
                        )}
                        keyExtractor={item => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <DividerHorizontal />
                <View style={styles.locationContainer} >
                    <Text style={styles.jobsNear}>
                        Jobs near
                    </Text>
                    <MaterialIcons name="location-on" size={iconSizes.small} color={colors.primary} />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={dropdownData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select city' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setSelectedCity(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>
                {/* {selectedCity !== user.userCity &&
                    <Button
                        title="Change default city"
                        onPress={() => {
                            navigation.navigate('ChangeJobTypesScreen');
                        }}
                    />
                } */}
                <View style={styles.selectedJobContainer}>
                    <Text style={styles.selectedJosText1}>
                        Selected Jobs
                    </Text>
                    <Text style={styles.selectedJosText2}>
                        Job types that you've selected
                    </Text>
                </View>
                {selectedJobs.length > 0
                    ? <View style={styles.listContainer}>
                        {selectedJobsList}
                    </View>
                    : <Text style={styles.noJobsText}>
                        No matching jobs found for your selected job types in {selectedCity}
                    </Text>
                }
                {notSelectedJobs.length > 0 &&
                    <View>
                        <View style={styles.selectedJobContainer}>
                            <Text style={styles.selectedJosText1}>
                                Similar Jobs
                            </Text>
                            <Text style={styles.selectedJosText2}>
                                Jobs similar to your selected job types
                            </Text>
                        </View>
                        <View style={styles.listContainer}>
                            {notSelectedJobsList}
                        </View>
                    </View>
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchJobsScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        flex: 1,
    },
    myJobsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacings.medium,
        paddingHorizontal: spacings.large
    },
    myJobs: {
        ...textStyles.heading2,
    },
    myJobsCount: {
        ...textStyles.heading2,
        fontSize: textStyles.heading2.fontSize + 1,
        color: colors.primary,
    },
    viewAll: {
        ...textStyles.heading3,
        color: colors.primary,
        flex: 1,
        textAlign: 'right',
    },
    sectedJobTypes: {
        ...textStyles.heading2,
        marginTop: spacings.small,
        marginHorizontal: spacings.large,
    },
    selectButtonsContainer: {
        marginVertical: spacings.small,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: spacings.large,
    },
    editJobTypesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: spacings.medium * 6,
        marginRight: spacings.small / 2,
    },
    editJobTypesCircle: {
        height: spacings.medium * 5,
        width: spacings.medium * 5,
        borderRadius: spacings.medium * 2.5,
        borderWidth: spacings.medium / 4,
        borderColor: colors.borderDisabled,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    editJobTypesTextContainer: {
        height: spacings.medium * 3,
        width: spacings.medium * 6,
        justifyContent: "center",
    },
    editJobTypesText: {
        textAlign: "center",
        ...textStyles.caption,
        color: colors.textLight,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacings.small,
        marginHorizontal: spacings.large,
    },
    jobsNear: {
        ...textStyles.heading2,
        marginRight: spacings.small,
    },
    dropdown: {
        flex: 1,
        paddingHorizontal: 8,
    },
    dropdownLabel: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 894,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
    },
    selectedTextStyle: {
        fontSize: textStyles.heading2.fontSize,
        color: colors.primary,
        fontWeight: 'bold',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    selectedJobContainer: {
        backgroundColor: colors.surfaceYellow,
        paddingVertical: spacings.medium,
        paddingHorizontal: spacings.large,
    },
    selectedJosText1: {
        ...textStyles.heading2,
        color: colors.text,
    },
    selectedJosText2: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'normal',
    },
    listContainer: {
        backgroundColor: colors.background,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.medium,
    },
    noJobsText: {
        ...textStyles.heading3,
        color: colors.text,
        fontWeight: 'normal',
        textAlign: 'center',
        margin: spacings.medium,
    },



})