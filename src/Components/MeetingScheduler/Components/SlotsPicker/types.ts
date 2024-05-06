import dayjs from "dayjs";

export interface ISlotPicker {
  bookingInfoHandler: (value: ISlotsPickerRef) => void;
}

export type ISlotsPickerRef = {
  selectedDate: dayjs.Dayjs;
  buffer: number;
  selectedSlot?: string;
};

export type ISlotsType = {
  date: string;
  slots: { start_time: string; end_time: string }[];
}[];
