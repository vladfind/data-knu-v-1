export interface User {
  name: string;
  workNumber: string;
  mobileNumber: string;
  birthday: string;
  email: string;
  category: string;
  location: string;
  note: string;
}

export interface Cat {
  text: string;
}

type KeysEnum<T> = { [p in keyof Required<T>]: string };

export const engToRusField: KeysEnum<User> = {
  name: "ФИО",
  workNumber: "НомСтацТелеф",
  mobileNumber: "НомМобилТелеф",
  birthday: "Дата рождения",
  email: "Электронный адрес",
  category: "Категория_абонента",
  location: "Домашний адрес",
  note: "Примечание",
} as const;

type test = keyof User;

export const fieldNamesEng = Object.keys(engToRusField) as test[];
