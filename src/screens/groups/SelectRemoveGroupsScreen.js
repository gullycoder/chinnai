import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FeedsContext } from '../../context/FeedsContext'
import ShareApp from '../../components/groups/ShareApp'
import UploadPhoto from '../../components/groups/UploadPhoto'

export default function SelectRemoveGroupsScreen() {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            < UploadPhoto />
            <View>
                <ShareApp />
            </View>
        </View>
    );
}

