import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ViewBoq from './ViewBoq'
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from '../../context/DesignSystem';


const TenderDetails = ({ tender }) => {


    return (
        <View style={styles.container}>
            <View style={[styles.tenderDetailsContainer]}>
                <Text style={styles.tenderType}>{tender.tenderType}</Text>
                <Text style={styles.amount}>
                    Rs. {tender.boq.value}
                    <Text style={styles.paymentCycle}> (total value or tender)</Text>
                </Text>

                <Text style={styles.bottomCaptions}>
                    Company:
                    <Text style={styles.topCaptions}> {tender.tenderCompanyName}</Text>
                </Text>
                {tender.tenderProjectName &&
                    <Text style={styles.bottomCaptions}>
                        Project:
                        <Text style={styles.topCaptions}> {tender.tenderProjectName}</Text>
                    </Text>
                }

                <Text style={styles.bottomCaptions}>
                    City:
                    <Text style={styles.topCaptions}> {tender.tenderCity}</Text>
                </Text>

                <DividerHorizontal style={styles.divider} />

                {tender.tenderStartDate &&
                    <View style={styles.datesContainer}>
                        <MaterialIcons name="date-range" size={iconSizes.medium} color={colors.icon} />
                        <View style={styles.datesInnerContainer}>
                            <Text style={styles.topCaptions}>
                                <Text style={styles.bottomCaptions}>Bid Submission date: </Text>
                                {tender.tenderBidDeadline}
                            </Text>
                            <Text style={styles.topCaptions}>
                                <Text style={styles.bottomCaptions}>Start date: </Text>
                                {tender.tenderStartDate}
                            </Text>
                            <Text style={styles.topCaptions}>
                                <Text style={styles.bottomCaptions}>End date: </Text>
                                {tender.tenderEndDate}
                            </Text>
                        </View>
                    </View>
                }

            </View>

            <View style={styles.sectionContainer} >
                <Text style={styles.sectionHeading}>Bill of Quantities (BOQ)</Text>
                <ViewBoq boq={tender.boq} />
                {tender.tenderWorkersExpected &&
                    <View style={[styles.tenderDetailsInnerContainers, { marginTop: spacings.medium }]}>
                        <Text style={styles.topCaptions}>
                            <Text style={styles.bottomCaptions}>Workers expected: </Text>
                            {tender.tenderWorkersExpected}
                        </Text>
                    </View>
                }
            </View>
            <View style={styles.sectionContainer} >
                <Text style={styles.sectionHeading}>
                    Description
                </Text>
                <Text style={styles.sectionBody} >
                    {tender.tenderDescription}
                </Text>
            </View>
        </View>
    )
}

export default TenderDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    tenderDetailsContainer: {
        backgroundColor: colors.surfaceYellow,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
        paddingBottom: spacings.small,
        marginBottom: spacings.medium,
    },
    tenderDetailsInnerContainers: {
        flexDirection: 'row',
    },
    tenderType: {
        ...textStyles.heading2,
        color: colors.primary,
        marginBottom: spacings.medium,
    },
    amount: {
        ...textStyles.heading1,
        marginBottom: spacings.medium
    },
    paymentCycle: {
        ...textStyles.heading3,
        fontWeight: 'normal',
    },
    topCaptions: {
        ...textStyles.heading3,
        marginBottom: spacings.small,
    },
    bottomCaptions: {
        ...textStyles.heading3,
        fontWeight: 'normal',
        marginBottom: spacings.small,
    },

    divider: {
        backgroundColor: "black",
        opacity: opacities.o4,
        marginTop: spacings.small,
        marginBottom: spacings.medium,
    },
    datesContainer: {
        flexDirection: 'row',
    },
    datesInnerContainer: {
        marginLeft: spacings.medium,
    },
    sectionContainer: {
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
        paddingBottom: spacings.small,
        backgroundColor: colors.surface,
        marginBottom: spacings.medium,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.large,
    },
    sectionBody: {
        ...textStyles.body,
        marginBottom: spacings.large,
    },



})