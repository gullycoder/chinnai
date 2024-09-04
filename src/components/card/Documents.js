import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { ButtonGroup } from 'react-native-elements';
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes, CheckBoxes, CheckBoxesTemp } from '../../context/DesignSystem';


const Documents = () => {
    const { user, rules, updateUserField } = useContext(UserContext);

    const [selectedDocuments, setSelectedDocuments] = useState(
        user.userDocuments ? user.userDocuments : []
    );

    useEffect(() => {
        updateUserField("userDocuments", selectedDocuments);
    }, [selectedDocuments]);


    return (
        <View style={styles.container}>
            <CheckBoxesTemp
                titlesArray={rules.rulesDocuments}
                selectedArray={selectedDocuments}
                onPress={(title) => {
                    if (selectedDocuments.includes(title)) {
                        setSelectedDocuments(selectedDocuments.filter(item => item !== title))
                    } else {
                        setSelectedDocuments([...selectedDocuments, title])
                    }
                }}
            />
        </View>
    )
}

export default Documents

const styles = StyleSheet.create({
    container: {
        marginLeft: spacings.small,
    },


})