import ParkingSlotItem from "@src/components/Booking/ParkingSlotItem";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking } from "@src/store/selectors";
import { availableSlotsActions } from "@src/store/slices/availableSlotSlice";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const SelectParkingSlotScreen = ({ navigation }: any) => {
  const bookingState = useAppSelector(selectBooking);
  const dispatch = useAppDispatch();
  const availableSlotState = useAppSelector((state) => state.availableSlot);
  const navigateNext = () => {
    navigation.navigate("SelectPaymentScreen");
  };

  useEffect(() => {
    const getSlots = async () => {
      dayjs.extend(utc);
      const data = {
        start: dayjs(bookingState.startTime).utc().format(),
        end: dayjs(bookingState.endTime).utc().format(),
        idParkingLot: bookingState.parkingLot.id,
      };
      dispatch(availableSlotsActions.getAvailableSlots(data));
    };
    getSlots();
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <FlatList
        data={availableSlotState.blocks}
        keyExtractor={(block) => block.id}
        renderItem={({ item }) => (
          <ParkingSlotItem
            key={item.id}
            block={item}
            slots={item.parkingSlots}
          />
        )}
      />
      <AppButton style={styles.continueButton} onPress={navigateNext}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default SelectParkingSlotScreen;

const styles = StyleSheet.create({
  continueButton: {
    marginTop: 12,
    position: "absolute",
    bottom: 10,
    right: 20,
    left: 20,
  },
  countinueText: {
    color: Colors.light.background,
    fontSize: 18,
    fontWeight: "600",
  },
});
