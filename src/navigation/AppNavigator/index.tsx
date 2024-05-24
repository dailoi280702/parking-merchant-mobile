import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "@src/screens/NotFoundScreen";
import { useEffect, useState } from "react";
import { ColorSchemeName } from "react-native";
import { AppStackParams } from "./types";
import AppTabNavigator from "../AppTabNavigator";
import LinkingConfiguration from "../LinkingConfiguration";
import SignIn from "@src/screens/Authentication/SignIn";

const Stack = createNativeStackNavigator<AppStackParams>();

const AppNavigator = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const [isRememberedAccount, setIsRememberedAccount] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const email = await AsyncStorage.getItem("email");
      const password = await AsyncStorage.getItem("password");
      if (email && password) {
        setIsRememberedAccount(true);
      }
    })();
  }, []);

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isRememberedAccount && (
          <Stack.Screen name="SignIn" component={SignIn} />
        )}
        <Stack.Screen name="App" component={AppTabNavigator} />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
