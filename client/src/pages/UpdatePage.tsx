import { useMemo } from "react";
import { useParams } from "react-router";
import { Layout } from "../common/Layout";
import { UserForm } from "../comp/CreateForm/UserForm";
import { useUpdateUser, useDeleteUser, useUsers } from "../query/useUser";
import { User } from "../types";

export const UpdatePage = () => {
  const { idx } = useParams() as any;

  const { data } = useUsers();

  const user = useMemo(() => {
    const users = data;
    if (users === undefined) {
      return undefined;
    }
    const realIdx = Number(idx);
    const foundUser = users.find((user, index) => index === realIdx);
    return foundUser;
  }, [data, idx]);

  const { mutate: updateUserRaw } = useUpdateUser(Number(idx));

  const updateUser = (user: User) => {
    updateUserRaw(user);
  };

  const { mutate: deleteUserRaw } = useDeleteUser();
  const deleteUser = () => {
    deleteUserRaw(idx);
  };

  return (
    <Layout>
      <UserForm user={user} submitUser={updateUser} deleteUser={deleteUser} />
    </Layout>
  );
};
