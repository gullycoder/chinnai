import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'


const MyTendersThumbnail = ({ tender, bidder, navigation }) => {

    return (
        <TouchableOpacity onPress={() => navigation.navigate('MyBidDetailsScreen', { tenderId: tender.tenderId })}>
            <View style={styles.tender}>
                <Text style={styles.title}>{tender.tenderProjectName}</Text>
                <Text style={styles.title}>{tender.tenderCompanyName}</Text>
                <Text style={styles.title}>{tender.tenderType}</Text>
                <Text style={styles.title}>{tender.tenderCity}</Text>
                {bidder && <Text style={styles.title}>{bidder.bidderStatus}</Text>}
                <Button
                    title="View Details"
                    onPress={() => {
                        navigation.navigate('MyBidDetailsScreen', { tenderId: tender.tenderId })
                    }}
                />
            </View>
        </TouchableOpacity>
    )
}

export default MyTendersThumbnail

const styles = StyleSheet.create({})