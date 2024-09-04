import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, RadioButtons } from '../../context/DesignSystem';


const City = () => {
    const { user, rules, updateUserField } = useContext(UserContext);
    const [city, setCity] = useState(
        user.userCity ? user.userCity : ''
    );

    useEffect(() => {
        if (city !== '') {
            updateUserField("userCity", city);
        } else {
            return;
        }
    }, [city]);

    return (
        <RadioButtons
            titlesArray={rules.rulesCity}
            selected={city}
            setSelected={setCity}
            style={styles.itemStyle}
            containerStyle={styles.containerStyle}
        />
    )
}

export default City

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