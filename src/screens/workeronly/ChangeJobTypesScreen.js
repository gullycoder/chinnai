import { Button, SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useContext, useState } from 'react'
import { ButtonGroup } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import { UserContext } from '../../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes, CheckBoxes } from '../../context/DesignSystem';




const ChangeJobTypesScreen = ({ navigation }) => {
    const { user, rules, updateCityAndJobTypes } = useContext(UserContext);
    const [jobTypes, setJobTypes] = useState(
        user.userJobTypes ? user.userJobTypes : []
    );

    const [value, setValue] = useState(user.userCity ? user.userCity : "Gurgaon");


    const [isFocus, setIsFocus] = useState(false);

    const dropdownData = rules.rulesCity.map(rule => {
        return {
            value: rule,
            label: rule,
        };
    });


    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView style={styles.scrollView}>
                {(user.userJobTypes === undefined || user.userCity === undefined) && (
                    <Text style={styles.beginText}>
                        Begin your job search by selecting your preferred city and job types
                    </Text>
                )}

                {/* {user.userCity === undefined && ( */}
                <View style={styles.sectionContainer} >
                    <Text style={styles.sectionHeading}>
                        City
                    </Text>
                    <Text style={styles.sectionBody}>
                        Please select the city where you are looking for jobs
                    </Text>
                    <View style={styles.locationContainer} >
                        <Text style={styles.cityText}>
                            Your default city
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
                                setIsFocus(false);
                            }}
                        />
                    </View>

                </View>
                {/* )} */}


                <View style={styles.sectionContainer} >
                    <Text style={styles.sectionHeading}>
                        Job types
                    </Text>
                    <Text style={styles.sectionBody}>
                        Please select the job types you are looking for
                    </Text>
                    <CheckBoxes
                        titlesArray={rules.rulesJobTypes}
                        selectedArray={jobTypes}
                        setSelectedArray={setJobTypes}
                    />

                </View>

            </ScrollView>
            <View style={styles.saveContainer} >
                <ButtonOne
                    title="Save"
                    style={styles.saveButton}
                    onPress={() => {
                        updateCityAndJobTypes(
                            value, jobTypes,
                            () => navigation.reset({
                                index: 0,
                                routes: [{ name: 'SearchJobsScreen' }]
                            })
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default ChangeJobTypesScreen

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    beginText: {
        ...textStyles.heading3,
        fontWeight: 'normal',
        textAlign: 'center',
        color: colors.text,
        marginHorizontal: spacings.large * 2,
        marginTop: spacings.large,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacings.small,
    },
    cityText: {
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

    sectionContainer: {
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
        paddingBottom: spacings.small,
        backgroundColor: colors.surface,
        marginVertical: spacings.medium,
    },
    sectionBody: {
        ...textStyles.heading1,
        fontSize: textStyles.heading1.fontSize - 2,
        marginBottom: spacings.large,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.large,
    },
    saveButton: {
        marginHorizontal: spacings.large,
        marginVertical: spacings.medium,
    },
    saveContainer: {
        backgroundColor: colors.surface,
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.medium,
    },


})