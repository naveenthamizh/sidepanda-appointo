import dayjs from "dayjs";
import { PiCheckCircle } from "react-icons/pi";

import { DateTimeDropdown } from "../../../Datepicker";
import { Dropdown } from "../../../../Common/Components/Dropdown";
import { classNames } from "../../../../Common/Utils/helper";

import styles from "./slotspicker.module.css";

function SlotPicker() {
  return (
    <main className={styles.container}>
      <section className={styles.datePicker}>
        <div className={styles.meetingTitle}>Meeting Title</div>
        <div className={styles.timeZone}>
          Timezone:&nbsp;
          <span className={styles.timeZoneLocation}>Asia/Calcutta</span>
        </div>
        <DateTimeDropdown
          hasTime={false}
          timeFormat={12}
          onSelect={() => {}}
          enableFromDate={dayjs()}
          enableToDate={dayjs().add(2, "month")}
          selectedValue={dayjs()}
          onlyShowCurrentMonthDays
          isEnableDate
        />
      </section>
      <section className={styles.slots}>
        <Dropdown
          label="Select from variants"
          value="10 min"
          onSelect={() => {}}
          options={["10 min", "20 min", "30 min"]}
        />
        <div className={styles.divider} />
        <div className={styles.slotContainer}>
          <div className={styles.slotDate}>Selected date - available slot</div>
          <div className={styles.availableSlots}>
            {Array(1)
              .fill(2)
              .map(() => (
                <div
                  className={classNames({
                    [styles.slotCard]: true,
                    [styles.selectedCard]: false,
                  })}
                  onClick={() => {}}
                >
                  <div>asdsadj</div>
                  {false && <PiCheckCircle color="var(--white)" size="25" />}
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default SlotPicker;
