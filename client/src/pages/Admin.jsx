import React from "react";
import { useLoaderData, redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import Wrapper from "../assets/wrappers/StatsContainer";
import { toast } from "react-toastify";

export const loader = async () => {
  try {
    const response = await customFetch.get("/users/admin/app-stats");
    return response.data;
  } catch (error) {
    toast.error("You are not authorized to access this page");
    return redirect("/dashboard");
  }
};

const Admin = () => {
  const data = useLoaderData();

  return (
    <Wrapper>
      <h1>Admin page</h1>
    </Wrapper>
  );
};

export default Admin;
