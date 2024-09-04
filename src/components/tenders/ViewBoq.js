import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from '../../context/DesignSystem';
import { BoqStyles as styles } from '../../hooks/BoqStyles';

const ViewBoq = ({ boq }) => {

    return (
        <View style={[
            styles.container,
            {
                height: boq.itemName.length > 30 ? 120 : 85,
            }
        ]}>
            <View style={[styles.sectionContainer, { flex: 1 }]} >
                <View style={styles.sectionHeadingContainer} >
                    <Text style={[styles.sectionHeading, { textAlign: 'left' }]} >
                        Item Name
                    </Text>
                </View>
                <Text style={[styles.sectionBody, { textAlign: 'left', flex: 1, }]} >
                    {boq.itemName}
                </Text>
            </View>
            <View style={styles.sectionContainer} >
                <View style={styles.sectionHeadingContainer} >
                    <Text style={styles.sectionHeading} >
                        Qty
                    </Text>
                </View>
                <Text style={styles.sectionBody} >
                    {boq.qty}
                </Text>
            </View>
            <View style={styles.sectionContainer} >
                <View style={styles.sectionHeadingContainer} >
                    <Text style={styles.sectionHeading} >
                        Unit
                    </Text>
                </View>
                <Text style={styles.sectionBody} >
                    {boq.unit}
                </Text>
            </View>
            <View style={styles.sectionContainer} >
                <View style={styles.sectionHeadingContainer} >
                    <Text style={styles.sectionHeading} >
                        Rate
                    </Text>
                    <Text style={[styles.sectionHeading, { fontWeight: 'normal' }]} >
                        (Rs.)
                    </Text>
                </View>
                <Text style={styles.sectionBody} >
                    {boq.rate}
                </Text>
            </View>
            <View style={styles.sectionContainer} >
                <View style={styles.sectionHeadingContainer} >
                    <Text style={styles.sectionHeading} >
                        Value
                    </Text>
                    <Text style={[styles.sectionHeading, { fontWeight: 'normal' }]} >
                        (Rs.)
                    </Text>
                </View>
                <Text style={[styles.sectionBody, { fontWeight: 'bold' }]} >
                    {boq.value}
                </Text>
            </View>
        </View>
    )
}

export default ViewBoq
