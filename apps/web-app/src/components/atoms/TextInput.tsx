import { ChangeEventHandler } from "react";

const TextInput: React.FC<{
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
  label: string;
  labelId: string;
  placeholder?: string;
}> = ({ onChange, value, label, labelId, placeholder = "" }) => {
  return (
    <div className={"text-white"}>
      <label htmlFor={labelId} className="block text-sm font-medium leading-6">
        {label}
      </label>
      <div className="mt-2">
        <input
          onChange={onChange}
          value={value}
          type="text"
          name={label}
          id={labelId}
          className={[
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            "bg-opacity-90 bg-black text-white outline-none px-4",
          ]
            .filter(Boolean)
            .join(" ")}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default TextInput;
