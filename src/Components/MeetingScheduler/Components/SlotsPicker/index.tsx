import { useEffect, useRef, useState, useMemo } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { PiCheckCircle } from "react-icons/pi";
import { ImSpinner } from "react-icons/im";
import { produce } from "immer";

import { DateTimeDropdown } from "../../../Datepicker";
import { Dropdown } from "../../../../Common/Components/Dropdown";
import { classNames } from "../../../../Common/Utils/helper";
import { RenderWhen } from "../../../../Common/Utils/RenderWhen";

import { ISlotPicker, ISlotsPickerRef, ISlotsType } from "./types";

import { fetchAvailbleTimeSlots } from "./service";

import styles from "./slotspicker.module.css";

dayjs.extend(customParseFormat);

function SlotPicker(props: ISlotPicker) {
  const meetingSlotRef = useRef<ISlotsPickerRef>({
    selectedDate: dayjs(),
    buffer: 10,
  });

  const [selectedSlots, setSelectedSlots] = useState<ISlotsPickerRef>({
    selectedDate: dayjs(),
    buffer: 10,
  });

  const [loading, setLoading] = useState<boolean>(true);

  const [slots, setSlots] = useState<ISlotsType | undefined>(undefined);

  const updateSlotData = <T extends keyof ISlotsPickerRef>(
    key: T,
    value: ISlotsPickerRef[T]
  ) => {
    setSelectedSlots(
      produce(selectedSlots, (draft) => {
        draft[key] = value;
      })
    );
    meetingSlotRef.current = produce(meetingSlotRef.current, (draft) => {
      draft[key] = value;
    });
  };

  const onPickingDate = (date: dayjs.Dayjs | undefined) => {
    const currentMonth =
      (date ?? selectedSlots.selectedDate).month() === dayjs().month();
    const startDate = (
      currentMonth ? dayjs() : date ?? selectedSlots.selectedDate
    ).format("YYYY-MM-DD");
    const endDate = (date ?? selectedSlots.selectedDate)
      .endOf("month")
      .format("YYYY-MM-DD");

    fetchAvailbleTimeSlots(startDate, endDate)
      .then((response) => {
        setSlots(response);

        updateSlotData(
          "selectedDate",
          currentMonth ? dayjs() : date ?? selectedSlots.selectedDate
        );
      })
      .finally(() => setLoading(false));
  };

  const availableSlotsFn = useMemo(
    () =>
      slots?.reduce((acc: Record<string, any[]>, curr) => {
        acc[curr.date] = curr.slots;
        return acc;
      }, {}),
    [slots, selectedSlots.selectedDate]
  );

  useEffect(() => {
    onPickingDate(undefined);
  }, []);

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
          onSelect={(date) => {
            updateSlotData("selectedDate", date);
          }}
          enableFromDate={dayjs()}
          enableToDate={dayjs().add(2, "month")}
          selectedValue={meetingSlotRef?.current?.selectedDate}
          onlyShowCurrentMonthDays
          isEnableDate
          onNextClick={(value) => onPickingDate(value.startOf("month"))}
          onPreviousClick={(value) => {
            onPickingDate(selectedSlots.selectedDate.subtract(1, "month"));
          }}
        />
      </section>
      <section className={styles.slots}>
        <Dropdown
          value={(meetingSlotRef?.current?.buffer || 0).toString() + " min"}
          label="Select from variants"
          onSelect={(value) => {
            const time = Number(value.split?.(" ")?.[0]);
            updateSlotData("buffer", time);
          }}
          options={["10 min", "20 min", "30 min"]}
        />
        <div className={styles.divider} />
        <div
          className={classNames({
            [styles.slotContainer]: true,
            [styles.slotOnLoad]: loading || (!loading && !slots?.length),
          })}
        >
          <RenderWhen.If isTrue={loading}>
            <div className={styles.loading}>
              <ImSpinner />
              <div>Fetching slots...</div>
            </div>
          </RenderWhen.If>
          <RenderWhen.If isTrue={!loading && !!slots?.length}>
            <div className={styles.slotDetails}>
              <div className={styles.slotDate}>
                {dayjs(selectedSlots?.selectedDate, "YYYY-MM-DD").format(
                  "dddd, MMM D"
                )}{" "}
                - available slot
              </div>
              <div className={styles.availableSlots}>
                {availableSlotsFn?.[
                  selectedSlots?.selectedDate.format("YYYY-MM-DD")
                ]?.map((slot, index) => {
                  const startTime = dayjs(slot.start_time).format("h:mm A");
                  const endTime = dayjs(slot.start_time)
                    .add(meetingSlotRef?.current?.buffer, "minute")
                    .format("h:mm A");

                  return (
                    <div
                      className={classNames({
                        [styles.slotCard]: true,
                        [styles.selectedCard]:
                          selectedSlots.selectedSlot === slot.start_time,
                      })}
                      onClick={() => {
                        updateSlotData("selectedSlot", slot.start_time);

                        props.bookingInfoHandler(meetingSlotRef.current);
                      }}
                      key={index}
                    >
                      <div
                        className={classNames({
                          [styles.timeSlots]:
                            selectedSlots.selectedSlot === slot.start_time,
                        })}
                      >
                        <div>
                          {startTime}&nbsp;-&nbsp;{endTime}
                        </div>
                        {selectedSlots.selectedSlot === slot.start_time && (
                          <PiCheckCircle color="var(--white)" size="25" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </RenderWhen.If>
          <RenderWhen.If
            isTrue={
              !loading &&
              !availableSlotsFn?.[
                selectedSlots?.selectedDate.format("YYYY-MM-DD")
              ]?.length
            }
          >
            <div>No time slot available</div>
          </RenderWhen.If>
        </div>
      </section>
    </main>
  );
}

export default SlotPicker;
