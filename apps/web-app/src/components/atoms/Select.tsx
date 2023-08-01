import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";
import { SelectParams } from "../../types/component-params/app.type";
import UtilitiesService from "../../services/utilities.service";

const Select: React.FC<SelectParams> = ({
  selectedOption,
  onChange,
  label,
  labelId,
  options,
  labelClassName,
  className,
  multiple,
}) => {
  return (
    <div>
      <label
        htmlFor={labelId}
        className={[
          "block text-sm font-medium leading-6 text-gray-900",
          labelClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label}
      </label>
      <select
        id={labelId}
        name={label}
        onChange={onChange}
        className={[
          "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm sm:leading-6",
          "bg-opacity-90 bg-black text-white outline-none",
        ]
          .filter(Boolean)
          .join(" ")}
        value={
          Array.isArray(selectedOption)
            ? selectedOption.map((o) => o.value)
            : selectedOption.value
        }
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
  // return (
  //   <Box sx={{ minWidth: 120 }}>
  //     <FormControl fullWidth>
  //       <InputLabel
  //         className={UtilitiesService.classNames(className)}
  //         id={labelId}
  //       >
  //         {label}
  //       </InputLabel>
  //       <MuiSelect
  //         multiple={multiple}
  //         slotProps={{
  //           root: {
  //             style: {
  //               borderColor: "white",
  //             },
  //           },
  //         }}
  //         className={UtilitiesService.classNames(className)}
  //         labelId={labelId}
  //         id="demo-simple-select"
  //         value={
  //           Array.isArray(selectedOption)
  //             ? selectedOption.map((o) => o.value)
  //             : selectedOption.value
  //         }
  //         label={label}
  //         onChange={onChange}
  //       >
  //         {options.map((o, i) => (
  //           <MenuItem key={JSON.stringify(o.value) + i} value={o.value}>
  //             {o.label}
  //           </MenuItem>
  //         ))}
  //       </MuiSelect>
  //     </FormControl>
  //   </Box>
  // );
};

export default Select;
