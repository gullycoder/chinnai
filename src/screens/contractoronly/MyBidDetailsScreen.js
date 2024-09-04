import { StyleSheet, Text, View, Button, SafeAreaView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TendersContext } from '../../context/TendersContext';
import { Overlay } from 'react-native-elements';
import { UserContext } from '../../context/UserContext';
import ViewBoq from '../../components/tenders/ViewBoq';
import BidBoq from '../../components/tenders/BidBoq';
import TenderDetails from '../../components/tenders/TenderDetails';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, ButtonTwoUnfilled, SelectStory, textStyles, opacities, iconSizes, ButtonOneUnfilled } from '../../context/DesignSystem';


const MyBidDetailsScreen = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const { tenderId } = route.params;
    const { tenders, bidders, updateBidder } = useContext(TendersContext);
    const tender = tenders.find(tender => tender.tenderId === tenderId);
    const bidder = bidders.find(bidder => bidder.tenderId === tender.tenderId);

    const [bid, setBid] = useState({
        itemName: bidder.bid.itemName,
        qty: bidder.bid.qty,
        unit: bidder.bid.unit,
        bidRate: bidder.bid.bidRate,
        bidValue: bidder.bid.bidValue,
    });

    const [editBidClicked, setEditBidClicked] = useState(false);

    const [visible, setVisible] = useState(false);


    return (
        <KeyboardAwareScrollView extraHeight={100} >
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.container}>
                <Text style={styles.sectionMainHeading}>
                    Your Submitted Bid
                </Text>
                <View style={styles.bidSectionContainer} >
                    {editBidClicked
                        ? <BidBoq boq={bid} boqtype="createBid" bid={bid} setBid={setBid} />
                        : <BidBoq boq={bid} boqtype="submittedBid" bid={bid} />
                    }
                    <Text style={styles.bottomCaptions}>
                        Bid Status:
                        <Text
                            style={[
                                styles.topCaptions,
                                { color: bidder.bidderStatus === "applied" ? colors.primary : colors.error }
                            ]}
                        > {bidder.bidderStatus}</Text>
                    </Text>
                    <Text style={styles.bottomCaptions}>
                        Bis Submission Date:
                        <Text style={styles.topCaptions}> {bidder.createdAt.toDate().toLocaleDateString()}</Text>
                    </Text>
                    {editBidClicked
                        ? <View style={[styles.buttonsContainer, { paddingHorizontal: 0, }]}>
                            <ButtonTwoUnfilled title="Cancel" onPress={() => {
                                setEditBidClicked(false);
                                setBid({
                                    itemName: bidder.bid.itemName,
                                    qty: bidder.bid.qty,
                                    unit: bidder.bid.unit,
                                    bidRate: bidder.bid.bidRate,
                                    bidValue: bidder.bid.bidValue,
                                });
                            }} />
                            <ButtonTwo
                                title="Review Bid"
                                style={styles.flexButton}
                                disabled={!bid.bidRate}
                                onPress={() => setVisible(!visible)}
                            />
                        </View>
                        : <ButtonTwoUnfilled
                            title="Edit Bid"
                            style={styles.editBidButton}
                            onPress={() => {
                                setEditBidClicked(true);
                            }}
                        />
                    }
                </View>

                <Text style={styles.sectionMainHeading}>
                    Tender Details
                </Text>

                <TenderDetails tender={tender} />

                <View style={styles.buttonsContainer}>
                    <ButtonOneUnfilled
                        title="My bids"
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'MyTendersScreen' }]
                        })}
                    />
                    <ButtonOne
                        title="View more tenders"
                        style={styles.flexButton}
                        onPress={() => navigation.reset({
                            index: 0,
                            routes: [{ name: 'TendersScreen' }]
                        })}
                    />
                </View>

                <View>
                    <Overlay
                        isVisible={visible}
                        onBackdropPress={() => setVisible(!visible)}
                        overlayStyle={styles.overlay}
                    >
                        <Text style={styles.overlayHeading}>Please review your bid before submission</Text>
                        <BidBoq boq={bid} boqtype="reviewBid" bid={bid} />
                        <ButtonOne
                            title="Submit Bid"
                            style={styles.submitButton}
                            onPress={() => {
                                updateBidder({
                                    tenderId: tender.tenderId,
                                    bid: bid,
                                    bidderStatus: "applied",
                                    navigationCallback: () => {
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'MyBidDetailsScreen', params: { tenderId: tender.tenderId } }]
                                        });
                                    }
                                });
                                setVisible(!visible);
                            }}
                        />
                        <ButtonOneUnfilled
                            title="Edit Bid"
                            style={styles.editButton}
                            onPress={() => setVisible(!visible)}
                        />
                    </Overlay>
                </View>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default MyBidDetailsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    bidSectionContainer: {
        padding: spacings.large,
        backgroundColor: colors.surface,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.medium,
    },
    topCaptions: {
        ...textStyles.heading3,
        marginTop: spacings.small,
    },
    bottomCaptions: {
        ...textStyles.heading3,
        fontWeight: 'normal',
        marginTop: spacings.small,
    },
    sectionMainHeading: {
        ...textStyles.heading2,
        margin: spacings.large,
        textAlign: 'center',
    },
    editBidButton: {
        marginTop: spacings.large,
        width: '100%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        backgroundColor: colors.surface,
        paddingHorizontal: spacings.large,
        paddingVertical: spacings.large,
        justifyContent: 'space-between',
    },
    flexButton: {
        flex: 1,
        marginLeft: spacings.large,
    },
    overlay: {
        height: 500,
        width: '100%',
        justifyContent: 'center',
        padding: spacings.large,
        backgroundColor: colors.surface,
        borderRadius: 4,
    },
    overlayHeading: {
        ...textStyles.heading1,
        marginVertical: spacings.large,
        textAlign: 'center',
    },
    submitButton: {
        marginVertical: spacings.large,
    },
    editButton: {
        // marginBottom: spacings.large,
    },


})