import { FlatList, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';
import { TendersContext } from '../../context/TendersContext';
import TenderThumbnail from '../../components/tenders/TenderThumbnail';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacings, textStyles, iconSizes } from '../../context/DesignSystem';

const MyTendersScreen = ({ navigation }) => {
    const { tenders, bidders } = useContext(TendersContext);

    const myAppliedTenders = tenders.filter(tender => {
        return bidders.filter(bidder => bidder.tenderId === tender.tenderId && bidder.bidderStatus === "applied").length > 0;
    });

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'TendersScreen' }],
                        });
                    }}
                    style={{
                        marginRight: spacings.large * 2,
                    }}
                >
                    <MaterialIcons name="arrow-back" size={iconSizes.medium} color='white' />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);


    return (
        <View style={styles.listContainer}>
            <StatusBar backgroundColor={colors.primaryDark} />
            {myAppliedTenders.length > 0
                ? <FlatList
                    data={myAppliedTenders}
                    renderItem={({ item }) => (
                        <TenderThumbnail
                            tender={item}
                            bidder={bidders.find(bidder => bidder.tenderId === item.tenderId)}
                            navigation={navigation}
                        />
                    )}
                    keyExtractor={item => item.tenderId.toString()}
                />
                : <Text style={styles.noTendersText}>You have not applied to any tenders yet.</Text>
            }
        </View>
    )
}

export default MyTendersScreen

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
    },
    noTendersText: {
        ...textStyles.heading1,
        textAlign: 'center',
        margin: spacings.large * 2,
    },



})