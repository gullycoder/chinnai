import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { colors, fontSizes, opacities, spacings, ButtonOne, ButtonTwo, SelectStory, textStyles } from '../../context/DesignSystem';

const Header = ({ title }) => {

    return (
        <View>
            <Text style={styles.chinaai}>
                Chinaai
                <Text style={styles.title}>
                    {title}
                </Text>
            </Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    chinaai: {
        ...textStyles.heading1,
        fontWeight: 'bold',
        color: "white",
    },
    title: {
        ...textStyles.heading1,
        fontWeight: 'bold',
        color: colors.secondary,
    }
})