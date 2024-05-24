import { StatusBar } from "expo-status-bar";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";
import Map from "@src/components/Home/Map";
import DetailModal from "@src/components/Home/DetailModal";
import { useState } from "react";
import { useAppDispatch } from "@src/store/hooks";
import { bookingActions } from "@src/store/slices/bookingSlice";

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [distance, setDistance] = useState(0);

  const dispatch = useAppDispatch();

  const navigateBooking = () => {
    setIsShowDetail(false);
    navigation.navigate("ParkingDetailsScreen");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Map
          onSelectedMarker={(p: ParkingLot) => {
            dispatch(
              bookingActions.update({
                field: "parkingLot",
                value: p,
              }),
            );
            setIsShowDetail(true);
          }}
          setDistance={(d: number) => {
            setDistance(d);
          }}
        />

        <DetailModal
          isShow={isShowDetail}
          onClose={() => setIsShowDetail(false)}
          distance={distance}
          navigateBooking={navigateBooking}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
  },
});
