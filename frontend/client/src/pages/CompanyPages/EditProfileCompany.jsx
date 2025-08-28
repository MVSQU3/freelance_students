import { useState } from "react";
import { useCompanyStore } from "../../store/useCompanyStore";
import { useEffect } from "react";

const EditProfileCompany = () => {
  const { updateMyProfile, getMyProfile, myProfile, isCompanyLoading } =
    useCompanyStore();

  const [form, setForm] = useState({
    companyName: "",
    sector: "",
    location: "",
    website: "",
    description: "",
  });

  useEffect(() => {
    getMyProfile();
    setForm((f) => ({ ...f, ...myProfile }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMyProfile(form);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="companyName"
          value={form.companyName}
          onChange={handleChange}
          placeholder="Company Name"
        />
        <input
          type="text"
          name="sector"
          value={form.sector}
          onChange={handleChange}
          placeholder="Sector"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
        />
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={handleChange}
          placeholder="Website"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <button type="submit" disabled={isCompanyLoading}>
          {isCompanyLoading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default EditProfileCompany;
