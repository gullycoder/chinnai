import React, { useState, useContext } from 'react';
import { Text, StyleSheet, Button, TextInput, View, ScrollView, SafeAreaView, StatusBar } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ButtonGroup } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import * as Yup from 'yup';
import { UserContext } from '../../context/UserContext';
import { TendersContext } from '../../context/TendersContext';
import CreateBoq from '../../components/tenders/CreateBoq';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, CheckBoxes, CheckBoxesTemp } from '../../context/DesignSystem';



const CreateTenderScreen = ({ navigation }) => {
    const { rules } = useContext(UserContext);
    const { setTenderForReview } = useContext(TendersContext);
    const [tender, setTender] = useState({});

    const [tenderTypesIndex, setTenderTypesIndex] = useState(null);

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderDropdownLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.dropdownLabel, isFocus && { color: 'blue' }]}>
                    Tender Location
                </Text>
            );
        }
        return null;
    };
    const dropdownData = rules.rulesCity.map(rule => {
        return {
            value: rule,
            label: rule,
        };
    });

    const addBoqInTender = (boq) => {
        setTender({ ...tender, boq });
    }


    return (
        <KeyboardAwareScrollView extraHeight={100} >
            <StatusBar backgroundColor={colors.primaryDark} />
            <SafeAreaView style={{ margin: 20, marginBottom: 40 }}>
                <ScrollView>
                    <Text tyle={styles.heading}>Create a New Tender Post</Text>
                    <TextInput
                        style={styles.textInput}
                        autoFocus={true}
                        placeholder="Client Name / Contact Person"
                        onChangeText={(text) => setTender({ ...tender, tenderClientName: text })}
                    />
                    <TextInput
                        style={styles.textInput}
                        keyboardType='phone-pad'
                        placeholder="Client Phone Number"
                        onChangeText={(text) => setTender({ ...tender, tenderClientPhone: text })}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Project Name"
                        onChangeText={(text) => setTender({ ...tender, tenderProjectName: text })}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Company Name"
                        onChangeText={(text) => setTender({ ...tender, tenderCompanyName: text })}
                    />
                    <Text style={styles.label}>Tender Type</Text>
                    <ButtonGroup
                        selectedIndex={tenderTypesIndex}
                        buttons={rules.rulesTenderTypes}
                        vertical={true}
                        onPress={(index) => {
                            setTenderTypesIndex(index);
                            setTender({ ...tender, tenderType: rules.rulesTenderTypes[index] });
                        }}
                        containerStyle={styles.buttonGroup}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Start Date"
                        onChangeText={(text) => setTender({ ...tender, tenderStartDate: text })}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="End Date"
                        onChangeText={(text) => setTender({ ...tender, tenderEndDate: text })}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Bid Submission Deadline"
                        onChangeText={(text) => setTender({ ...tender, tenderBidDeadline: text })}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Brief Description and Other Details"
                        onChangeText={(text) => setTender({ ...tender, tenderDescription: text })}
                    />
                    <TextInput
                        style={styles.textInput}
                        keyboardType='numeric'
                        placeholder="Expected number of workers"
                        onChangeText={(text) => setTender({ ...tender, tenderWorkersExpected: text })}
                    />
                    {renderDropdownLabel()}
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
                            setTender({ ...tender, tenderCity: item.value });
                            setIsFocus(false);
                        }}
                    />
                    <Text>Add Bill of Quantities</Text>
                    <CreateBoq addBoqInTender={addBoqInTender} />
                    <Button
                        title="Review Tender"
                        onPress={() => {
                            setTenderForReview(tender);
                            navigation.navigate('ReviewTenderScreen');

                        }}
                    />
                    <Button
                        title="Go Back"
                        onPress={() => navigation.navigate('CardStack', { screen: 'SettingsScreen' })}
                    />
                </ScrollView>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default CreateTenderScreen

const styles = StyleSheet.create({
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20
    },
    label: {
        fontSize: 20,
        marginBottom: 10,
    },
    textInput: {
        fontSize: 20,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    buttonGroup: {
        marginBottom: 10,
        height: 300,
    },
    buttonGroupHorizontal: {
        marginBottom: 10,
        height: 50,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    dropdownLabel: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 1394,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})





