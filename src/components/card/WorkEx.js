import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, RadioButtons } from '../../context/DesignSystem';


const WorkEx = () => {
    const { user, updateUserField } = useContext(UserContext);
    const [experience, setExperience] = useState(
        user.userExperience ? user.userExperience : ''
    );

    useEffect(() => {
        if (experience !== '') {
            updateUserField("userExperience", experience);
        } else {
            return;
        }
    }, [experience]);

    const experienceOptions = [
        'Less than 1 year',
        '1-3 years',
        '3-5 years',
        '5-10 years',
        '10+ years'
    ]

    return (
        <RadioButtons
            titlesArray={experienceOptions}
            selected={experience}
            setSelected={setExperience}
            style={styles.itemStyle}
            containerStyle={styles.containerStyle}
        />
    )
}

export default WorkEx

const styles = StyleSheet.create({
    itemStyle: {
        marginLeft: spacings.small
    },
    containerStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: spacings.small / 2,
    },

})