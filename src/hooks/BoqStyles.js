import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from '../context/DesignSystem';

const BoqStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderWidth: 1,
        borderColor: colors.borderLight,
        backgroundColor: colors.background,
    },
    sectionContainer: {
        flexDirection: 'column',
    },
    sectionHeadingContainer: {
        height: spacings.medium * 4,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingHorizontal: spacings.small,
    },
    sectionHeading: {
        ...textStyles.caption,
        textAlign: 'right',
        fontWeight: 'bold',
        color: colors.text,
    },
    sectionBody: {
        flex: 1,
        ...textStyles.heading3,
        color: "black",
        fontWeight: 'normal',
        textAlign: 'right',
        paddingHorizontal: spacings.small,
        paddingVertical: spacings.small,
        backgroundColor: colors.surface,
    },
    button: {
        marginVertical: spacings.small,
    },
    buttonText: {
        paddingHorizontal: spacings.medium,
    },
    sectionBodyContainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.surface,
    },
    textInput: {
        ...textStyles.heading3,
        color: colors.primary,
        textAlign: 'right',
        paddingHorizontal: spacings.small,
        paddingVertical: spacings.small,
        backgroundColor: colors.surface,
    },






});


export { BoqStyles };