import React from "react";
import { useAllJobsContext } from "../pages/AllJobs";
const PageBtnContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();
  console.log(numOfPages, currentPage);
  return <div>PageBtnContainer</div>;
};

export default PageBtnContainer;
