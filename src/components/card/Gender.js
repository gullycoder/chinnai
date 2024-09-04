import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, RadioButtons } from '../../context/DesignSystem';


const Gender = () => {
    const { user, updateUserField } = useContext(UserContext);
    const [gender, setGender] = useState(
        user.userGender ? user.userGender : ''
    );



    useEffect(() => {
        if (gender !== '') {
            updateUserField("userGender", gender);
        } else {
            return;
        }
    }, [gender]);


    return (
        <RadioButtons
            titlesArray={['Male', 'Female']}
            selected={gender}
            setSelected={setGender}
            style={styles.itemStyle}
            containerStyle={styles.containerStyle}
        />
    )
}

export default Gender

const styles = StyleSheet.create({
    itemStyle: {
        marginLeft: spacings.small
    },
    containerStyle: {
        flexDirection: 'row',
        marginBottom: spacings.small / 2,
    }
})