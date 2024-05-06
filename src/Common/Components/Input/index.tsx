import React, { useEffect, useState } from "react";

import "./Input.css";

export type TextInputProps = {
  type?: string;
  label?: string | JSX.Element;
  value?: string;
  placeholder?: string;
  required?: boolean;
  onChange?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: string, e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TextInput = (props: TextInputProps) => {
  const { label, value = "", placeholder, required, onChange, onBlur } = props;

  const [textValue, setTextValue] = useState<string>("");

  useEffect(() => {
    value === undefined || value === null
      ? setTextValue("")
      : setTextValue(value);
  }, [value]);

  const handleTextChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value;
    setTextValue(value);
    onChange && onChange(value, evt);
  };

  const handleTextBlur = (evt: React.ChangeEvent<HTMLInputElement>) => {
    onBlur && onBlur(evt.target.value, evt);
  };

  return (
    <div className="text-input-container">
      {label && (
        <label className="text-input-label">
          {label}
          {required && <span className="text-input-required"> *</span>}
        </label>
      )}
      <div className="text-input-wrapper">
        <div className={"text-input-box"}>
          <input
            className={`text-input`}
            value={textValue}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            placeholder={placeholder}
            tabIndex={2}
          />
        </div>
      </div>
    </div>
  );
};
