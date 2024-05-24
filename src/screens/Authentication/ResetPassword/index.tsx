import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any, any>;
};

const ResetPassword = (props: Props) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text>Please enter your phone number to request a password reset</Text>
      </View>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
});
