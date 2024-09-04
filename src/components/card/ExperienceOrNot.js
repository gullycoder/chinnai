import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, RadioButtons } from '../../context/DesignSystem';


const ExperienceOrNot = () => {
    const { user, updateUserField } = useContext(UserContext);
    const [experienceOrNot, setExperienceOrNot] = useState(
        user.userExperienceOrNot ? user.userExperienceOrNot : ''
    );



    useEffect(() => {
        if (experienceOrNot !== '') {
            updateUserField("userExperienceOrNot", experienceOrNot);
        } else {
            return;
        }
    }, [experienceOrNot]);


    return (
        <RadioButtons
            titlesArray={['Yes', 'No']}
            selected={experienceOrNot}
            setSelected={setExperienceOrNot}
            style={styles.itemStyle}
            containerStyle={styles.containerStyle}
        />
    )
}

export default ExperienceOrNot

const styles = StyleSheet.create({
    itemStyle: {
        marginLeft: spacings.small
    },
    containerStyle: {
        flexDirection: 'row',
        marginBottom: spacings.small / 2,
    }
})