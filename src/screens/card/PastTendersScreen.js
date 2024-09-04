import { Button, FlatList, ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native'
import React, { useContext, useEffect } from 'react'
// import { PastTendersContext } from '../../context/PastTendersContext';
// import { UserContext } from '../../context/UserContext';
// import PostedPastTenderThumbnail from '../../components/pastTenders/PostedPastTenderThumbnail';
import { colors, spacings, DividerHorizontal, ButtonOne, ButtonTwo, SelectStory, textStyles, opacities, iconSizes } from '../../context/DesignSystem';

const PastTendersScreen = ({ navigation }) => {
    // const { user } = useContext(UserContext)
    // const { pastTenders, fetchPostedPastTenders } = useContext(PastTendersContext);

    // useEffect(() => {
    //     fetchPostedPastTenders(user.userId);
    // }, [])

    // const postedPastTendersList = pastTenders.map((pastTender) => {
    //     return (
    //         <PostedPastTenderThumbnail
    //             key={pastTender.pastTenderId}
    //             pastTender={pastTender}
    //             navigation={navigation}
    //         />
    //     )
    // })

    return (
        <View style={styles.container} >
            <StatusBar backgroundColor={colors.primaryDark} />
            <View style={styles.buttonContainer}>
                <ButtonOne
                    title="Add your past tender"
                    onPress={() => navigation.navigate('AddPastTenderScreen', { pastTenderId: "to-be-created" })}
                />
            </View>
            {/* <ScrollView style={styles.listContainer}>
                <Text style={styles.sectionHeading}>
                    My Posted PastTenders
                </Text>
                {pastTenders.length > 0
                    ? postedPastTendersList
                    : <Text style={styles.noPastTendersText}>No pastTenders posted yet</Text>
                }
            </ScrollView> */}
        </View>
    )
}

export default PastTendersScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    buttonContainer: {
        padding: spacings.large,
        backgroundColor: colors.surface,
        elevation: 2,
    },
    listContainer: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: spacings.large,
        paddingTop: spacings.large,
    },
    sectionHeading: {
        ...textStyles.heading2,
        marginBottom: spacings.large,
    },
    noPastTendersText: {
        ...textStyles.heading2,
        fontWeight: 'normal',
        textAlign: 'center',
        margin: spacings.large * 2,
    },




})