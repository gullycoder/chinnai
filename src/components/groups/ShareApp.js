import React from 'react';
import { Share, View, Button } from 'react-native';
import { ButtonTwo } from '../../context/DesignSystem';


const ShareApp = () => {

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Chinaai App|| https://console.firebase.google.com/u/3/project/chinaai-72dff/storage/chinaai-72dff.appspot.com/files'
        ,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {

        } else {

        }
      } else if (result.action === Share.dismissedAction) {

      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={{ marginTop: 50 }}>
      <ButtonTwo
        title="Share this app"
        onPress={onShare} />

    </View>
  );
};

export default ShareApp;