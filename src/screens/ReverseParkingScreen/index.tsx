import { Feather } from "@expo/vector-icons";
import AppButton from "@src/components/common/AppButton";
import { Colors } from "@src/constants";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectBooking, selectTimeFrames } from "@src/store/selectors";
import { bookingActions } from "@src/store/slices/bookingSlice";
import { ColorHelper, CurrencyHelper, DateTimeHelper } from "@src/utils";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { timeFrameActions } from "@src/store/slices/timeFrameSlice";
import SelectableTimeItem from "@src/components/Booking/SelectableTimeItem";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const minuteInterval = 10;

const ReserveParkingScreen = ({ navigation }: any) => {
  const [isDateVisible, setDateVisible] = useState<boolean>(false);
  const [isTimeVisible, setTimeVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const bookingState = useAppSelector(selectBooking);
  const timeFrames = useAppSelector(selectTimeFrames);
  const timeFramesValid = useAppSelector((state) => state.timeFrame.valid);

  const handleConfirmDate = (date: Date) => {
    dispatch(bookingActions.update({ field: "bookingDate", value: date }));
    setDateVisible(false);
  };

  const handleConfirmTime = (time: Date) => {
    const openTime = dayjs(bookingState.parkingLot.startTime);
    const openTimeToMinute = openTime.hour() * 60 + openTime.minute();
    const closeTime = dayjs(bookingState.parkingLot.endTime);
    const closeTimeToMinute = closeTime.hour() * 60 + closeTime.minute();
    const now = time.getHours() * 60 + time.getMinutes();
    if (now < openTimeToMinute || now >= closeTimeToMinute) {
      Alert.alert("Please select a start time within operating hours!");
      return;
    }
    var bookingDate = new Date(
      bookingState.bookingDate.getFullYear(),
      bookingState.bookingDate.getMonth(),
      bookingState.bookingDate.getDate(),
    );
    const startTime = dayjs(bookingDate)
      .add(time.getHours(), "hour")
      .add(time.getMinutes(), "minute")
      .toDate();

    if (dayjs(startTime).isSameOrBefore(new Date())) {
      Alert.alert("Can't select previous time");
      return;
    }
    dispatch(bookingActions.update({ field: "startTime", value: startTime }));
    setTimeVisible(false);
  };

  const onSelectTimeFrame = (timeFrame: TimeFrame) => {
    dispatch(bookingActions.update({ field: "timeFrame", value: timeFrame }));
  };

  useEffect(() => {
    var listTimeFrameValid = timeFrames.filter((element) => {
      const start = dayjs(bookingState.startTime);
      const startToMinute = start.hour() * 60 + start.minute();
      const openTime = dayjs(bookingState.parkingLot.startTime);
      const openTimeToMinute = openTime.hour() * 60 + openTime.minute();
      const closeTime = dayjs(bookingState.parkingLot.endTime);
      const closeTimeToMinute = closeTime.hour() * 60 + closeTime.minute();
      return (
        startToMinute + element.duration >= openTimeToMinute &&
        startToMinute + element.duration <= closeTimeToMinute &&
        element.duration <= closeTimeToMinute - openTimeToMinute
      );
    });
    if (listTimeFrameValid.length <= 0) {
      Alert.alert(
        "Sorry, there is no available time frame for you. \nSee you later!",
      );
    }
    dispatch(timeFrameActions.updateValid(listTimeFrameValid));
  }, [bookingState.startTime]);

  const navigateNext = () => {
    if (
      bookingState.bookingDate &&
      bookingState.startTime &&
      bookingState.timeFrame
    ) {
      var bookingDate = new Date(
        bookingState.bookingDate.getFullYear(),
        bookingState.bookingDate.getMonth(),
        bookingState.bookingDate.getDate(),
      );
      const startTime = dayjs(bookingDate)
        .add(bookingState.startTime.getHours(), "hour")
        .add(bookingState.startTime.getMinutes(), "minute")
        .toDate();
      dispatch(bookingActions.update({ field: "startTime", value: startTime }));
      const endTime = dayjs(startTime)
        .add(bookingState.timeFrame.duration, "minutes")
        .toDate();
      dispatch(bookingActions.update({ field: "endTime", value: endTime }));
      navigation.navigate("SelectParkingSlotScreen");
    } else {
      Alert.alert("You must select booking time!");
    }
  };

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <ScrollView
        style={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Start time</Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.dateContainer}
            onPress={() => setDateVisible(true)}
          >
            <Text style={styles.date}>
              {DateTimeHelper.formatDate(bookingState.bookingDate)}
            </Text>
            <Feather name="calendar" size={20} color={Colors.light.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateContainer, { marginLeft: 12 }]}
            onPress={() => setTimeVisible(true)}
          >
            <Text style={styles.date}>
              {DateTimeHelper.formatTime(bookingState.startTime)}
            </Text>
            <Feather name="clock" size={20} color={Colors.light.text} />
          </TouchableOpacity>
        </View>
        <DateTimePickerModal
          date={bookingState.bookingDate}
          isVisible={isDateVisible}
          mode="date"
          minimumDate={new Date()}
          onConfirm={handleConfirmDate}
          onCancel={() => setDateVisible(false)}
        />
        <DateTimePickerModal
          date={bookingState.startTime}
          isVisible={isTimeVisible}
          mode="time"
          is24Hour
          minuteInterval={minuteInterval}
          onConfirm={handleConfirmTime}
          onCancel={() => setTimeVisible(false)}
        />
        <Text style={styles.title}>Duration</Text>
        <FlatList
          data={timeFramesValid}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <SelectableTimeItem
              item={item}
              selectedId={bookingState?.timeFrame?.id}
              onSelect={() => onSelectTimeFrame(item)}
            />
          )}
        />
        <Text style={styles.title}>Total</Text>
        <Text style={styles.total}>
          {CurrencyHelper.formatVND(bookingState.timeFrame?.cost) || "0₫"}
        </Text>
      </ScrollView>
      <AppButton style={styles.continueButton} onPress={navigateNext}>
        <Text style={styles.countinueText}>Countinue</Text>
      </AppButton>
    </View>
  );
};

export default ReserveParkingScreen;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 12,
    color: Colors.light.heading,
  },
  dateContainer: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: ColorHelper.hexToRgbA(Colors.light.subtitle, 0.1),
    borderRadius: 6,
  },
  date: { fontSize: 16, color: Colors.light.text },
  total: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.primary,
    textAlign: "right",
  },
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
