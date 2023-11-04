import React from "react";
import Divider from "../../components/atoms/Divider";
import AppService from "../../services/app.service";

const PageTitle: React.FC = () => {
  const pageName = AppService.usePageName();
  return (
    <div className={"flex flex-col items-center"}>
      <label className={"text-2xl my-4 text-success"}>{pageName}</label>
    </div>
  );
};

export default PageTitle;
