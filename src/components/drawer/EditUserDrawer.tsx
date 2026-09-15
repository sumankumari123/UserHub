import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../redux/store";

import { closeEditDrawer } from "../../redux/reducers/userSlice";

const EditUserDrawer = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedUser, isDrawerOpen } = useSelector(
    (state: RootState) => state.user
  );

  return (
    <Drawer
      anchor="right"
      open={isDrawerOpen}
      onClose={() => dispatch(closeEditDrawer())}
    >
      <div className="w-[400px] p-6">
        <h2 className="text-2xl font-bold mb-6">
          Edit User
        </h2>

        {selectedUser && (
          <div>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Phone: {selectedUser.phone}</p>
            <p>Gender: {selectedUser.gender}</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default EditUserDrawer;