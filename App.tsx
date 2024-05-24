import App from "@src/App";
import "react-native-gesture-handler";
import { NativeModules } from "react-native";

const { UIManager } = NativeModules;

if (UIManager) {
  UIManager.genericDirectEventTypes = {
    ...UIManager.genericDirectEventTypes,
    onGestureHandlerEvent: { registrationName: "onGestureHandlerEvent" },
    onGestureHandlerStateChange: {
      registrationName: "onGestureHandlerStateChange",
    },
  };
}

export default App;
