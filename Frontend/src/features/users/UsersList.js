import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

    content = (
      <div className="overflow-x-auto grid grid-cols-5 gap-4 ">
        <div></div>
        <table className="table col-span-3">
          <thead>
            <tr>
              <th>Username</th>
              <th>Roles</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </div>
    );
  }

  return content;
};
export default UsersList;
