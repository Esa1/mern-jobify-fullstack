import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext, Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("avatar"); // Get the file from the form data

  if (file && file.size > 1000000) {
    // Check if the file size exceeds 1MB
    toast.error("File size exceeds 1MB limit.");
    return null; // Return early if the file is too large
  }
  // Here you can handle the form data, e.g., send it to the server
  try {
    await customFetch.patch("/users/update-user", formData);
    toast.success("Profile updated successfully!");
  } catch (error) {
    toast.error(error.response?.data?.msg);
  }
  return null;
};

const Profile = () => {
  const { user } = useOutletContext();
  const { name, email, lastName, location, role, avatar } = user;

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          {/* file input */}
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 1MB):
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              accept="image/*"
              className="form-input"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
