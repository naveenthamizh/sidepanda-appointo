import Axios from "axios";
import { ISlotsType } from "./types";

export const fetchAvailbleTimeSlots = (
  startDate: string,
  endDate: string
): Promise<ISlotsType> => {
  const uri = `https://app.appointo.me/scripttag/mock_timeslots?start_date=${startDate}&end_date=${endDate}`;

  return Axios.get(uri)
    .then((response) => response.data)
    .catch((err) => err);
};
