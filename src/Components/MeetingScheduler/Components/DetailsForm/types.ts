import { ISlotsPickerRef } from "../SlotsPicker/types";

export type IAttendeeType = { name: string; email: string };

export interface IDetailsForm {
  bookedInfo: ISlotsPickerRef;
  bookingInfoHandler: (value: IAttendeeType) => void;
}
