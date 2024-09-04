import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const CreateBoq = ({ addBoqInTender }) => {
    const [boq, setBoq] = useState({});
    const [addItemNameClicked, setAddItemNameClicked] = useState(false);
    const [addQtyClicked, setAddQtyClicked] = useState(false);
    const [addUnitClicked, setAddUnitClicked] = useState(false);
    const [addRateClicked, setAddRateClicked] = useState(false);


    return (
        <View>
            <View>
                <Text>Item Name</Text>
                {addItemNameClicked
                    ? <TextInput
                        style={styles.textInput}
                        placeholder="Item Name"
                        autoFocus={true}
                        onChangeText={(text) => setBoq({ ...boq, itemName: text })}
                    />
                    : <Button
                        title="Add"
                        onPress={() => setAddItemNameClicked(true)}
                    />}
            </View>
            <View>
                <Text>Quantity</Text>
                {addQtyClicked
                    ? <TextInput
                        style={styles.textInput}
                        autoFocus={true}
                        keyboardType='numeric'
                        placeholder="Quantity"
                        onChangeText={(text) => {
                            setBoq({ ...boq, qty: text, value: boq.rate ? boq.rate * text : 0 })
                            addBoqInTender(boq);
                        }}
                    />
                    : <Button
                        title="Add"
                        onPress={() => setAddQtyClicked(true)}
                    />}
            </View>
            <View>
                <Text>Unit</Text>
                {addUnitClicked
                    ? <TextInput
                        style={styles.textInput}
                        autoFocus={true}
                        placeholder="Unit"
                        onChangeText={(text) => setBoq({ ...boq, unit: text })}
                    />
                    : <Button
                        title="Add"
                        onPress={() => setAddUnitClicked(true)}
                    />}
            </View>
            <View>
                <Text>Rate</Text>
                {addRateClicked
                    ? <TextInput
                        style={styles.textInput}
                        keyboardType='numeric'
                        autoFocus={true}
                        placeholder="Rate"
                        onChangeText={(text) => {
                            setBoq({ ...boq, rate: text, value: boq.qty ? boq.qty * text : 0 });
                            addBoqInTender(boq);
                        }}
                    />
                    : <Button
                        title="Add"
                        onPress={() => setAddRateClicked(true)}
                    />}
            </View>
            <View>
                <Text>Value</Text>
                {boq.value
                    ? <Text>{boq.value}</Text>
                    : <Text>0</Text>}
            </View>
        </View>
    )
}

export default CreateBoq

const styles = StyleSheet.create({})