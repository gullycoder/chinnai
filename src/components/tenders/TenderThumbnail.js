import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useContext } from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { TendersContext } from '../../context/TendersContext'
import { ButtonOne, ButtonTwo, colors, DividerHorizontal, iconSizes, spacings, textStyles } from '../../context/DesignSystem';


const TenderThumbnail = ({ tender, bidder, navigation }) => {
    const { addNewBidder } = useContext(TendersContext)


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                addNewBidder({
                    tenderId: tender.tenderId,
                    bidderStatus: "viewed",
                    navigationCallback:
                        bidder && bidder.bidderStatus === "applied"
                            ? () => navigation.navigate('MyBidDetailsScreen', { tenderId: tender.tenderId })
                            : () => navigation.navigate('TenderDetailsScreen', { tenderId: tender.tenderId })
                });
            }}>
                <Text style={styles.amount}>
                    Rs. {tender.boq.value}
                    <Text style={styles.paymentCycle}>  total value</Text>
                </Text>
                <Text style={styles.tenderType}>
                    {tender.tenderType}
                </Text>
                <Text style={styles.topCaptions}>
                    {tender.tenderCompanyName}
                </Text>
                <Text style={styles.topCaptions}>
                    {tender.tenderProjectName}
                </Text>
                <View style={styles.cityAndWorkersContainer}>
                    <Text style={styles.topCaptions}>
                        {tender.tenderCity}
                    </Text>
                    {tender.tenderWorkersExpected &&
                        <View style={styles.tenderWorkersExpectedContainer}>
                            <MaterialIcons name="groups" size={iconSizes.medium} color={colors.icon} />
                            <Text style={[styles.bottomCaptions, { marginLeft: spacings.small / 2, marginBottom: 0, }]}>
                                {tender.tenderWorkersExpected} Workers required
                            </Text>
                        </View>
                    }
                </View>
                <DividerHorizontal style={styles.divider} />

                {tender.tenderBidDeadline &&
                    <Text style={styles.topCaptions}>
                        <Text style={styles.bottomCaptions}>Bid due date: </Text>
                        {tender.tenderBidDeadline}
                    </Text>
                }

                {bidder && bidder.bidderStatus === "applied" &&
                    <View style={styles.statusContainer}>
                        <Text style={styles.status}>
                            {bidder.bidderStatus}
                        </Text>
                    </View>
                }
                {bidder && bidder.bidderStatus === "viewed" &&
                    <View style={[styles.statusContainer, { backgroundColor: colors.background }]}>
                        <Text style={[styles.status, { color: colors.text }]}>
                            {bidder.bidderStatus}
                        </Text>
                    </View>
                }

                <ButtonTwo
                    title="View Details"
                    style={styles.button}
                    onPress={() => {
                        addNewBidder({
                            tenderId: tender.tenderId,
                            bidderStatus: "viewed",
                            navigationCallback:
                                bidder && bidder.bidderStatus === "applied"
                                    ? () => navigation.navigate('MyBidDetailsScreen', { tenderId: tender.tenderId })
                                    : () => navigation.navigate('TenderDetailsScreen', { tenderId: tender.tenderId })
                        });
                    }}
                />
            </TouchableOpacity>
        </View>
    )
}

export default TenderThumbnail


const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        elevation: 2,
        marginBottom: spacings.medium,
        padding: spacings.medium,
        borderRadius: 4,
        justifyContent: 'space-between',
    },
    amount: {
        ...textStyles.heading1,
        marginBottom: spacings.small,
    },
    paymentCycle: {
        ...textStyles.caption,
    },
    tenderType: {
        ...textStyles.heading3,
        color: colors.primary,
        marginBottom: spacings.small / 4,
    },
    topCaptions: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'bold',
        marginBottom: spacings.small / 2,
    },
    bottomCaptions: {
        ...textStyles.caption,
        fontWeight: 'normal',
        marginBottom: spacings.small,
    },
    divider: {
        marginTop: spacings.small / 2,
        marginBottom: spacings.medium,
    },
    cityAndWorkersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderWidth: 1,
    },
    tenderWorkersExpectedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    datesContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacings.small,
        justifyContent: 'space-between',
    },
    status: {
        ...textStyles.caption,
        color: colors.primary,
        fontWeight: 'bold',
    },
    statusContainer: {
        backgroundColor: colors.backgroundGreen,
        height: spacings.medium * 3,
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: -(spacings.medium),
        top: 0,
        paddingHorizontal: spacings.large,
    },
    button: {
        marginTop: spacings.small,
    }





})