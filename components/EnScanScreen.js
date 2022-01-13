import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../assets/styles/styles';

import BackIcon from '../assets/images/back.svg'; //뒤로가기

// Page
export default function ScanScreen({ navigation }) {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);

        let qrdata = data.split(",");
        let qrcode = "";
        for (let i=0;i<qrdata.length;i++) {
            let parsedata = qrdata[i].split("=");
            if(parsedata[0] == "code") {
                if (parsedata[1] != "" && parsedata[1] != null) {
                    qrcode = parseInt(parsedata[1]);
                }
            }
        }
        if (qrcode != "") {
            //alert(qrcode);
            navigation.replace("EnPage4",{idx: qrcode});
        }
        //navigation.replace("Page4",{idx: 6});
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
        
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
        />
        <TouchableOpacity style={{position:'absolute', left:20,top:24}}
        onPress={() => {
          navigation.pop();
        }} >
            <BackIcon width={24} height={19} />
        </TouchableOpacity>
        </View>
    );
  }
  