import React, { useState, useEffect } from "react";
import { SlArrowRight } from "react-icons/sl";
import { SlArrowLeft } from "react-icons/sl";
import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore.js";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter.js";
import isBetween from "dayjs/plugin/isBetween";

import { classNames } from "../../Common/Utils/helper";

import "./datepicker.css";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

interface DateErrors {
  hour: boolean;
  minute: boolean;
  date: string | boolean;
}

interface DateTimeDropdownProps {
  selectedValue?: Dayjs;
  onSelect?: (date: Dayjs) => void;
  hasTime: boolean;
  timeFormat: 12 | 24;
  enableFromDate?: Dayjs;
  enableToDate?: Dayjs;
  errors?: Partial<DateErrors>;
  onDone?: (date?: Dayjs) => void;
  disableAll?: boolean;
  workDays?: Record<number, number>;
  onlyShowCurrentMonthDays?: boolean;
  isEnableDate: boolean;
  onPreviousClick?: (value: any) => void;
  onNextClick?: (value: any) => void;
}

const TotalColumns = 7;
const TotalRows = 6;
const TotalDayCells = TotalColumns * TotalRows;
const WeekDays = [
  {
    displayName: "Sun",
    key: "sunday",
  },
  {
    displayName: "Mon",
    key: "monday",
  },
  {
    displayName: "Tue",
    key: "tuesday",
  },
  {
    displayName: "Wed",
    key: "wednesday",
  },
  {
    displayName: "Thu",
    key: "thursday",
  },
  {
    displayName: "Fri",
    key: "friday",
  },
  {
    displayName: "Sat",
    key: "saturday",
  },
];

interface Day {
  isCurrentMonth: boolean;
  date: string; // YYYY-MM-DD
  count: number;
}

