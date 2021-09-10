import { User } from "../types";
import { UserItems } from "./UserItem/UserItem";

export const Display = ({ users }: { users: User[] }) => {
  return (
    <>
      <UserItems users={users} />
    </>
  );
};
