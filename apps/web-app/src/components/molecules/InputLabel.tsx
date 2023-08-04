import {
  InputLabelParams,
  InputLabelType,
} from "../../types/component-params/app.type";
import React, { useEffect, useRef, useState } from "react";
import Switch from "@mui/material/Switch";
import { MenuItem, Select } from "@mui/material";
import UtilitiesService from "../../services/utilities.service";

const InputLabel: React.FC<InputLabelParams> = ({
  onInputChange,
  value,
  type,
  className,
  widthByValue,
}) => {
  const [inputMode, setInputMode] = useState<boolean>(
    type === InputLabelType.BOOLEAN
  );
  const [inputWidth, setInputWidth] = useState<string>();

  const [input, setInput] = useState(value);

  useEffect(() => {
    if (!widthByValue || !inputMode) {
      return;
    }
    const val = input.toString().length + "ch";
    console.log(val);
    setInputWidth(val);
  }, [input, inputMode]);

  const ref = useRef();
  const cancelInputMode = () => {
    if (type === InputLabelType.BOOLEAN) {
      return;
    }
    if (inputMode) {
      setInputMode(false);
      if (["text", "number"].includes(type)) {
        onInputChange(input);
      }
    }
  };
  const activateInputMode = () => {
    if (type === InputLabelType.BOOLEAN) {
      return;
    }
    setInputMode(true);
  };

  UtilitiesService.useClickOutside(ref, cancelInputMode);

  return (
    <div
      className={[
        "rounded-md p-2",
        className,
        type !== InputLabelType.BOOLEAN &&
          "p-0 hover:bg-primary hover:bg-opacity-60",
      ]
        .filter(Boolean)
        .join(" ")}
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        activateInputMode();
      }}
    >
      {!inputMode && type === "text" && <label>{value}</label>}
      {!inputMode && type === "number" && <label>{value}</label>}
      {!inputMode && type === "select" && (
        <Select
          value={value[0].value}
          onChange={(e) => onInputChange(e.target.value)}
        >
          {value.map((v, i) => (
            <MenuItem key={v.value + i} value={v.value}>
              {v.label}
            </MenuItem>
          ))}
        </Select>
      )}
      {inputMode && type === "text" && (
        <input
          type="text"
          className={"text-black"}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              cancelInputMode();
            }
          }}
          value={input as string}
        />
      )}
      {type === "boolean" && (
        <div>
          <Switch
            checked={value}
            onChange={(e) => {
              onInputChange(e.target.checked);
            }}
          />
        </div>
      )}
      {inputMode && type === "number" && (
        <>
          <input
            style={{ width: widthByValue ? inputWidth : "auto" }}
            className={[
              "text-white appearance-none bg-transparent border-none outline-none",
              className?.includes("text-right") && "text-right",
            ]
              .filter(Boolean)
              .join(" ")}
            type="text"
            pattern="[0-9]*"
            value={input as number}
            onChange={(e) => {
              if (Number.isNaN(+e.target.value)) {
                return;
              }
              setInput(+e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                cancelInputMode();
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default InputLabel;
