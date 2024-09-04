import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, opacities, spacings, textStyles, textInputStyles, ButtonOne, ButtonTwo, SelectStory, DividerVertical, DividerHorizontal, ButtonTwoUnfilled, iconSizes } from '../../context/DesignSystem';


const QuestionBubble = ({ component, question }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>
                {question}
            </Text>
            {component}
        </View>
    )
}

export default QuestionBubble

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        borderTopRightRadius: 12,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        paddingTop: spacings.medium,
        paddingHorizontal: spacings.medium,
        elevation: 1,
        marginBottom: spacings.medium,
        maxWidth: '90%',
    },
    questionText: {
        ...textStyles.body,
        color: 'black',
        marginBottom: spacings.medium,
    },

})