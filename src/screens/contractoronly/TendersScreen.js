import { Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { ButtonGroup } from 'react-native-elements';
import { UserContext } from '../../context/UserContext';
import { TendersContext } from '../../context/TendersContext';
import TenderThumbnail from '../../components/tenders/TenderThumbnail';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from '../../context/DesignSystem';

const TendersScreen = ({ navigation }) => {
    const { user, rules, updateUserField } = useContext(UserContext);
    const { tenders, fetchTenders, bidders, fetchBidders } = useContext(TendersContext);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
            try {
                if (user.userPreferredTenderTypes === undefined || user.userCity === undefined) {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'ChangeTenderTypesScreen' }]
                    });
                }
                await fetchBidders(user.userId);
            }
            catch (error) {
                console.log(error);
            }
        });
        return unsubscribe;
    }, [navigation]);


    const [selectedCity, setSelectedCity] = useState(
        user.userCity ? user.userCity : ''
    );
    useEffect(() => {
        fetchTenders(selectedCity);
    }, [selectedCity]);
    const [value, setValue] = useState(
        user.userCity ? user.userCity : ''
    );
    const [isFocus, setIsFocus] = useState(false);

    const dropdownData = rules.rulesCity.map(rule => {
        return {
            value: rule,
            label: rule,
        };
    });

    const buttonsArray = user.userPreferredTenderTypes ? ["All", ...user.userPreferredTenderTypes] : ["All", ...rules.rulesTenderTypes]
    const [selectedTenderType, setSelectedTenderType] = useState("All");
    const selectedTenders = selectedTenderType === "All" ? tenders.filter(tender => user.userPreferredTenderTypes.includes(tender.tenderType)) : tenders.filter(tender => tender.tenderType === selectedTenderType);
    const notSelectedTenders = selectedTenderType === "All" ? tenders.filter(tender => !user.userPreferredTenderTypes.includes(tender.tenderType)) : tenders.filter(tender => tender.tenderType !== selectedTenderType);

    const SelectedTendersComponentArray = selectedTenders.map(tender => {
        return (
            <TenderThumbnail
                tender={tender}
                bidder={bidders.find(bidder => bidder.tenderId === tender.tenderId)}
                navigation={navigation}
                key={tender.tenderId}
            />
        )
    })
    const NotSelectedTendersComponentArray = notSelectedTenders.map(tender => {
        return (
            <TenderThumbnail
                tender={tender}
                bidder={bidders.find(bidder => bidder.tenderId === tender.tenderId)}
                navigation={navigation}
                key={tender.tenderId}
            />
        )
    })

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar backgroundColor={colors.primaryDark} />
            <TouchableOpacity
                style={styles.myTendersContainer}
                onPress={() => navigation.navigate('MyTendersScreen')}
            >
                <Text style={styles.myTenders}>
                    My tenders
                    <Text style={styles.myTendersCount}> ({bidders.filter(bidder => bidder.bidderStatus === "applied").length})</Text>
                </Text>
                <Text style={styles.viewAll}>
                    View All
                </Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color={colors.icon} />
            </TouchableOpacity>
            <DividerHorizontal />
            <ScrollView>
                <Text style={styles.sectedTenderTypes}>
                    Your selected tender types
                </Text>
                <View style={styles.selectButtonsContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ChangeTenderTypesScreen')}
                        style={styles.editTenderTypesContainer}>
                        <View style={styles.editTenderTypesCircle}>
                            <MaterialIcons name="edit" size={iconSizes.large} color={colors.icon} />
                        </View>
                        <View style={styles.editTenderTypesTextContainer} >
                            <Text style={styles.editTenderTypesText}>
                                Change tender types
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        data={buttonsArray}
                        renderItem={({ item }) => (
                            <SelectStory
                                title={item}
                                selected={selectedTenderType}
                                setSelected={setSelectedTenderType}
                            />
                        )}
                        keyExtractor={item => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <DividerHorizontal />
                <View style={styles.locationContainer} >
                    <Text style={styles.tendersNear}>
                        Tenders near
                    </Text>
                    <MaterialIcons name="location-on" size={iconSizes.small} color={colors.primary} />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={dropdownData}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select city' : '...'}
                        searchPlaceholder="Search..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.value);
                            setSelectedCity(item.value);
                            setIsFocus(false);
                        }}
                    />
                </View>
                {/* {selectedCity !== user.userCity &&
                    <Button
                        title="Change default city"
                        onPress={() => {
                            navigation.navigate('ChangeTenderTypesScreen');
                        }}
                    />
                } */}
                <View style={styles.selectedTenderContainer}>
                    <Text style={styles.selectedJosText1}>
                        Selected Tenders
                    </Text>
                    <Text style={styles.selectedJosText2}>
                        Tender types that you've selected
                    </Text>
                </View>
                {selectedTenders.length > 0
                    ? <View style={styles.listContainer}>
                        {SelectedTendersComponentArray}
                    </View>
                    : <Text style={styles.noTendersText}>
                        No matching tenders found for your selected tender types in {selectedCity}
                    </Text>
                }
                {notSelectedTenders.length > 0 &&
                    <View>
                        <View style={styles.selectedTenderContainer}>
                            <Text style={styles.selectedJosText1}>
                                Similar Tenders
                            </Text>
                            <Text style={styles.selectedJosText2}>
                                Tenders similar to your selected tender types
                            </Text>
                        </View>
                        <View style={styles.listContainer}>
                            {NotSelectedTendersComponentArray}
                        </View>
                    </View>
                }


                {/* <FlatList
                data={selectedTenders}
                style={styles.listContainer}
                renderItem={({ item }) => (
                    <TenderThumbnail
                        tender={item}
                        bidder={bidders.find(bidder => bidder.tenderId === item.tenderId)}
                        navigation={navigation}
                    />
                )}
                keyExtractor={item => item.tenderId.toString()}
            />
            <Text style={styles.myTenders}>Similar Tenders</Text>
            <FlatList
                data={notSelectedTenders}
                renderItem={({ item }) => (
                    <TenderThumbnail
                        tender={item}
                        bidder={bidders.find(bidder => bidder.tenderId === item.tenderId)}
                        navigation={navigation}
                    />
                )}
                keyExtractor={item => item.tenderId.toString()}
            /> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default TendersScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface,
        flex: 1,
    },
    myTendersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacings.medium,
        paddingHorizontal: spacings.large
    },
    myTenders: {
        ...textStyles.heading2,
    },
    myTendersCount: {
        ...textStyles.heading2,
        fontSize: textStyles.heading2.fontSize + 1,
        color: colors.primary,
    },
    viewAll: {
        ...textStyles.heading3,
        color: colors.primary,
        flex: 1,
        textAlign: 'right',
    },
    sectedTenderTypes: {
        ...textStyles.heading2,
        marginTop: spacings.small,
        marginHorizontal: spacings.large,
    },
    selectButtonsContainer: {
        marginVertical: spacings.small,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: spacings.large,
    },
    editTenderTypesContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: spacings.medium * 6,
        marginRight: spacings.small / 2,
    },
    editTenderTypesCircle: {
        height: spacings.medium * 5,
        width: spacings.medium * 5,
        borderRadius: spacings.medium * 2.5,
        borderWidth: spacings.medium / 4,
        borderColor: colors.borderDisabled,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    editTenderTypesTextContainer: {
        height: spacings.medium * 3,
        width: spacings.medium * 6,
        justifyContent: "center",
    },
    editTenderTypesText: {
        textAlign: "center",
        ...textStyles.caption,
        color: colors.textLight,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacings.small,
        marginHorizontal: spacings.large,
    },
    tendersNear: {
        ...textStyles.heading2,
        marginRight: spacings.small,
    },
    dropdown: {
        flex: 1,
        paddingHorizontal: 8,
    },
    dropdownLabel: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 894,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: colors.primary,
        fontWeight: 'bold',
    },
    selectedTextStyle: {
        fontSize: textStyles.heading2.fontSize,
        color: colors.primary,
        fontWeight: 'bold',
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    selectedTenderContainer: {
        backgroundColor: colors.surfaceYellow,
        paddingVertical: spacings.medium,
        paddingHorizontal: spacings.large,
    },
    selectedJosText1: {
        ...textStyles.heading2,
        color: colors.text,
    },
    selectedJosText2: {
        ...textStyles.caption,
        color: colors.text,
        fontWeight: 'normal',
    },
    listContainer: {
        backgroundColor: colors.background,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.medium,
    },
    noTendersText: {
        ...textStyles.heading2,
        color: colors.text,
        fontWeight: 'normal',
        textAlign: 'center',
        margin: spacings.large * 2,
    },



})