import { useMutation, useQuery } from "react-query";
import { useHistory } from "react-router";
import { client } from "../App";
import { SERVER_URL } from "../config";
import { User } from "../types";

export const useUsers = () =>
  useQuery<User[]>("users", () => fetch(SERVER_URL).then((res) => res.json()));

export const useCreateUser = () => {
  const history = useHistory();
  return useMutation(
    (user: User) => {
      const body = JSON.stringify({ user });
      console.log(body);

      return fetch(SERVER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
    {
      onSuccess: () => {
        client.invalidateQueries("users");
        history.push("/");
      },
    }
  );
};

export const useUpdateUser = (idx: number) => {
  const history = useHistory();
  return useMutation(
    (user: User) => {
      const body = JSON.stringify({ user });
      return fetch(`${SERVER_URL}/${idx}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
    {
      onSuccess: () => {
        client.invalidateQueries("users");
        history.push("/");
      },
    }
  );
};

export const useDeleteUser = () => {
  const history = useHistory();
  return useMutation(
    (idx: number) => {
      return fetch(`${SERVER_URL}/${idx}`, { method: "DELETE" });
    },
    {
      onSuccess: () => {
        client.invalidateQueries("users");
        history.push("/");
      },
    }
  );
};
