import { User } from "../../client/src/types";
import { addItem, deleteItem, getItems, recreateItem } from "./data";

const PATH = "data/data.json";

export namespace USERS {
  export const get = async () => getItems<User>(PATH);
  export const add = async (user: User) => addItem<User>(PATH, user);
  export const update = async (idx: number, user: User) =>
    recreateItem<User>(PATH, idx, user);
  export const remove = async (idx: number) => deleteItem<User>(PATH, idx);
}
