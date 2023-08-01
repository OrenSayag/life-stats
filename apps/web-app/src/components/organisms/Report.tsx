import React from "react";
import { ReportParams } from "../../types/component-params/reports.type";

const Report: React.FC<ReportParams> = ({ report }) => {
  return (
    <div className={"flex flex-col gap-3"}>
      <div className={"flex justify-center text-3xl mb-12"}>
        <h3>{report.formName}</h3>
      </div>
      <div className={"flex flex-col gap-8"}>
        {Object.keys(report.formItems).map((itemId) => (
          <div className={"flex justify-between text-2xl"} key={itemId}>
            <div>{report.formItems[itemId].label}</div>
            <div>{`${report.formItems[itemId].value.success}/${report.formItems[itemId].value.total}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
