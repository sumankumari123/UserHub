import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../redux/store";
import {  closeDeleteModel } from "../../redux/reducers/userSlice";



const DeleteUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedUser, isDeleteModel } = useSelector(
    (state: RootState) => state.user
  );

  const handleClose = () => {
    dispatch(closeDeleteModel());
  };

  const handleDelete = () => {
    if (!selectedUser) return;

    console.log("Delete user:", selectedUser.id);


    dispatch(closeDeleteModel());
  };

  return (
    <Dialog
      open={isDeleteModel}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Delete User
      </DialogTitle>

      <DialogContent>
        <p className="text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">
            {selectedUser?.name}
          </span>
          ?
        </p>

      </DialogContent>

      <DialogActions className="p-4">
        <Button
          onClick={handleClose}
          variant="outlined"
        >
          Cancel
        </Button>

        <Button
          onClick={handleDelete}
          variant="contained"
          color="error"
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUser;
