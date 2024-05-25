interface IReservationParams {
  ticketId: string;
}

export type AppStackParams = {
  Home: {};
  QRCode: {};
  SignIn: {};
  App: {};
  NotFound: {};
  Reservation: IReservationParams;
};
