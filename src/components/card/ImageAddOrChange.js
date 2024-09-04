import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, ButtonOneUnfilled, UploadPhoto } from '../../context/DesignSystem';
import { UserContext } from '../../context/UserContext';

const ImageAddOrChange = () => {
    const [photoUrl, setPhotoUrl] = React.useState('')
    const { user, updateUserField, uploadFileToStorage, updateTwoUserFields } = React.useContext(UserContext);
    const [userPhotoAdded, setUserPhotoAdded] = React.useState(
        user.userPhotoAdded ? user.userPhotoAdded : ''
    )


    return (
        <View style={[styles.container]}>
            <UploadPhoto
                onUrlChange={(url) => {
                    setPhotoUrl(url);
                }}
                imageContainerStyle={styles.imageContainer}
            />
            {!user.userPhotoAdded && !photoUrl
                ? <ButtonTwoUnfilled
                    title={"I'll do it later"}
                    style={styles.skipButton}
                    onPress={() => {
                        updateUserField("userPhotoAdded", false);
                        setUserPhotoAdded(false);
                    }}
                />
                : photoUrl
                    ? <ButtonTwoUnfilled
                        title={"Save"}
                        style={styles.skipButton}
                        onPress={async () => {
                            const url = await uploadFileToStorage(photoUrl, user.userId);
                            await updateTwoUserFields('userPhotoUrl', url, "userPhotoAdded", true);
                            setUserPhotoAdded(true);
                            setPhotoUrl('');
                        }}
                    />
                    : null
            }
        </View>
    )
}

export default ImageAddOrChange

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        alignItems: 'center',
        width: '100%',
        marginBottom: spacings.large,
    },
    imageContainer: {
        marginHorizontal: spacings.small,
        marginVertical: spacings.small / 2,
    },
    skipButton: {
        marginTop: spacings.large,
        width: '100%',
    },

})