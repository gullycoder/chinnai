import { StyleSheet, Text, View, Button, SafeAreaView, StatusBar } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TendersContext } from '../../context/TendersContext';
import { Overlay } from 'react-native-elements';
import { UserContext } from '../../context/UserContext';
import ViewBoq from '../../components/tenders/ViewBoq';
import BidBoq from '../../components/tenders/BidBoq';
import TenderDetails from '../../components/tenders/TenderDetails';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes, ButtonOneUnfilled } from '../../context/DesignSystem';


const TenderDetailsScreen = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const { tenderId } = route.params;
    const { tenders, bidders, updateBidder } = useContext(TendersContext);
    const tender = tenders.find(tender => tender.tenderId === tenderId);
    const bidder = bidders.find(bidder => bidder.tenderId === tender.tenderId);

    const [visible, setVisible] = useState(false);
    const [alertOverlayVisible, setAlertOverlayVisible] = useState(false);

    const [bid, setBid] = useState({
        itemName: tender.boq.itemName,
        qty: tender.boq.qty,
        unit: tender.boq.unit,
    });


    return (
        <KeyboardAwareScrollView extraHeight={100} >
            <StatusBar backgroundColor={colors.primaryDark} />
            <TenderDetails tender={tender} />
            <View style={styles.sectionContainer} >
                <Text style={[styles.sectionHeading, { textAlign: 'center' }]}>Create Bid</Text>
                <BidBoq
                    boq={tender.boq}
                    boqtype="createBid"
                    bid={bid}
                    setBid={setBid}
                    setAlertOverlayVisible={setAlertOverlayVisible} />
                <ButtonOne
                    title="Review Bid"
                    style={styles.button}
                    disabled={!bid.bidRate}
                    onPress={() => setVisible(!visible)}
                />
                <Overlay
                    isVisible={visible}
                    onBackdropPress={() => setVisible(!visible)}
                    overlayStyle={styles.overlay}
                >
                    <Text style={styles.overlayHeading}>Please review your bid before submission</Text>
                    <BidBoq boq={tender.boq} boqtype="reviewBid" bid={bid} setBid={setBid} />
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
                        title="Go Back to Edit"
                        style={styles.editButton}
                        onPress={() => setVisible(!visible)}
                    />
                </Overlay>
                <Overlay isVisible={alertOverlayVisible} onBackdropPress={() => setAlertOverlayVisible(!alertOverlayVisible)}>
                    <View style={styles.overlayContainer}>
                        <Text style={styles.overlayText}>To create a bid for any tender, please complete your visiting card</Text>
                        <ButtonOne
                            title="Complete visiting card"
                            style={styles.overlayButton}
                            onPress={() => {
                                navigation.reset({
                                    index: 0,
                                    routes: [{
                                        name: 'CardStack',
                                        params: {
                                            screen: 'CreateEditCardScreen',
                                            tenderId: tender.tenderId,
                                        }
                                    }]
                                });
                                setAlertOverlayVisible(!alertOverlayVisible);
                            }}
                        />
                        <ButtonOneUnfilled
                            title="Cancel"
                            onPress={() => {
                                setAlertOverlayVisible(!alertOverlayVisible);
                            }}
                        />
                    </View>
                </Overlay>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default TenderDetailsScreen

const styles = StyleSheet.create({

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
    button: {
        marginVertical: spacings.large,
    },
    overlay: {
        height: '60%',
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
    overlayContainer: {
        justifyContent: 'center',
        backgroundColor: colors.surface,
        padding: spacings.large,
        width: '95%',
    },
    overlayText: {
        ...textStyles.body,
        fontSize: textStyles.heading2.fontSize,
        textAlign: 'center',
        marginBottom: spacings.large,
    },
    overlayButton: {
        marginBottom: spacings.large,
    },



})