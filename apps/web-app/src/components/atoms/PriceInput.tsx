export default function PriceInput(params: {
  value: number;
  onChange: (number) => void;
  revenue?: boolean;
}) {
  const { value, onChange, revenue } = params;
  return (
    <div className="relative mt-2 rounded-md shadow-sm w-full">
      <input
        type="number"
        inputMode={"decimal"}
        value={value}
        className={[
          "block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset placeholder:text-white focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none",
          !revenue
            ? "focus:ring-red-600 text-red-500"
            : "focus:ring-green-600 text-green-500",
          value < 0.01
            ? "ring-gray-500"
            : revenue
            ? "ring-green-500"
            : "ring-red-500",
          "bg-opacity-90 bg-black md:text-3xl",
        ]
          .filter(Boolean)
          .join(" ")}
        placeholder="0.00"
        aria-describedby="price-currency"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
