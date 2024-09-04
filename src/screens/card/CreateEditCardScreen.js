import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button, ScrollView, KeyboardAvoidingView, SafeAreaView, StatusBar, Image } from 'react-native'
import React, { useContext, useRef, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MaterialIcons } from '@expo/vector-icons';
import { UserContext } from '../../context/UserContext';
import Degree from '../../components/card/Degree';
import Gender from '../../components/card/Gender';
import ReplyBubble from '../../components/card/ReplyBubble';
import QuestionBubble from '../../components/card/QuestionBubble';
import PastTenderTypes from '../../components/card/PastTenderTypes';
import WorkEx from '../../components/card/WorkEx';
import City from '../../components/card/City';
import Documents from '../../components/card/Documents';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, ButtonOneUnfilled } from '../../context/DesignSystem';
import Card from '../../components/card/Card';
import ExperienceOrNot from '../../components/card/ExperienceOrNot';
import ImageAddOrChange from '../../components/card/ImageAddOrChange';

const CreateEditCardScreen = ({ navigation }) => {
    const { user, updateFlowComplete, updateCardComplete, updateUserField } = useContext(UserContext);
    const [textInput, setTextInput] = useState('');

    const scrollViewRef = useRef();


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.topContainer}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <MaterialIcons name="arrow-back" size={iconSizes.large} color="white" />
                </TouchableOpacity>
                <Image source={require('../../resources/images/10.png')} style={styles.avatar} />
                <Text style={styles.avatarName}>
                    Card Helper
                </Text>
                <ButtonTwoUnfilled
                    title='Later'
                    style={styles.skipButton}
                    textStyle={styles.skipButtonText}
                    onPress={() => {
                        if (user.userType === 'worker') {
                            updateFlowComplete(() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{
                                        name: 'WorkerTab',
                                        params:
                                            { screen: 'GroupsStack' }
                                    }],
                                })
                            });
                        }
                        else if (user.userType === 'contractor') {
                            updateFlowComplete(() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{
                                        name: 'ContractorTab',
                                        params:
                                            { screen: 'GroupsStack' }
                                    }],
                                })
                            });
                        } else {
                            console.log('CreateEditCardScreen userType: ', user.userType);
                        }
                    }}
                />
            </View>
            <View style={styles.cardContainer}>
                <Card userType={user.userType} />
            </View>
            {user.userType === 'worker' &&
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
                    <View style={styles.spacer} />
                    <View style={styles.chatContainer}>
                        <QuestionBubble question="What is your Full Name?" />
                        {user.userName &&
                            <>
                                <ReplyBubble reply={user.userName} edit="userName" />
                                <QuestionBubble component={<Gender />} question="Select your Gender" />
                            </>}
                        {user.userName && user.userGender &&
                            <>
                                <ReplyBubble reply={user.userGender} />
                                <QuestionBubble component={<City />} question="Select your preferred job location (city)?" />
                            </>}
                        {user.userName && user.userGender && user.userCity &&
                            <>
                                <ReplyBubble reply={user.userCity} />
                                <QuestionBubble component={<ExperienceOrNot />} question="Do you have any work experience?" />
                            </>}
                        {user.userExperienceOrNot === 'Yes'
                            ? <>
                                <>
                                    <ReplyBubble reply={user.userExperienceOrNot} />
                                    <QuestionBubble component={<WorkEx />} question="What is your total years of work experience" />
                                </>
                                {user.userExperience &&
                                    <>
                                        <ReplyBubble reply={user.userExperience} />
                                        <QuestionBubble question="What is your last job title/designation?" />
                                    </>}
                                {user.userJobTitle &&
                                    <>
                                        <ReplyBubble reply={user.userJobTitle} edit="userJobTitle" />
                                        <QuestionBubble question="What is your last company name?" />
                                    </>}
                                {user.userCompanyName &&
                                    <>
                                        <ReplyBubble reply={user.userCompanyName} edit="userCompanyName" />
                                        <QuestionBubble component={<Degree />} question="What is your highest education?" />
                                    </>}
                                {user.userCompanyName && user.userEducation &&
                                    <>
                                        <ReplyBubble reply={user.userEducation} />
                                        <QuestionBubble component={<Documents />} question="Select the documents that you have" />
                                    </>}
                                {user.userCompanyName && user.userEducation && (user.userDocuments && user.userDocuments.length > 0) &&
                                    <>
                                        <ReplyBubble reply={user.userDocuments.map(document => `${document}, `)} />
                                        <QuestionBubble component={<ImageAddOrChange />} question="Please upload your image" />
                                    </>}
                                {user.userCompanyName && user.userEducation && (user.userDocuments && user.userDocuments.length > 0) && user.userPhotoAdded !== undefined
                                    ? <>
                                        <ReplyBubble reply={
                                            user.userPhotoAdded === true
                                                ? 'Photo added/updated'
                                                : "I'll add/update photo later"
                                        } />
                                        <QuestionBubble
                                            component={
                                                <ButtonOne
                                                    title='Done'
                                                    style={styles.doneButton}
                                                    textStyle={styles.doneButtonText}
                                                    onPress={() => {
                                                        updateCardComplete(() => {
                                                            navigation.reset({
                                                                index: 0,
                                                                routes: [{
                                                                    name: 'WorkerTab',
                                                                    params:
                                                                        { screen: 'GroupsStack' }
                                                                }],
                                                            })
                                                        });
                                                    }}
                                                />
                                            }
                                            question="Click Done to continue"
                                        />

                                    </>
                                    : null}
                            </>
                            : <>
                                {user.userExperienceOrNot === 'No' &&
                                    <>
                                        <ReplyBubble reply={user.userExperienceOrNot} />
                                        <QuestionBubble component={<Degree />} question="What is your highest education?" />
                                    </>}
                                {user.userExperienceOrNot === 'No' && user.userEducation &&
                                    <>
                                        <ReplyBubble reply={user.userEducation} />
                                        <QuestionBubble component={<Documents />} question="Select the documents that you have" />
                                    </>}
                                {user.userExperienceOrNot === 'No' && user.userEducation && (user.userDocuments && user.userDocuments.length > 0) &&
                                    <>
                                        <ReplyBubble reply={user.userDocuments.map(document => `${document}, `)} />
                                        <QuestionBubble component={<ImageAddOrChange />} question="Please upload your image" />
                                    </>}
                                {user.userExperienceOrNot === 'No' && user.userEducation && (user.userDocuments && user.userDocuments.length > 0) && user.userPhotoAdded !== undefined
                                    ? <>
                                        <ReplyBubble reply={
                                            user.userPhotoAdded === true
                                                ? 'Photo added/updated'
                                                : "I'll add/update photo later"
                                        } />
                                        <QuestionBubble
                                            component={
                                                <ButtonOne
                                                    title='Done'
                                                    style={styles.doneButton}
                                                    textStyle={styles.doneButtonText}
                                                    onPress={() => {
                                                        updateCardComplete(() => {
                                                            navigation.reset({
                                                                index: 0,
                                                                routes: [{
                                                                    name: 'WorkerTab',
                                                                    params:
                                                                        { screen: 'GroupsStack' }
                                                                }],
                                                            })
                                                        });
                                                    }}
                                                />
                                            }
                                            question="Click Done to continue"
                                        />

                                    </>
                                    : null}
                            </>
                        }
                    </View>
                </ScrollView>
            }
            {user.userType === 'contractor' &&
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
                    <View style={styles.spacer} />
                    <View style={styles.chatContainer}>
                        <QuestionBubble question="What is your Full Name?" />
                        {user.userName &&
                            <>
                                <ReplyBubble reply={user.userName} edit="userName" />
                                <QuestionBubble question="What is the name of your business (company)?" />
                            </>}
                        {user.userName && user.userCompanyName &&
                            <>
                                <ReplyBubble reply={user.userCompanyName} edit="userCompanyName" />
                                <QuestionBubble question="What is your designation/role at your company?" />
                            </>}
                        {user.userName && user.userCompanyName && user.userJobTitle &&
                            <>
                                <ReplyBubble reply={user.userJobTitle} edit="userJobTitle" />
                                <QuestionBubble question="Where is your company located (city)?" />
                            </>}
                        {user.userName && user.userCompanyName && user.userJobTitle && user.userCity &&
                            <>
                                <ReplyBubble reply={user.userCity} edit="userCity" />
                                <QuestionBubble component={<PastTenderTypes />} question="What types of tenders/projects have you done in the past?" />
                            </>}
                        {user.userName && user.userCompanyName && user.userJobTitle && user.userCity && (user.userPastTenderTypes && user.userPastTenderTypes.length > 0) &&
                            <>
                                <ReplyBubble reply={user.userPastTenderTypes.map(tenderType => `${tenderType}, `)} />
                                <QuestionBubble question="How many workers do you have?" />
                            </>}
                        {user.userCity && (user.userPastTenderTypes && user.userPastTenderTypes.length > 0) && user.userWorkers &&
                            <>
                                <ReplyBubble reply={user.userWorkers} edit="userWorkers" />
                                <QuestionBubble component={<WorkEx />} question="What is your/your company's total years of experience?" />
                            </>}
                        {user.userCity && (user.userPastTenderTypes && user.userPastTenderTypes.length > 0) && user.userWorkers && user.userExperience &&
                            <>
                                <ReplyBubble reply={user.userExperience} />
                                <QuestionBubble component={<ImageAddOrChange />} question="Please upload your profile image" />
                            </>}
                        {user.userCity && (user.userPastTenderTypes && user.userPastTenderTypes.length > 0) && user.userWorkers && user.userExperience && user.userPhotoAdded !== undefined &&
                            <>
                                <ReplyBubble reply={
                                    user.userPhotoAdded === true
                                        ? 'Photo added/updated'
                                        : "I'll add/update photo later"
                                } />
                                <QuestionBubble
                                    component={
                                        <>
                                            <ButtonOneUnfilled
                                                title='Done'
                                                style={styles.doneButton}
                                                textStyle={styles.doneButtonText}
                                                onPress={() => {
                                                    updateCardComplete(() => {
                                                        navigation.reset({
                                                            index: 0,
                                                            routes: [{
                                                                name: 'ContractorTab',
                                                                params:
                                                                    { screen: 'GroupsStack' }
                                                            }],
                                                        })
                                                    });
                                                }}
                                            />
                                        </>
                                    }
                                    question='Click "Done" to continue'
                                />
                            </>}
                    </View>
                </ScrollView>
            }
            <View style={styles.textInputContainer}>
                <View style={styles.userAvatarContainer}>
                    <Image source={require('../../resources/images/10.png')} style={styles.userAvatar} />
                </View>
                <TextInput
                    style={styles.textInput}
                    placeholder="Message"
                    keyboardType={(user.userPastTenderTypes && user.userPastTenderTypes.length > 0 && !user.userWorkers) ? 'numeric' : 'default'}
                    returnKeyType="send"
                    autoCapitalize='words'
                    value={textInput}
                    onChangeText={text => setTextInput(text)}
                />
                {user.userType === 'worker' &&
                    <TouchableOpacity
                        style={styles.sendButton}
                        disabled={textInput.length === 0}
                        onPress={() => {
                            if (!user.userName) {
                                updateUserField("userName", textInput);
                            }
                            if (user.userExperience && !user.userJobTitle) {
                                updateUserField("userJobTitle", textInput);
                            }
                            if (user.userJobTitle && !user.userCompanyName) {
                                updateUserField("userCompanyName", textInput);
                            }
                            setTextInput('');
                        }}
                    >
                        <MaterialIcons name="send" size={iconSizes.large} color="white" />
                    </TouchableOpacity>
                }
                {user.userType === 'contractor' &&
                    <TouchableOpacity
                        style={styles.sendButton}
                        disabled={textInput.length === 0}
                        onPress={() => {
                            if (!user.userName) {
                                updateUserField("userName", textInput);
                            }
                            if (user.userName && !user.userCompanyName) {
                                updateUserField("userCompanyName", textInput);
                            }
                            if (user.userCompanyName && !user.userJobTitle) {
                                updateUserField("userJobTitle", textInput);
                            }
                            if (user.userJobTitle && !user.userCity) {
                                updateUserField("userCity", textInput);
                            }
                            if (user.userPastTenderTypes && user.userPastTenderTypes.length > 0 && !user.userWorkers) {
                                updateUserField("userWorkers", textInput);
                            }
                            setTextInput('');
                        }}
                    >
                        <MaterialIcons name="send" size={iconSizes.large} color="white" />
                    </TouchableOpacity>
                }
            </View>
        </View>
    );
};

