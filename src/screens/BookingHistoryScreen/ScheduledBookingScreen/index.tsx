import { getTicketsScheduled } from "@src/store/actions/ticketAction";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectNewTickets, selectUser } from "@src/store/selectors";
import { useEffect } from "react";
import { View, Text, FlatList } from "react-native";

type Props = {
  navigation: any;
};

const ScheduledBookingScreen = ({ navigation }: Props) => {
  const newTicketsState = useAppSelector(selectNewTickets);
  const userState = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTicketsScheduled(userState.id));
  }, []);

  const navigationTicket = (item: Ticket) => {
    navigation.navigate("BookingTicketScreen", item);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        data={newTicketsState}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={{ margin: 12 }} onPress={() => navigationTicket(item)}>
            {JSON.stringify(item)}
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ScheduledBookingScreen;
