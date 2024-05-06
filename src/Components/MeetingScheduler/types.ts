import { IAttendeeType } from "./Components/DetailsForm/types";
import { ISlotsPickerRef } from "./Components/SlotsPicker/types";

export interface IMeetingScheduler {
  type: string;
}

export enum BOOKING_STEPS {
  SLOT_PICKER = "slots-picker",
  DETAILS_FORM = "details-form",
  CONFIRMATION_PAGE = "confirmation-page",
}

export interface IBookingInfo {
  slotDetails: ISlotsPickerRef;
  attendeeInfo: IAttendeeType;
}
