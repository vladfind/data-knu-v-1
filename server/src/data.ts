import PATH from "path";
import fs from "fs";

interface BaseItem {}

// const PATH = 'data/data.json'

export const getItems = async <T extends BaseItem>(path: string) => {
  const rawData = fs.readFileSync(PATH.join(process.cwd(), path));
  const data: T[] = JSON.parse(rawData.toString());
  return data;
};

export const saveItems = async <T extends BaseItem>(
  path: string,
  data: T[]
) => {
  fs.writeFileSync(path, JSON.stringify(data));
};

export const getItem = async <T extends BaseItem>(
  path: string,
  idx: number
) => {
  const items = await getItems<T>(path);
  const item = items.find((item, index) => index === idx);
  return item;
};

export const addItem = async <T extends BaseItem>(path: string, item: T) => {
  const items = await getItems<T>(path);
  const nextItem: T = {
    ...item,
  };
  await saveItems<T>(path, [...items, nextItem]);
};

export const deleteItem = async <T extends BaseItem>(
  path: string,
  idx: number
) => {
  const items = await getItems<T>(path);
  const nextItems = items.filter((item, index) => index !== idx);
  await saveItems(path, nextItems);
};

export const updateItem = async <T extends BaseItem>(
  path: string,
  idx: number,
  key: keyof T,
  value: any
) => {
  const items = await getItems<T>(path);
  const nextItems = items.map((item, index) => {
    if (index === idx) {
      item[key] = value;
    }
    return item;
  });
  saveItems(path, nextItems);
};

export const recreateItem = async <T extends BaseItem>(
  path: string,
  idx: number,
  nextItem: T
) => {
  const items = await getItems<T>(path);
  if (idx <= items.length - 1) {
    items[idx] = nextItem;
    saveItems(path, items);
  }
};
