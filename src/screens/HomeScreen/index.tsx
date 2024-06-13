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
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
  navigation: NativeStackNavigationProp<any, any>;
}

const HomeScreen = ({ navigation }: IProps) => {
  const logOut = async () => {
    await AsyncStorage.removeItem("idUser");
    navigation.navigate("SignIn");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={styles.container}>
        <AppButton
          style={styles.btnQRCode}
          onPress={() => navigation.navigate("QRCode")}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
            Scan a ticket
          </Text>
        </AppButton>

        <AppButton style={styles.btnQRCode} onPress={logOut}>
          <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
            Log out
          </Text>
        </AppButton>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 20,
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
