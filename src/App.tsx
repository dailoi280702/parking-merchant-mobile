import AppNavigator from "@src/navigation/AppNavigator";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import { LoadingService } from "@nghinv/react-native-loading";

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <LoadingService>
      <Provider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <AppNavigator />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </Provider>
    </LoadingService>
  );
}
