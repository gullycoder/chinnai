import { Image, StyleSheet, Text, View, Button, TextInput, ScrollView, KeyboardAvoidingView, FlatList, TouchableOpacity, StatusBar } from 'react-native'
import React, { useContext, useReducer, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { MaterialIcons } from '@expo/vector-icons';
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, SelectStory, DividerHorizontal, ButtonOne, RadioButtons, RadioButtonsTemp, UploadPhoto } from '../../context/DesignSystem';

const AddPastTenderScreen = ({ navigation }) => {
    const { rules, user, createPastTender } = useContext(UserContext);
    const [pastTender, setPastTender] = useState({});

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <ScrollView>
                <View style={styles.topContainer}>
                    <Text style={styles.sectionHeading}>
                        Project details
                    </Text>
                    <Text style={styles.subSectionHeading}>
                        Project name
                    </Text>
                    <View style={styles.sectionContainer}>
                        <TextInput
                            style={styles.textInput}
                            autoFocus={true}
                            placeholder="Enter project name"
                            value={pastTender.projectName}
                            onChangeText={(text) => setPastTender({ ...pastTender, projectName: text })}
                        />
                    </View>
                    <Text style={styles.subSectionHeading}>
                        Project location
                    </Text>
                    <View style={styles.sectionContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter project location (city)"
                            value={pastTender.location}
                            onChangeText={(text) => setPastTender({ ...pastTender, location: text })}
                        />
                    </View>
                </View>
                <DividerHorizontal />
                <View style={styles.tenderTypesContainer}>
                    <Text style={styles.midSectionsHeading}>
                        Select work type
                    </Text>
                    <View style={[styles.tenderTypeListContainer]}>
                        <RadioButtonsTemp
                            titlesArray={rules.rulesTenderTypes}
                            selected={pastTender.pastTenderType}
                            setSelected={(tenderType) => {
                                setPastTender({ ...pastTender, pastTenderType: tenderType })
                            }}
                            style={styles.radioButton}
                            horizontal={true}
                        />
                    </View>
                </View>
                <DividerHorizontal />
                <Text style={styles.bottomSectionsHeading}>
                    Add project photos
                </Text>
                <View style={styles.mediaContainer}>
                    <UploadPhoto
                        onUrlChange={(url) => {
                            if (url) {
                                setPastTender({ ...pastTender, pastTenderPhotoUrl: url })
                            } else {
                                // delete pastTender.pastTenderPhotoUrl
                                (delete pastTender.pastTenderPhotoUrl);
                                setPastTender({ ...pastTender })
                            }
                        }}
                        title="Add Photo"
                    />
                </View>
                <DividerHorizontal />
                <View style={styles.topContainer}>
                    <Text style={styles.sectionHeading}>
                        Project manager/contractor reference
                    </Text>
                    <Text style={styles.subSectionHeading}>
                        Name
                    </Text>
                    <View style={styles.sectionContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter name"
                            value={pastTender.referenceName}
                            onChangeText={(text) => setPastTender({ ...pastTender, referenceName: text })}
                        />
                    </View>
                    <Text style={styles.subSectionHeading}>
                        10-digit mobile number
                    </Text>
                    <View style={styles.sectionContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter 10-digit mobile number"
                            keyboardType='numeric'
                            value={pastTender.referenceMobileNumber}
                            onChangeText={(text) => setPastTender({ ...pastTender, referenceMobileNumber: text })}
                        />
                    </View>
                </View>
                <View style={styles.spacer} />
            </ScrollView>

            <View style={[styles.buttonContainer]}>
                <ButtonOne
                    title="Save"
                    disabled={pastTender.referenceMobileNumber.length !== 10 || pastTender.referenceName.length === 0 || pastTender.pastTenderType === null || pastTender.projectName.length === 0 || pastTender.location.length === 0}
                    onPress={() => {
                        createPastTender(
                            {
                                pastTender: pastTender,
                                navigationCallback: (pastTenderId) => navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'ViewPastTenderScreen', params: { pastTenderId } }],
                                })
                            }
                        );
                    }}
                />
            </View>
        </View>
    )
}

export default AddPastTenderScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        flex: 1,
    },
    topContainer: {
        flex: 1,
    },
    userProfileContainer: {
        flexDirection: 'row',
        marginBottom: spacings.medium,

    },
    userProfilePic: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userProfileName: {
        ...textStyles.heading2,
        marginLeft: spacings.small,
    },
    userDetails: {
        ...textInputStyles.caption,
        marginLeft: spacings.small,
        color: colors.textLight,
    },
    textInputContainer: {
        minHeight: 150,
        marginBottom: spacings.large,
    },
    tenderTypesContainer: {
        paddingTop: spacings.large,
    },
    midSectionsHeading: {
        ...textStyles.heading2,
        marginHorizontal: spacings.large,
    },
    bottomSectionsHeading: {
        ...textStyles.heading2,
        marginHorizontal: spacings.large,
        marginTop: spacings.large,
    },
    radioButton: {
        marginRight: spacings.small,
        marginBottom: spacings.small / 3,
    },
    tenderTypeListContainer: {
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.large,
    },
    mediaContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.large,
    },
    addMediaButtonContainer: {
        height: spacings.large * 6,
        width: spacings.large * 6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 4,
        marginRight: spacings.small,
    },
    addMediaText: {
        ...textStyles.body,
        marginTop: spacings.small / 2,
    },
    buttonContainer: {
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.large,
        backgroundColor: colors.surface,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    spacer: {
        height: spacings.medium * 4.5 + spacings.large * 2,
    },


    sectionHeading: {
        ...textStyles.heading2,
        fontWeight: 'bold',
        margin: spacings.large,
    },
    textInput: {
        ...textInputStyles.large,
        marginBottom: spacings.small,
        backgroundColor: colors.surface,
    },
    sectionContainer: {
        backgroundColor: colors.surface,
        borderRadius: 4,
        // paddingHorizontal: spacings.large,
        // paddingTop: spacings.large,
        // paddingBottom: spacings.small,
        marginBottom: spacings.medium,
        marginHorizontal: spacings.large,
        elevation: 2,
    },
    subSectionHeading: {
        ...textStyles.body,
        marginBottom: spacings.small,
        marginLeft: spacings.large,
    },







})
