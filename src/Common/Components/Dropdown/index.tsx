import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

import "./dropdown.css";

interface DropdownTypes {
  options: Array<string>;
  value: string;
  onSelect: (value: string) => void;
  label: string;
}

export const Dropdown = (props: DropdownTypes) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div className="custom-dropdown">
      <label className="label" htmlFor="options">
        {props.label}
      </label>
      <div
        className="selected-option"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div>{props.value ? props.value : "Select an option"}</div>
        <SlArrowDown size="10" color="var(--colors-success-500)" />
      </div>
      {isDropdownOpen && (
        <ul className="options">
          {props.options.map((option, index) => (
            <li
              key={index}
              className={option === props.value ? "selected" : ""}
              onClick={() => {
                // handleOptionClick(option);
                setIsDropdownOpen(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
