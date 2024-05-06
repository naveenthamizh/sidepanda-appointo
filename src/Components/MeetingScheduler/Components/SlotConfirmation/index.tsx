import { useMemo } from "react";
import dayjs from "dayjs";
import { HiCheckCircle } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { PiGlobeHemisphereEastLight } from "react-icons/pi";
import { RiUser3Line } from "react-icons/ri";

import { IConfirmation } from "./types";

import styles from "./confirmation.module.css";

function SlotConfirmation(props: IConfirmation) {
  const { bookedInfo } = props;
  const meetingInfo = useMemo(() => {
    const startTime = dayjs(bookedInfo.selectedSlot).format("h:mm A");
    const endTime = dayjs(bookedInfo.selectedSlot)
      .add(bookedInfo.buffer, "minute")
      .format("h:mm A");
    return [
      {
        icon: <RiUser3Line size="20" />,
        value: "Bob",
      },
      {
        icon: <CiCalendar size="20" />,
        value: `${startTime} - ${endTime}, ${bookedInfo.selectedDate.format(
          "dddd, MMMM D, YYYY"
        )} `,
      },
      {
        icon: <PiGlobeHemisphereEastLight size="20" />,
        value: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    ];
  }, []);
  return (
    <main className={styles.container}>
      <div className={styles.successContainer}>
        <HiCheckCircle size="30" color="var(--colors-success-500)" />{" "}
        <div>Meeting Booked</div>
      </div>
      <div>
        <div className={styles.inviteCopy}>
          A calendar invitation has been sent to your email address.
        </div>
        <div className={styles.bookedInfo}>
          <div>Meeting Name</div>
          <div className={styles.meetingInfo}>
            {meetingInfo.map((info) => (
              <div className={styles.locationInfo}>
                <div>{info.icon}</div>
                <div>{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default SlotConfirmation;
