import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast';


export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [id, setId] = useState(undefined);

  /*let toast = Toast.show('Request failed to send.', {
    duration: Toast.durations.LONG,
  });*/




  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    let toast = Toast.show(`${data} 입장 허가`, {
      position: Toast.positions.CENTER,
    });

    const check = () => {
      setScanned(true);
      /*Alert.alert("드림플러스", `${data} 입장 허가`);
    };
    await check();    // 데이터 확인
    setTimeout(() => {
      return setScanned(false);//return setId(data);
    }, 2000);*/
      setTimeout(function hideToast() {
        Toast.hide(toast);
      }, 1500);

    };
    await check();
    setTimeout(() => {
      return setScanned(false);
    }, 2000);
  };

  /*useEffect(() => {
    return setScanned(false);
  },[id]);*/

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  };
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  };

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>
    </RootSiblingParent>
  );
};
//{scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  barCodeView: {
    width: '100%',
    height: '50%',
    marginBottom: 40
  },
});
