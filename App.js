import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {Image, Platform, StyleSheet, Text, View, TouchableOpacity, ImageBackground} from 'react-native';
import logo from './assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

const bg = require('./assets/bg.jpg');

export default function App() {
    const [selectedImage, setSelectedImage] = React.useState(null);

    let openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync();

        if (pickerResult.cancelled === true) {
            return;
        }

        if (Platform.OS === 'web') {
            let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
            setSelectedImage({ localUri: pickerResult.uri, remoteUri });
        } else {
            setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
        }
    };

    let openShareDialogAsync = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
            return;
        }

        await Sharing.shareAsync(selectedImage.localUri);
    };


    if (selectedImage !== null) {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri:selectedImage.localUri }}
                    style={styles.thumbnail}
                />
                <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
                    <Text style={styles.buttonText}>Share this picture</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={bg} style={styles.bgImage}>
            {/*Loading image by using URL*/}
            <Image source={{uri: "https://i.imgur.com/TkIrScD.png"}} style={styles.logo}/>
            <Text style={styles.instructions}>
                To share a photo from your phone with a friend, just click a button
            </Text>

            <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.button}>
                <Text style={styles.buttonText}>Choose a picture</Text>
            </TouchableOpacity>

            <StatusBar style="auto"/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 20,
    },
    instructions: {
        color: 'green',
        fontSize: 18,
        marginHorizontal: 15,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: "#bbd9bb",
        padding: 20,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        fontSize: 22,
        color: '#034803',
    },
    thumbnail: {
        width: 300,
        height: 300,
        resizeMode: "contain"
    },
    bgImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignItems: "center",
    },
});
