import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { RxClock } from "react-icons/rx";
import { CiCalendar } from "react-icons/ci";
import { PiGlobeHemisphereEastLight } from "react-icons/pi";
import { produce } from "immer";

import { TextInput } from "../../../../Common/Components/Input";

import { IAttendeeType, IDetailsForm } from "./types";

import styles from "./details.module.css";

function DetailsForm(props: IDetailsForm) {
  const { bookedInfo, bookingInfoHandler } = props;

  const meetingInfo = useMemo(() => {
    const startTime = dayjs(bookedInfo.selectedSlot).format("h:mm A");
    const endTime = dayjs(bookedInfo.selectedSlot)
      .add(bookedInfo.buffer, "minute")
      .format("h:mm A");
    return [
      { icon: <RxClock size="20px" />, text: bookedInfo.buffer + " mins" },
      {
        icon: <CiCalendar size="20px" />,
        text: `${startTime} - ${endTime}, ${bookedInfo.selectedDate.format(
          "dddd, MMMM D, YYYY"
        )} `,
      },
      {
        icon: <PiGlobeHemisphereEastLight size="20px" />,
        text: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    ];
  }, []);

  const [attendee, setAttendee] = useState<IAttendeeType>({} as IAttendeeType);

  const updateAttendee = <T extends keyof IAttendeeType>(
    key: T,
    value: IAttendeeType[T]
  ) => {
    setAttendee(
      produce(attendee, (draft) => {
        draft[key] = value;
      })
    );
  };

  return (
    <main className={styles.container}>
      <section className={styles.hostDetails}>
        <div className={styles.hostName}>
          <div>Bob</div>
          <div>Sales Discussion</div>
        </div>

        {meetingInfo?.map((info) => (
          <div className={styles.locationInfo}>
            <div>{info.icon}</div>
            <div>{info.text}</div>
          </div>
        ))}
      </section>
      <section className={styles.attendeeForm}>
        <TextInput
          label="Name"
          required
          onChange={(value) => {
            updateAttendee("name", value);
          }}
          onBlur={() => bookingInfoHandler(attendee)}
        />
        <TextInput
          label="Email Id"
          required
          onChange={(value) => updateAttendee("email", value)}
          onBlur={() => bookingInfoHandler(attendee)}
        />
      </section>
    </main>
  );
}

export default DetailsForm;
