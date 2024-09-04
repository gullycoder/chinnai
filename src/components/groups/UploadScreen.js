// import React, { useState } from 'react';
// import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet, Platform, Alert, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
// import Progress from 'react-native-progress';

// const selectImage = () => {
//     const options = {
//         maxWidth: 2000,
//         maxHeight: 2000,
//         storageOptions: {
//             skipBackup: true,
//             path: 'images'
//         }
//     };
//     ImagePicker.showImagePicker(options, response => {
//         if (response.didCancel) {
//             console.log('User cancelled image picker');
//         } else if (response.error) {
//             console.log('ImagePicker Error: ', response.error);
//         } else if (response.customButton) {
//             console.log('User tapped custom button: ', response.customButton);
//         } else {
//             const source = { uri: response.uri };
//             console.log(source);
//             setImage(source);
//         }
//     });
// };

// export default function UploadScreen() {
//     const [image, setImage] = useState(null);
//     const [uploading, setUploading] = useState(false);
//     const [transferred, setTransferred] = useState(0);

//     return (
//         <SafeAreaView style={styles.container}>
//             <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
//                 <Text style={styles.buttonText}>Pick an image</Text>
//             </TouchableOpacity>
//             <View style={styles.imageContainer}>
//                 {image !== null ? (
//                     <Image source={{ uri: image.uri }} style={styles.imageBox} />
//                 ) : null}
//                 {uploading ? (
//                     <View style={styles.progressBarContainer}>
//                         <Progress.Bar progress={transferred} width={300} />
//                     </View>
//                 ) : (
//                     <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
//                         <Text style={styles.buttonText}>Upload image</Text>
//                     </TouchableOpacity>
//                 )}
//             </View>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: '#bbded6'
//     },
//     selectButton: {
//         borderRadius: 5,
//         width: 150,
//         height: 50,
//         backgroundColor: '#8ac6d1',
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     uploadButton: {
//         borderRadius: 5,
//         width: 150,
//         height: 50,
//         backgroundColor: '#ffb6b9',
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 20
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold'
//     },
//     imageContainer: {
//         marginTop: 30,
//         marginBottom: 50,
//         alignItems: 'center'
//     },
//     progressBarContainer: {
//         marginTop: 20
//     },
//     imageBox: {
//         width: 300,
//         height: 300
//     }
// });