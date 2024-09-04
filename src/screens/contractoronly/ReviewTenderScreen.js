import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { TendersContext } from '../../context/TendersContext';


const ReviewTenderScreen = ({ navigation }) => {
    const { tender, createTender } = useContext(TendersContext);


    return (
        <View>
            <Text>ReviewTenderScreen</Text>
            <Text>
                {JSON.stringify(tender)}
            </Text>
            <Button
                title="Go back and Edit"
                onPress={() => {
                    // go back
                    navigation.goBack();
                }}
            />
            <Button
                title="Create Tender Post"
                onPress={() => {
                    createTender(
                        tender,
                        () => navigation.navigate('CardStack', { screen: 'CardScreen' })
                    );
                }}
            />
        </View>
    )
}

export default ReviewTenderScreen

const styles = StyleSheet.create({})