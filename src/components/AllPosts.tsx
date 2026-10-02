import { useEffect, useState } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, openDeleteModel } from "../redux/reducers/userSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  closeEditDrawer,
  openEditDrawer,
  deleteSpecificUsers,
} from "../redux/reducers/userSlice";
import EditUserDrawer from "./drawer/EditUserDrawer";
import DeleteUser from "./model/DeleteUser";

const AllPosts = () => {
  const dispatch = useDispatch<AppDispatch>();

    const {
    userData,
    loading,
    error,
    searchUser,
  } = useSelector((state: RootState) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
const usersPerPage = 6;

  const searchText = searchUser.toLowerCase().trim();

    const userFilterData = searchText
    ? userData.filter((user) =>
        user.name.toLowerCase().includes(searchText)
      )
    : userData;
// console.log("userFilterData", userFilterData)

const indexOfLastUser = currentPage * usersPerPage;
const indexOfFirstUser = indexOfLastUser - usersPerPage;

const currentUsers = userFilterData.slice(
  indexOfFirstUser,
  indexOfLastUser
);

const totalPages = Math.ceil(userFilterData.length / usersPerPage);

  // Fetch users when component loads
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch, searchUser]);

   // Reset page when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchUser]);


  return (
    <>
      <div className="min-height-[90vh] bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            All Posts
          </h1>

          {/* Loading / Error / Data */}
          {loading ? (
            // Skeleton Loading
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl shadow p-5 animate-pulse"
                >
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-4"></div>

                  <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>

                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>

                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error
            <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-5">
              <h2 className="font-semibold text-lg">Something went wrong</h2>

              <p className="mt-1">{error}</p>
            </div>
          ) : currentUsers.length > 0 ? (
            // Data
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-[25rem] h-[14rem] bg-white rounded-xl shadow-md p-5
                hover:shadow-lg transition flex flex-col"
                >
                  {/* User Information */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      {user.name}
                    </h2>

                    <div className="space-y-2 text-sm text-gray-600">
                      <p>
                        <span className="font-medium">Email:</span> {user.email}
                      </p>

                      <p>
                        <span className="font-medium">Phone:</span> {user.phone}
                      </p>

                      <p>
                        <span className="font-medium">Gender:</span>{" "}
                        {user.gender}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 pt-4 flex items-center justify-end gap-4">
                    {/* Edit Button */}
                    <button
                      type="button"
                      className="text-green-600 hover:text-green-800
                    transition cursor-pointer"
                      title="Edit User"
                      onClick={() => dispatch(openEditDrawer(user))}
                    >
                      <FaEdit size={20} />
                    </button>

                    {/* Delete Button */}
                    <button
                      type="button"
                      className="text-red-600 hover:text-red-800
                    transition cursor-pointer"
                      title="Delete User"
                      onClick={() => {
                        dispatch(openDeleteModel(user));
                      }}
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // No Data
            <div className="text-center py-10 text-gray-500">
              No users found.
            </div>
          )}
        </div>
      </div>


  {/* Pagination */}

<div className="flex justify-center items-center gap-2 mt-8">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage((prev) => prev - 1)}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Previous
  </button>

  {Array.from({ length: totalPages }, (_, index) => (
    <button
      key={index + 1}
      onClick={() => setCurrentPage(index + 1)}
      className={`px-4 py-2 rounded ${
        currentPage === index + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage((prev) => prev + 1)}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Next
  </button>
</div>
      {/* Model component */}
      <EditUserDrawer />
      <DeleteUser />
    </>
  );
};

export default AllPosts;
