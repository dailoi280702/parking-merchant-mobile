import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import {
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface IProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const HomeScreen = (props: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <AppButton
          style={styles.btnQRCode}
          onPress={() => console.log("go to qr code screen")}
        >
          <Text style={{ color: "#CCCCCC", fontSize: 20, fontWeight: "600" }}>
            QR Code
          </Text>
        </AppButton>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnQRCode: {
    padding: 8,
    width: "45%",
    backgroundColor: Colors.light.primary,
    color: Colors.light.text,
  },
});
