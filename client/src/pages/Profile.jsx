import { FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext, useNavigation, Form } from "react-router-dom";
const Profile = () => {
  const { user } = useOutletContext();
  const { name, email, lastName, location, role, avatar } = user;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

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
          <button
            type="submit"
            className="btn btn-block form-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "submit"}
          </button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default Profile;
