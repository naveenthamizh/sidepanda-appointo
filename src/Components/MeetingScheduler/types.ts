export interface IMeetingScheduler {
  type: string;
}

export enum BOOKING_STEPS {
  SLOT_PICKER = "slots-picker",
  DETAILS_FORM = "details-form",
  CONFIRMATION_PAGE = "confirmation-page",
}