type Days = Array<Day>;
export function DateTimeDropdown(props: DateTimeDropdownProps): JSX.Element {
  const {
    selectedValue,
    onSelect,
    disableAll,
    onlyShowCurrentMonthDays = false,
    enableFromDate,
    enableToDate,
    isEnableDate,
    onNextClick,
    onPreviousClick,
  } = props;

  const [renderDays, setRenderDays] = useState<Days>();
  const [highlightedDate, setHighLightedDate] = useState<Dayjs>(dayjs());

  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    // This will flicker selected date from today to whatever valid selectedValue
    selectedValue && setSelectedDate(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    setHighLightedDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    // get number days in month
    const daysInMonth = highlightedDate.daysInMonth();
    const currentMonthdays: Days = [];
    // index number of the start day (month)
    const currentMonthStartDay = highlightedDate.startOf("month").day(); //

    let currentDay = 1;
    let totalCells = 1;
    const nextMonth = highlightedDate.add(1, "month");
    const prevMonth = highlightedDate.subtract(1, "month");
    let nextMonthDay = 1;
    // Month start day itself should not be included. So substracting 1 from it.
    let prevMonthDay = prevMonth.daysInMonth() - (currentMonthStartDay - 1);
    while (totalCells <= TotalDayCells) {
      if (totalCells > currentMonthStartDay && currentDay <= daysInMonth) {
        currentMonthdays.push({
          count: currentDay,
          date: `${highlightedDate.year()}-${
            highlightedDate.month() + 1
          }-${currentDay}`,
          isCurrentMonth: true,
        });
        currentDay += 1;
      } else if (totalCells >= daysInMonth) {
        if (!onlyShowCurrentMonthDays) {
          currentMonthdays.push({
            count: nextMonthDay,
            date: `${nextMonth.year()}-${
              nextMonth.month() + 1
            }-${nextMonthDay}`,
            isCurrentMonth: false,
          });
        }
        nextMonthDay += 1;
      } else {
        currentMonthdays.push({
          count: prevMonthDay,
          date: `${prevMonth.year()}-${prevMonth.month() + 1}-${prevMonthDay}`,
          isCurrentMonth: false,
        });
        prevMonthDay += 1;
      }
      totalCells += 1;
    }
    setRenderDays([...currentMonthdays]);
  }, [onlyShowCurrentMonthDays, highlightedDate]);

  const onPrevious = () => {
    const prevMonth = highlightedDate.subtract(1, "M");
    if (dayjs().startOf("M").isSameOrBefore(dayjs(prevMonth).startOf("M"))) {
      setHighLightedDate(prevMonth);
      onPreviousClick && onPreviousClick(highlightedDate.add(1, "month"));
    }
  };

  const onNext = () => {
    setHighLightedDate(highlightedDate.add(1, "month"));
    onNextClick && onNextClick(highlightedDate.add(1, "month"));
  };

  const onDateSelect = (date: string) => {
    const currentSelectedDate = dayjs(date)
      .hour(selectedDate.get("hour"))
      .minute(selectedDate.get("minute"));
    setSelectedDate(currentSelectedDate);

    if (!selectedDate.isSame(currentSelectedDate)) {
      setSelectedDate(currentSelectedDate);
    }
    onSelect && onSelect(currentSelectedDate);
  };

  const handleDaySelect = (date: string, enabledDay: boolean) => {
    if (enabledDay) {
      onDateSelect(date);
    }
  };

  const getRenderDayClassNames = (
    renderDay: Day,
    renderDayDate: Dayjs,
    enabledDay: boolean
  ): string => {
    let classes = "";

    if (renderDay.isCurrentMonth) {
      classes = classes + "calendar-date-picker-current-month-day ";
    } else {
      classes = classes + "calendar-date-picker-other-month-day ";
    }

    if (
      dayjs().isSame(renderDayDate, "day") &&
      !selectedDate?.isSame(renderDayDate, "day")
    ) {
      classes = classes + " calendar-date-picker-today";
    } else if (selectedDate?.isSame(renderDayDate, "day")) {
      classes = classes + "calendar-date-picker-day-selected ";
    } else {
      classes = classes + "calendar-date-picker-day ";
    }

    if (disableAll) {
      classes = classes + " calendar-date-picker-day-disable";
    }
    if (!enabledDay) {
      classes = classes + " calendar-date-picker-day-disable";
    }

    return classes;
  };

  return (
    <div className="calendar-datetime-picker-container">
      <div className="calendar-date-picker">
        <div className="calendar-date-picker-header">
          <div className="calendar-date-picker-chevron" onClick={onPrevious}>
            <SlArrowLeft
              size="15"
              color={
                dayjs()
                  .startOf("M")
                  .isSameOrBefore(
                    dayjs(highlightedDate.subtract(1, "M")).startOf("M")
                  )
                  ? "var(--colors-success-500)"
                  : "rgba(8, 12, 43, 0.3)"
              }
            />
          </div>
          <div>
            {highlightedDate.format("MMMM")} {highlightedDate.format("YYYY")}
          </div>
          <div className="calendar-date-picker-chevron" onClick={onNext}>
            <SlArrowRight size="15" color="var(--colors-success-500)" />
          </div>
        </div>

        <div className="calendar-date-picker-daynames">
          {WeekDays.map((WeekDay) => {
            return <div key={WeekDay.key}>{WeekDay.displayName}</div>;
          })}
        </div>
        <div className="calendar-date-picker-days">
          {renderDays &&
            renderDays.map((renderDay, index) => {
              const renderDayDate = dayjs(renderDay.date);

              const enabledDay =
                enableFromDate &&
                enableToDate &&
                isEnableDate &&
                dayjs(renderDayDate).isBetween(
                  enableFromDate,
                  enableToDate,
                  "date",
                  "[]"
                );
              return (
                <div
                  key={index}
                  className={classNames({
                    "calendar-default": true,
                    [getRenderDayClassNames(
                      renderDay,
                      renderDayDate,
                      enabledDay || false
                    )]: true,
                    "show-only-current-month-days":
                      onlyShowCurrentMonthDays && !renderDay?.isCurrentMonth,
                  })}
                  onClick={() => {
                    handleDaySelect(renderDay.date, enabledDay || false);
                  }}
                >
                  <div>{renderDay.count}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