const cardHeight = 190;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundChat,
    },
    topContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacings.large,
        height: spacings.medium * 5,
        backgroundColor: colors.primary,
        elevation: 10,
    },
    cardContainer: {
        height: cardHeight,
        borderRadius: 8,
        zIndex: 1,
        alignSelf: 'center',
        position: 'absolute',
        top: spacings.medium * 6,
        left: spacings.large,
        right: spacings.large,
        elevation: 2,
    },
    skipButton: {
        alignSelf: 'center',
        paddingHorizontal: spacings.medium,
    },
    chatContainer: {
        flex: 1,
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.large,
    },
    avatar: {
        height: spacings.medium * 3,
        width: spacings.medium * 3,
        borderRadius: spacings.medium * 1.5,
        alignSelf: 'center',
        marginLeft: spacings.small,
    },
    avatarName: {
        flex: 1,
        ...textStyles.heading2,
        color: 'white',
        marginLeft: spacings.small,
    },
    textInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: spacings.small / 2,
        marginHorizontal: spacings.small,
    },
    textInput: {
        ...textInputStyles.large,
        flex: 1,
        height: spacings.medium * 4,
        borderRadius: spacings.medium * 2,
        backgroundColor: colors.surface,
        paddingLeft: spacings.medium * 4,
        borderWidth: 0,
        elevation: 1,
    },
    userAvatarContainer: {
        height: spacings.medium * 2.8,
        width: spacings.medium * 2.8,
        borderRadius: spacings.medium * 1.4,
        alignSelf: 'center',
        position: 'absolute',
        bottom: spacings.small,
        left: spacings.small,
        elevation: 2,
        zIndex: 1,
    },
    userAvatar: {
        height: spacings.medium * 2.8,
        width: spacings.medium * 2.8,
        borderRadius: spacings.medium * 1.4,
        alignSelf: 'center',
    },
    sendButton: {
        height: spacings.medium * 4,
        width: spacings.medium * 4,
        borderRadius: spacings.medium * 2,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: spacings.small / 2,
        paddingLeft: spacings.small / 2,
        elevation: 2,
    },
    spacer: {
        height: spacings.medium + cardHeight,
    },
    doneButton: {
        paddingHorizontal: spacings.medium,
        alignSelf: 'stretch',
        marginBottom: spacings.medium,
    },






})

export default CreateEditCardScreen;