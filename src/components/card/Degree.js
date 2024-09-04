import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, RadioButtons } from '../../context/DesignSystem';


const Degree = () => {
    const { user, rules, updateUserField } = useContext(UserContext);
    const [education, setEducation] = useState(
        user.userEducation ? user.userEducation : ''
    );

    useEffect(() => {
        if (education !== '') {
            updateUserField("userEducation", education);
        } else {
            return;
        }
    }, [education]);

    return (
        <RadioButtons
            titlesArray={rules.rulesEducation}
            selected={education}
            setSelected={setEducation}
            style={styles.itemStyle}
            containerStyle={styles.containerStyle}
        />
    )
}

export default Degree

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