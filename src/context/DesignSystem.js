import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Overlay } from 'react-native-elements';
import { UserContext } from "./UserContext";


const colors = {
    primaryDark: '#095043',
    primary: '#128c7e',
    primaryLight: '#52B8AE',

    secondaryDark: '#FCB03c',
    secondary: '#ffd167',
    secondaryLight: '#FFF7E4',

    textDark: '#434343',
    text: '#525252',
    textLight: '#7B7B7B',
    textDisabled: '#C4C4C4',

    borderDark: '#434343',
    border: '#7B7B7B',
    borderLight: '#C4C4C4',
    borderDisabled: '#E9E9E9',

    iconDark: '#434343',
    icon: '#7B7B7B',
    iconLight: '#C4C4C4',
    iconDisabled: '#E9E9E9',

    background: '#f5f5f5',
    backgroundGreen: '#E9F8E9',
    backgroundYellow: '#FFFBF1',
    backgroundError: '#FFC7C7',
    backgroundChat: '#ECE5DD',

    surface: '#ffffff',
    surfaceGreen: '#CDECCB',
    surfaceYellow: '#FFEABA',
    surfaceChatBubble: '#DCF8C6',

    error: '#B00020',
}
const textStyles = {
    heading1: {
        fontSize: 22,
        fontWeight: 'normal',
        letterSpacing: 0.2,
        color: colors.textDark,
    },
    heading2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    heading3: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.text,
    },
    body: {
        fontSize: 15,
        fontWeight: 'normal',
        color: colors.textDark,
    },
    caption: {
        fontSize: 12,
        fontWeight: 'normal',
        color: colors.textLight,
    },
}
const iconSizes = {
    small: textStyles.caption.fontSize * 1.5,
    medium: textStyles.heading2.fontSize * 1.4,
    large: textStyles.heading1.fontSize * 1.25,
}
const opacities = {
    o1: 0.87,
    o2: 0.67,
    o3: 0.38,
    o4: 0.12,
}
const spacings = {
    small: 8,
    medium: 12,
    large: 16,
}
const textInputStyles = {
    large: {
        height: spacings.medium * 4.5,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.textDisabled,
        paddingHorizontal: spacings.medium,
        ...textStyles.heading2,
        fontWeight: 'normal',
        color: "black",
        backgroundColor: colors.background,
        letterSpacing: 1,
    },
}

