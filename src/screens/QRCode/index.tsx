import { useState } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CameraView, useCameraPermissions } from "expo-camera";
import { BarCodeScanningResult } from "expo-camera/build/legacy/Camera.types";
import AppButton from "@src/components/common/AppButton";

interface IProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const QRCode = (props: IProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = async ({ data }: BarCodeScanningResult) => {
    if (scanned) {
      return;
    }

    if (data.slice(0, 7) !== "parking") {
      Alert.alert("Invalid QR code!");
    } else {
      const idTicket = data.slice(7, data.length);
      console.log(idTicket);
    }
    setScanned(true);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <SafeAreaView style={[styles.container, { margin: 24, gap: 12 }]}>
        <Text
          style={{ textAlign: "center", fontSize: 14, fontWeight: "medium" }}
        >
          We need your permission to show the camera
        </Text>
        <AppButton onPress={requestPermission}>
          <Text style={styles.btnGrantPermission}>Grant permission</Text>
        </AppButton>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        onBarcodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      ></CameraView>
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Text style={styles.btnScanAgain}>Tab to Scan Again</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};
export default QRCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  btnScanAgain: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    color: "#FFF",
  },
  btnGrantPermission: {
    fontSize: 20,
    fontWeight: "medium",
    color: "#FFF",
  },
});
