import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { ButtonGroup } from 'react-native-elements';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, CheckBoxes, CheckBoxesTemp } from '../../context/DesignSystem';


const PastTenderTypes = () => {
    const { user, rules, updateUserField } = useContext(UserContext);

    const [selectedPastTenderTypes, setSelectedPastTenderTypes] = useState(
        user.userPastTenderTypes ? user.userPastTenderTypes : []
    );

    useEffect(async () => {
        try {
            await updateUserField("userPastTenderTypes", selectedPastTenderTypes);
        } catch (error) {
            console.log(error);
        }
    }, [selectedPastTenderTypes]);


    return (
        <View style={styles.container}>
            <CheckBoxesTemp
                titlesArray={rules.rulesTenderTypes}
                selectedArray={selectedPastTenderTypes}
                onPress={(title) => {
                    if (selectedPastTenderTypes.includes(title)) {
                        setSelectedPastTenderTypes(selectedPastTenderTypes.filter(item => item !== title))
                    } else {
                        setSelectedPastTenderTypes([...selectedPastTenderTypes, title])
                    }
                }}
            />
        </View>
    )
}

export default PastTenderTypes

const styles = StyleSheet.create({
    container: {
        marginLeft: spacings.small,
    },
})