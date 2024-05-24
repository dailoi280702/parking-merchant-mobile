import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@src/constants";
import ProfileScreen from "@src/screens/ProfileScreen";
import { ProfileStackParams } from "../types";

const Stack = createNativeStackNavigator<ProfileStackParams>();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: Colors.light.primary,
        contentStyle: {
          backgroundColor: Colors.light.background,
        },
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTitleStyle: {
          color: Colors.light.primary,
        },
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          title: "Profile",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
