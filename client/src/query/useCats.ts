import { useMutation, useQuery } from "react-query";
import { client } from "../App";
import { SERVER_URL } from "../config";
import { Cat, User } from "../types";

const URL = `${SERVER_URL}/cat`;
export const useCats = () =>
  useQuery<Cat[]>("cats", () => fetch(URL).then((res) => res.json()));

export const useCreateCat = () => {
  return useMutation(
    (cat: Cat) => {
      const body = JSON.stringify({ cat });
      return fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
    {
      onSuccess: () => {
        client.invalidateQueries("cats");
      },
    }
  );
};

export const useUpdateCat = () => {
  return useMutation(
    (item: { idx: number; cat: Cat }) => {
      const { idx, cat } = item;
      const body = JSON.stringify({ cat });
      return fetch(`${URL}/${idx}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });
    },
    {
      onSuccess: () => {
        client.invalidateQueries("cats");
      },
    }
  );
};

export const useDeleteCat = () => {
  return useMutation(
    (idx: number) => {
      return fetch(`${URL}/${idx}`, { method: "DELETE" });
    },
    {
      onSuccess: () => {
        client.invalidateQueries("cats");
      },
    }
  );
};
