import { useEffect, useState } from "react";
import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../redux/store";
import { closeEditDrawer, editSpecificUsers } from "../../redux/reducers/userSlice";

const EditUserDrawer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedUser, isDrawerOpen } = useSelector(
    (state: RootState) => state.user
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
  });

  // selectedUser Redux se aayega
  // aur form ke andar data fill hoga
  useEffect(() => {
    if (selectedUser) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
        gender: selectedUser.gender,
      });
    }
  }, [selectedUser]);

  // Input change handle
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // console.log("formData", formData)
  // console.log("selectedUser", selectedUser)


  // Save button
  const handleSave = () => {
      if (!selectedUser) return;
console.log({...selectedUser,
      ...formData})
  dispatch(
    editSpecificUsers({
      ...selectedUser,
      ...formData,
    })
  );

  dispatch(closeEditDrawer());

  };

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => dispatch(closeEditDrawer())}
    >
      <div className="w-[400px] h-full flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">
            Edit User
          </h2>
        </div>

        {/* Form */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedUser && (
            <div className="space-y-5">

              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Gender
                </label>

                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => dispatch(closeEditDrawer())}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Save
          </button>
        </div>

      </div>
    </Drawer>
  );
};

export default EditUserDrawer;