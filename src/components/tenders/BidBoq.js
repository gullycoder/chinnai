import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { BoqStyles as styles } from '../../hooks/BoqStyles';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from '../../context/DesignSystem';
import { UserContext } from '../../context/UserContext';



const BidBoq = ({ boq, boqtype, bid, setBid, setAlertOverlayVisible }) => {
    const { user } = useContext(UserContext);
    const [addRateClicked, setAddRateClicked] = useState(
        bid.bidRate ? true : false
    );
    const [textInputFocused, setTextInputFocused] = useState(false);


    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.backgroundGreen,
                height: bid.itemName.length > 30 || !addRateClicked ? 120 : 85,
            }
        ]}>
            <View style={[styles.sectionContainer, { flex: 1 }]} >
                <View style={styles.sectionHeadingContainer} >
                    <Text style={[styles.sectionHeading, { textAlign: 'left' }]} >
                        Item Name
                    </Text>
                </View>
                <Text style={[styles.sectionBody, { textAlign: 'left' }]} >
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
                </View >
                <View style={styles.sectionBodyContainer} >
                    {boqtype === 'reviewBid' &&
                        <Text style={[styles.sectionBody, { fontWeight: 'bold', color: colors.primary }]} >
                            {bid.bidRate}
                        </Text>
                    }
                    {boqtype === 'submittedBid' &&
                        <Text style={[styles.sectionBody, { fontWeight: 'bold', color: colors.primary }]} >
                            {bid.bidRate}
                        </Text>
                    }
                    {boqtype === 'createBid' && !addRateClicked
                        ? <ButtonTwo
                            title="Add Rate"
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={() => {
                                if (!user.userCardComplete) {
                                    setAlertOverlayVisible(true);
                                    return;
                                }
                                setAddRateClicked(true);
                            }}
                        />
                        : null
                    }
                    {boqtype === 'createBid' && addRateClicked
                        ? <TextInput
                            style={[styles.textInput, (textInputFocused ? { borderBottomWidth: 1 } : null)]}
                            keyboardType='numeric'
                            autoFocus={true}
                            onFocus={() => setTextInputFocused(true)}
                            onBlur={() => setTextInputFocused(false)}
                            placeholder="Add Rate"
                            value={bid.bidRate ? bid.bidRate : ''}
                            onChangeText={(text) => {
                                setBid({ ...bid, bidRate: text, bidValue: text * boq.qty })
                            }}
                        />
                        : null
                    }
                </View>
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
                {bid.bidValue
                    ? <Text style={[styles.sectionBody, { fontWeight: 'bold' }]} >{bid.bidValue}</Text>
                    : <Text style={[styles.sectionBody, { fontWeight: 'bold' }]} >0</Text>}
            </View>
        </View>
    )
}

export default BidBoq