const DividerHorizontal = ({ style }) => {
    return (
        <View style={{
            height: 1,
            backgroundColor: colors.borderDisabled,
            ...style,
        }} />
    )
}
const DividerVertical = ({ style }) => {
    return (
        <View style={{
            width: 1,
            backgroundColor: colors.borderDisabled,
            ...style,
        }} />
    )
}
const ButtonOne = ({ title, onPress, style, disabled, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: disabled ? colors.background : colors.primary,
                height: spacings.medium * 4.5,
                borderRadius: 4,
                justifyContent: 'center',
                paddingHorizontal: spacings.medium * 2,
                elevation: disabled ? 0 : 5,
                ...style,
            }}>
            <Text style={{
                ...textStyles.heading2,
                color: disabled ? colors.textDisabled : "white",
                textAlign: "center",
                ...textStyle,
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const ButtonOneUnfilled = ({ title, onPress, style, disabled, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: colors.surface,
                height: spacings.medium * 4.5,
                borderRadius: 4,
                borderColor: disabled ? colors.borderDisabled : colors.primary,
                borderWidth: 1,
                paddingHorizontal: spacings.medium * 2,
                justifyContent: 'center',
                ...style,
            }}>
            <Text style={{
                ...textStyles.heading2,
                color: disabled ? colors.textDisabled : colors.primary,
                textAlign: "center",
                ...textStyle,
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const ButtonTwo = ({ title, onPress, style, disabled, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: disabled ? colors.background : colors.primary,
                height: spacings.medium * 3,
                borderRadius: 4,
                justifyContent: 'center',
                elevation: disabled ? 0 : 5,
                alignSelf: "flex-start",
                paddingHorizontal: spacings.medium * 2,
                ...style,
            }}>
            <Text style={{
                ...textStyles.heading3,
                color: disabled ? colors.textDisabled : "white",
                textAlign: "center",
                ...textStyle,
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const ButtonTwoUnfilled = ({ title, onPress, style, disabled, textStyle }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={{
                backgroundColor: colors.surface,
                height: spacings.medium * 3,
                borderRadius: 4,
                borderColor: disabled ? colors.borderDisabled : colors.primary,
                borderWidth: 1,
                justifyContent: 'center',
                alignSelf: "flex-start",
                paddingHorizontal: spacings.medium * 2,
                ...style,
            }}>
            <Text style={{
                ...textStyles.heading3,
                color: disabled ? colors.textDisabled : colors.primary,
                textAlign: "center",
                ...textStyle,
            }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}
const SelectStory = ({ title, selected, setSelected }) => {
    const { rules } = useContext(UserContext)

    const images = {}
    for (let key in rules.rulesImages) {
        images[key] = rules.rulesImages[key]
    }


    // const images = {
    //     "All": require('../resources/images/6.png'),
    //     "Helper - Civil/Structure": require('../resources/images/5.png'),
    //     "Helper - Electrical": require('../resources/images/7.png'),
    //     "Helper - Plumbing": require('../resources/images/8.png'),
    //     "Mistry - Mason": require('../resources/images/9.png'),
    //     "Supervisor": require('../resources/images/10.png'),
    //     "All Group": require('../resources/images/10.png'),
    //     "Covid": require('../resources/images/10.png'),
    //     "Construction Life": require('../resources/images/10.png'),
    //     "Safety Alerts": require('../resources/images/10.png'),
    //     "Fun": require('../resources/images/10.png'),
    //     "Project Updates": require('../resources/images/10.png'),
    //     "Questions": require('../resources/images/10.png'),
    //     "Flooring": require('../resources/images/10.png'),
    //     "Electrical": require('../resources/images/10.png'),
    //     "Painting": require('../resources/images/10.png'),
    // }

    return (
        <TouchableOpacity
            onPress={() => setSelected(title)}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: spacings.medium * 6,
                marginRight: spacings.small / 2,
            }}>
            <View
                style={{
                    height: spacings.medium * 6,
                    width: spacings.medium * 6,
                    borderRadius: spacings.medium * 3,
                    borderWidth: spacings.medium / 4,
                    borderColor: title === selected ? colors.secondary : colors.surface,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image source={{
                    uri: images[title]
                }} style={{
                    width: spacings.medium * 5,
                    height: spacings.medium * 5,
                    borderRadius: spacings.medium * 2.5,
                }} />
            </View>
            <View style={{
                height: spacings.medium * 3,
                width: spacings.medium * 6,
                justifyContent: "center",
            }} >
                <Text style={{
                    textAlign: "center",
                    ...textStyles.caption,
                    color: title === selected ? "black" : colors.textLight,
                }}>{title}</Text>
            </View>
            <View style={{
                height: spacings.medium / 4,
                width: spacings.medium * 6,
                backgroundColor: title === selected ? colors.secondary : colors.surface,
            }} />
        </TouchableOpacity>
    )
}

const CheckedBoxes = ({ titlesArray, checkedTitlesArray, containerStyle }) => {
    const checkedBoxes = titlesArray.map((title, index) => {
        return (
            <View key={index} style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: checkedTitlesArray.includes(title) ? colors.backgroundGreen : colors.background,
                height: spacings.medium * 4.5,
                borderRadius: 4,
                paddingHorizontal: spacings.large,
                marginBottom: spacings.small,
            }} >
                {checkedTitlesArray.includes(title)
                    ? <MaterialIcons name="check" size={iconSizes.large} color={colors.primary} />
                    : <MaterialIcons name="check" size={iconSizes.large} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: checkedTitlesArray.includes(title) ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </View>
        )
    })
    return (
        <View style={{ ...containerStyle }}>
            {checkedBoxes}
        </View>
    )
}
const CheckBoxes = ({ titlesArray, selectedArray, setSelectedArray, containerStyle }) => {
    const checkBoxes = titlesArray.map((title, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => {
                    if (selectedArray.includes(title)) {
                        setSelectedArray(selectedArray.filter(item => item !== title))
                    } else {
                        setSelectedArray([...selectedArray, title])
                    }
                }}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: selectedArray.includes(title) ? colors.backgroundGreen : colors.background,
                    height: spacings.medium * 4.5,
                    borderRadius: 4,
                    paddingHorizontal: spacings.large,
                    marginBottom: spacings.small,
                }} >
                {selectedArray.includes(title)
                    ? <MaterialIcons name="check-box" size={iconSizes.medium} color={colors.primary} />
                    : <MaterialIcons name="check-box-outline-blank" size={iconSizes.medium} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: selectedArray.includes(title) ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <View style={{ ...containerStyle }}>
            {checkBoxes}
        </View>
    )
}
const CheckBoxesTemp = ({ titlesArray, selectedArray, onPress, containerStyle }) => {
    const checkBoxes = titlesArray.map((title, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => onPress(title)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: selectedArray.includes(title) ? colors.backgroundGreen : colors.background,
                    height: spacings.medium * 4.5,
                    borderRadius: 4,
                    paddingHorizontal: spacings.large,
                    marginBottom: spacings.small,
                }} >
                {selectedArray.includes(title)
                    ? <MaterialIcons name="check-box" size={iconSizes.medium} color={colors.primary} />
                    : <MaterialIcons name="check-box-outline-blank" size={iconSizes.medium} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: selectedArray.includes(title) ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <View style={{ ...containerStyle }}>
            {checkBoxes}
        </View>
    )
}

const RadioButtons = ({ titlesArray, selected, setSelected, style, containerStyle }) => {
    const radioButtons = titlesArray.map((title, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => setSelected(title)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: selected === title ? colors.backgroundGreen : colors.background,
                    height: spacings.medium * 4.5,
                    borderRadius: 4,
                    paddingHorizontal: spacings.large,
                    marginBottom: spacings.small,
                    ...style,
                }} >
                {selected === title
                    ? <MaterialIcons name="radio-button-checked" size={iconSizes.medium} color={colors.primary} />
                    : <MaterialIcons name="radio-button-unchecked" size={iconSizes.medium} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: selected === title ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <View
            style={{ ...containerStyle }}
        >
            {radioButtons}
        </View>
    )
}
const RadioButtonsTemp = ({ titlesArray, selected, setSelected, style, containerStyle, horizontal }) => {
    const radioButtons = titlesArray.map((title, index) => {
        return (
            <TouchableOpacity
                key={index}
                onPress={() => setSelected(title)}
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: selected === title ? colors.backgroundGreen : colors.background,
                    height: spacings.medium * 4.5,
                    borderRadius: 4,
                    paddingHorizontal: spacings.large,
                    marginBottom: spacings.small,
                    ...style,
                }} >
                {selected === title
                    ? <MaterialIcons name="radio-button-checked" size={iconSizes.medium} color={colors.primary} />
                    : <MaterialIcons name="radio-button-unchecked" size={iconSizes.medium} color={colors.icon} />
                }
                <Text style={{
                    ...textStyles.heading3,
                    fontWeight: "normal",
                    color: selected === title ? "black" : colors.textDark,
                    marginLeft: spacings.medium,
                }} >{title}</Text>
            </TouchableOpacity>
        )
    })
    return (
        <ScrollView
            horizontal={horizontal}
            style={{ ...containerStyle }}
        >
            {radioButtons}
        </ScrollView>
    )
}

const UploadPhoto = ({ title, onUrlChange, containerStyle, imageContainerStyle }) => {
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = useState('');

    const [visible, setVisible] = useState(false);


    // This function is triggered when the "Select an image" button pressed
    const showImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your photos!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();


        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            onUrlChange(result.uri);
        }
        setVisible(false);
    };


    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this appp to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();


        if (!result.cancelled) {
            setPickedImagePath(result.uri);
            onUrlChange(result.uri);
        }
        setVisible(false);
    };

    return (
        <View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                ...containerStyle,
            }}>
                <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={{
                        height: spacings.large * 6,
                        width: spacings.large * 6,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: 4,
                        marginRight: spacings.medium,
                        ...imageContainerStyle,
                    }}>
                    <MaterialIcons name="image" size={iconSizes.medium} color={colors.text} />
                    <Text style={{
                        ...textStyles.body,
                        marginTop: spacings.small / 2,
                    }}>
                        {title ? title : "Add Photo"}
                    </Text>
                </TouchableOpacity>

                {
                    pickedImagePath !== '' &&
                    <View style={{}}>
                        <Image
                            source={{ uri: pickedImagePath }}
                            style={{
                                height: spacings.large * 6,
                                width: spacings.large * 6,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: colors.border,
                                borderRadius: 4,
                                marginRight: spacings.small,
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                setPickedImagePath('');
                                onUrlChange('');
                            }}
                            style={{
                                position: 'absolute',
                                top: spacings.small * 0.5,
                                right: spacings.small * 1.5,
                                height: spacings.large * 1.2,
                                width: spacings.large * 1.2,
                                borderRadius: spacings.large * 1.2 / 2,
                                backgroundColor: colors.background,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <MaterialIcons name="add" size={iconSizes.small} color={colors.text}
                                style={{ transform: [{ rotate: '45deg' }] }}
                            />
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}
                overlayStyle={{
                    height: 'auto',
                    width: '80%',
                    borderRadius: 8,
                    backgroundColor: colors.surface,
                    padding: 0,
                }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: spacings.medium,
                }}>
                    <Text style={{
                        ...textStyles.body,
                        fontWeight: 'bold',
                        marginLeft: spacings.small / 2,
                    }}>
                        Select an image from
                    </Text>
                    <TouchableOpacity
                        onPress={() => setVisible(!visible)}
                        style={{
                            height: spacings.large * 2.5,
                            width: spacings.large * 2.5,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: colors.borderDisabled,
                            borderRadius: 4,
                        }}>
                        <MaterialIcons name="add" size={iconSizes.large} color={colors.text}
                            style={{ transform: [{ rotate: '45deg' }] }}
                        />
                    </TouchableOpacity>
                </View>
                <DividerHorizontal />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    padding: spacings.large * 2,
                    paddingHorizontal: spacings.large
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            showImagePicker();
                            // setVisible(!visible);
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginRight: spacings.large * 2,
                        }}>
                        <MaterialIcons name="photo-library" size={iconSizes.medium} color={colors.text} />
                        <Text style={{
                            ...textStyles.body,
                            marginTop: spacings.small / 2,
                        }}>
                            Gallery
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            openCamera();
                            // setVisible(!visible);
                        }}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <MaterialIcons name="camera-alt" size={iconSizes.medium} color={colors.text} />
                        <Text style={{
                            ...textStyles.body,
                            marginTop: spacings.small / 2,
                        }}>
                            Camera
                        </Text>
                    </TouchableOpacity>
                </View>
            </Overlay>
        </View>
    );
}




export { colors, opacities, spacings, iconSizes, textStyles, textInputStyles, DividerHorizontal, DividerVertical, ButtonOne, ButtonOneUnfilled, ButtonTwo, ButtonTwoUnfilled, SelectStory, CheckedBoxes, CheckBoxes, CheckBoxesTemp, RadioButtons, RadioButtonsTemp, UploadPhoto };