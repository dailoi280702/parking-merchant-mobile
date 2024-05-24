type User = {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  socialId?: string;
  imageUrl: string;
};

type ParkingLot = {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: number;
  long: number;
  startTime: Date;
  endTime: Date;
  companyId: string;
};

type Vehicle = {
  id?: string;
  userId: string;
  name: string;
  number: string;
  type: string;
};

type ParkingSlot = {
  id: string;
  blockId: string;
  block: Block | null;
  name: string;
};

type Block = {
  id: string;
  parkingLotId: string;
  code: string;
  description: string;
  slot: number;
  parkingSlots: ParkingSlot[];
};

type TimeFrame = {
  id: string;
  parkingLotId: string;
  duration: number;
  cost: number;
};

type Booking = {
  idTicket: string;
  parkingLot: ParkingLot;
  vehicle: Vehicle;
  blockCode: string;
  parkingSlot: ParkingSlot;
  timeFrame: TimeFrame;
  startTime: Date;
  endTime: Date;
  bookingDate: Date;
};

type Ticket = {
  id: string;
  vehicleId: string;
  vehicle: Vehicle | null;
  userId: string;
  parkingLotId: string;
  parkingLot: ParkingLot | null;
  parkingSlotId: string;
  parkingSlot: ParkingSlot | null;
  timeFrameId: string;
  timeFrame: TimeFrame | null;
  startTime: Date;
  endTime: Date;
  entryTime: Date;
  exitTime: Date;
  total: string;
  state: string;
  isExtend: boolean;
  ticketExtend: Ticket[];
};
type Favorite = {
  id: string;
  userId: string;
  parkingLotId: string;
  parkingLot?: ParkingLot;
};

type Location = {
  latitude: number;
  longitude: number;
};

type Employee = {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  companyID: string;
  status: string;
  startShiftTime: any;
  endShiftTime: any;
};
