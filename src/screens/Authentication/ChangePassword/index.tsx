import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Keyboard, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationProp } from "@react-navigation/native";

type Props = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
};

const ChangePassword = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView>
        <View>
          <Text>Change password</Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;
