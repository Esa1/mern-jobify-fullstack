import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/jobs");
    console.log("AllJobs::loader::data=");
    console.log(data);
    return { data };
  } catch (error) {
    toast.error(error?.error?.response?.data?.msg);
    throw error;
  }
};

const AllJobs = () => {
  const { data } = useLoaderData();
  console.log("AllJobs::data=");
  console.log(data);
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
};

export default AllJobs;
