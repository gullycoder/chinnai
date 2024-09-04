import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Overlay } from 'react-native-elements';
import { colors, iconSizes, opacities, spacings, textStyles, textInputStyles, SelectStory, DividerHorizontal, ButtonOne, ButtonOneUnfilled, ButtonTwoUnfilled } from '../../context/DesignSystem';



function UploadPhoto({ photoStyle, onUrlChange }) {
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
    }

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
    }

    return (
        <View>
            <View >
                <Button onPress={showImagePicker} title="Select an image" />
                <Button onPress={openCamera} title="Open camera" />
                <Button onPress={() => { setVisible(true) }} title="Open overlay" />
            </View>

            <View >
                {
                    pickedImagePath !== '' && <Image
                        source={{ uri: pickedImagePath }}
                        style={photoStyle}
                    />
                }
            </View>
            <Overlay isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
                <View style={{
                    justifyContent: 'center',
                    backgroundColor: colors.surface,
                    padding: spacings.large,
                    width: '95%',
                }}>
                    <Text style={{
                        ...textStyles.body,
                        fontSize: textStyles.heading2.fontSize,
                        textAlign: 'center',
                        marginBottom: spacings.large,
                    }}>
                        Do you want to delete the post?
                    </Text>
                    <ButtonOneUnfilled
                        title="Cancel"
                        style={{
                            marginTop: spacings.large,
                            paddingHorizontal: spacings.large * 2,
                        }}
                        onPress={() => {
                            setVisible(!visible);
                        }}
                    />
                </View>
            </Overlay>
        </View>
    );
}

export default UploadPhoto;

// Kindacode.com
// Just some styles
const styles = StyleSheet.create({



});


