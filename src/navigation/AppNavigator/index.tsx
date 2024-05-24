import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NotFoundScreen from "@src/screens/NotFoundScreen";
import { AppStackParams } from "./types";
import AppTabNavigator from "../AppTabNavigator";
import LinkingConfiguration from "../LinkingConfiguration";
import SignIn from "@src/screens/Authentication/SignIn";
import SignUp from "@src/screens/Authentication/SignUp";
import ResetPassword from "@src/screens/Authentication/ResetPassword";
import Verification from "@src/screens/Authentication/Verification";
import ChangePassword from "@src/screens/Authentication/ChangePassword";
import { Colors } from "@src/constants";

const Stack = createNativeStackNavigator<AppStackParams>();

const headerOption = {
  headerShown: false,
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={LinkingConfiguration} theme={DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignIn} options={headerOption} />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: "Sign up",
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            headerTitleStyle: {
              color: Colors.light.primary,
              fontSize: 20,
              fontWeight: "700",
            },
            headerBackTitleVisible: false,
            headerShadowVisible: false,
            headerTintColor: Colors.light.primary,
            headerTitleAlign: "left",
            contentStyle: {
              backgroundColor: Colors.light.background,
            },
          }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={headerOption}
        />
        <Stack.Screen
          name="Verification"
          component={Verification}
          options={headerOption}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={headerOption}
        />

        <Stack.Screen
          name="App"
          component={AppTabNavigator}
          options={headerOption}
        />
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
