import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { redirect } from "react-router-dom";

export const loader = async ({ params }) => {
  try {
    const { data } = await customFetch.get(`/jobs/${params.id}`);
    console.log("loader");
    console.log(data);
    return data;
  } catch (error) {
    toast.error(error?.error?.response?.data?.msg);
    return redirect("/dashboard/all-jobs");
  }
};

export const action = async () => {
  return null;
};

const EditJob = () => {
  const { job } = useLoaderData();
  console.log("EditJob");
  console.log(job);

  return <h1>EditJob</h1>;
};

export default EditJob;
