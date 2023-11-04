import React, { ChangeEventHandler, useState } from "react";
import { AddMoneyTransactionFormParams } from "../../types/component-params/day.type";
import SubtractIcon from "../../assets/icons/Subtract.svg";
import AddIcon from "../../assets/icons/Add.svg";
import { SelectChangeEvent, TextField } from "@mui/material";
import SubmitButton from "../../components/atoms/SubmitButton";
import ObjectID from "bson-objectid";
import PriceInput from "../atoms/PriceInput";
import Select from "../atoms/Select";
import TextInput from "../atoms/TextInput";

const AddMoneyTransactionForm: React.FC<AddMoneyTransactionFormParams> = ({
  isRevenue,
  onSubmit,
  onCancel,
  categories,
  date,
}) => {
  const [transactionAmount, setTransactionAmount] = useState<number>(0);
  const [transactionCategory, setTransactionCategory] = useState<string>(
    categories[0].objectId
  );
  const [transactionLabel, setTransactionLabel] = useState<string>("");

  const logMoneyTransaction = () => {
    onSubmit({
      label: transactionLabel,
      isRevenue: isRevenue,
      amount: +transactionAmount,
      categoryId: transactionCategory,
      objectId: ObjectID().toHexString(),
      timestamp: createTransactionLogTimestamp(date),
    });
  };
  const handleTransactionLabelChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => setTransactionLabel(e.target.value);
  const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setTransactionCategory(event.target.value);
  };
  return (
    <div className={"md:w-1/2"}>
      <div className={"flex flex-col items-center gap-3 w-full p-3"}>
        <div className={"w-full"}>
          <button onClick={onCancel}>Cancel</button>
        </div>
        <div className={"w-full"}>
          <div className={"flex justify-start items-center gap-2 w-full"}>
            {!isRevenue ? (
              <SubtractIcon fill={"#D32F2F"} />
            ) : (
              <AddIcon fill={"#309700"} />
            )}

            <PriceInput
              value={transactionAmount}
              revenue={isRevenue}
              onChange={(n: number) =>
                setTransactionAmount(n < 0 ? transactionAmount : n)
              }
            />

            {/*<input*/}
            {/*  className={[""].filter(Boolean).join(" ")}*/}
            {/*  type="text"*/}
            {/*  inputMode={"decimal"}*/}
            {/*  value={transactionAmount}*/}
            {/*  onChange={(e) =>*/}
            {/*    setTransactionAmount(*/}
            {/*      +e.target.value < 0 && e.target.value !== ""*/}
            {/*        ? transactionAmount*/}
            {/*        : +e.target.value*/}
            {/*    )*/}
            {/*  }*/}
            {/*/>*/}

            {/*<TextField*/}
            {/*  type="number"*/}
            {/*  color={"error"}*/}
            {/*  value={transactionAmount}*/}
            {/*  onChange={(e) =>*/}
            {/*    setTransactionAmount(*/}
            {/*      +e.target.value < 0 && e.target.value !== ""*/}
            {/*        ? transactionAmount*/}
            {/*        : +e.target.value*/}
            {/*    )*/}
            {/*  }*/}
            {/*/>*/}
          </div>
        </div>
        <div className={"w-full"}>
          <Select
            selectedOption={{
              value: transactionCategory,
              label: transactionCategory,
            }}
            label={"Category"}
            onChange={handleCategoryChange}
            options={categories.map((c) => ({
              value: c.objectId,
              label: c.name,
            }))}
            labelId={"category-select"}
            labelClassName={"text-white"}
          />
          {/*<Select value={transactionCategory} onChange={handleCategoryChange}>*/}
          {/*  {categories.map((c) => (*/}
          {/*    <MenuItem key={c.objectId} value={c.objectId}>*/}
          {/*      {c.name}*/}
          {/*    </MenuItem>*/}
          {/*  ))}*/}
          {/*</Select>*/}
        </div>
        <div className={"w-full"}>
          <TextInput
            onChange={handleTransactionLabelChange}
            value={transactionLabel}
            label={"Label"}
            placeholder={"Label"}
            labelId={"transaction-label-input"}
          />
          {/*<TextField*/}
          {/*  onChange={handleTransactionLabelChange}*/}
          {/*  type={"text"}*/}
          {/*  value={transactionLabel}*/}
          {/*/>*/}
        </div>
        <SubmitButton
          className={
            !(transactionAmount > 0) &&
            "opacity-0 pointer-events-none transition duration-200"
          }
          onClick={logMoneyTransaction}
        />
      </div>
    </div>
  );
};

function createTransactionLogTimestamp(dateString: string): string {
  const logDate = new Date(dateString);
  const currentTime = new Date();
  return new Date(
    logDate.getFullYear(),
    logDate.getMonth(),
    logDate.getDate(),
    currentTime.getHours(),
    currentTime.getMinutes()
  ).toISOString();
}

export default AddMoneyTransactionForm;
