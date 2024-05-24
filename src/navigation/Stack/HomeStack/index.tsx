import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeStackParams } from "../types";
import HomeScreen from "@src/screens/HomeScreen";

const Stack = createNativeStackNavigator<HomeStackParams>();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
