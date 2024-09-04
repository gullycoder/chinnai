import { Button, StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native'
import { Overlay } from 'react-native-elements';
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes } from '../../context/DesignSystem';


const Reply = ({ reply, edit }) => {
    const { user, updateUserField } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const [textInput, setTextInput] = useState(
        edit === 'userName' ? user.userName
            : edit === 'userJobTitle' ? user.userJobTitle
                : edit === 'userCompanyName' ? user.userCompanyName
                    : edit === 'userCity' ? user.userCity
                        : edit === 'userWorkers' ? user.userWorkers
                            : ''
    );

    const placeholderForEdit = edit === 'userName' ? 'Name'
        : edit === 'userJobTitle' ? 'Job Title'
            : edit === 'userCompanyName' ? 'Company Name'
                : edit === 'userCity' ? 'City'
                    : edit === 'userWorkers' ? 'Number of Workers'
                        : ''

    return (
        <View style={styles.container}>
            {edit &&
                <TouchableOpacity
                    style={styles.editContainer}
                    onPress={() => setVisible(!visible)}
                >
                    <MaterialIcons name="edit" size={iconSizes.small * 0.9} color={colors.icon} />
                    <Text style={styles.editText}>
                        Change
                    </Text>
                </TouchableOpacity>
            }
            <View style={styles.replyContainer}>
                <Text style={styles.replyText}>
                    {reply}
                </Text>
                <MaterialIcons name="done-all" size={iconSizes.small} color={colors.icon} />
            </View>
            <Overlay
                isVisible={visible}
                onBackdropPress={() => setVisible(!visible)}
                overlayStyle={styles.overlay}
            >
                <Text style={styles.textPrimary}>
                    Enter your new {placeholderForEdit}?
                </Text>
                <View style={styles.textInputContainer}>
                    <View style={styles.userAvatarContainer}>
                        <Image source={require('../../resources/images/10.png')} style={styles.userAvatar} />
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder={placeholderForEdit}
                        autoFocus={true}
                        keyboardType={edit === 'userWorkers' ? 'numeric' : 'default'}
                        returnKeyType="send"
                        autoCapitalize='words'
                        value={textInput}
                        onChangeText={text => setTextInput(text)}
                    />
                    <TouchableOpacity
                        style={[styles.sendButton, { backgroundColor: textInput.length > 0 ? colors.primary : colors.iconLight }]}
                        disabled={textInput.length === 0}
                        onPress={() => {
                            if (edit === 'userName' && textInput) {
                                updateUserField("userName", textInput);
                            } else if (edit === 'userJobTitle' && textInput) {
                                updateUserField("userJobTitle", textInput);
                            } else if (edit === 'userCompanyName' && textInput) {
                                updateUserField("userCompanyName", textInput);
                            } else if (edit === 'userCity' && textInput) {
                                updateUserField("userCity", textInput);
                            } else if (edit === 'userWorkers' && textInput) {
                                updateUserField("userWorkers", textInput);
                            }
                            setVisible(!visible);
                        }}
                    >
                        <MaterialIcons name="send" size={iconSizes.large} color="white" />
                    </TouchableOpacity>
                </View>
            </Overlay>
        </View>
    )
}

export default Reply

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: spacings.medium,
        alignSelf: 'flex-end',
        maxWidth: '70%',
    },
    replyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        backgroundColor: colors.surfaceChatBubble,
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingTop: spacings.medium,
        paddingHorizontal: spacings.medium,
        elevation: 1,
    },
    replyText: {
        ...textStyles.body,
        color: 'black',
        marginBottom: spacings.medium,
        marginRight: spacings.small,
    },
    editContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: spacings.small,
        borderWidth: 1,
        borderColor: colors.borderLight,
        borderRadius: 8,
        padding: spacings.small / 2,
    },
    editText: {
        ...textStyles.body,
        color: colors.textLight,
    },
    overlay: {
        width: '80%',
        height: 'auto',
        backgroundColor: colors.surface,
        borderRadius: 12,
        padding: spacings.medium,
        paddingBottom: spacings.large,
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
        borderWidth: 1,
        borderColor: colors.borderLight,
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



    textPrimary: {
        ...textStyles.body,
        color: colors.textLight,
        marginTop: spacings.small,
        marginBottom: spacings.medium,
    },
})