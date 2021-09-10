import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { FormEvent, useEffect, useState } from "react";
import { useCats } from "../../query/useCats";
import { engToRusField, User } from "../../types";
import { isDateRight } from "../../util/isDateRight";

const checkName = (name: string) => {
  if (name.split(" ").filter((a) => a.trim() !== "").length !== 3) {
    return "Введите имя, отчество, фамилию";
  }

  return null;
};

// const checkFields = (workPhone: string, mobilePhone: string, email: string, location: string) => {

// }
const isValidField = (fields: [string, string, string, string]) => {
  for (const field of fields) {
    if (field !== "") {
      return null;
    }
  }
  return "Введите";
};

const checkPhone = (phone: string) => {
  //TODO
  if (phone === "") {
    return null;
  }
  if (phone.length !== 10) {
    return "Неверное кол-во цифр";
  }
  const reg = /0[0-9]{9}/gm;
  if (!reg.test(phone)) {
    return "Неверный формат телефона";
  }
  return null;
};

const checkBirthday = (birthday: string) => {
  if (birthday === "") {
    return null;
  }

  const isRight = isDateRight(birthday);
  if (!isRight) {
    return "Неверный формат даты";
  }

  return null;
};

const checkEmail = (email: string) => {
  if (email === "") {
    return null;
  }
  const reg = /\S+@\S+/gm;
  const matches = reg.test(email);

  if (!matches) {
    return "Неверный формат почты";
  }
  return null;
};

interface props {
  label: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  err: string | null;
}

const MyField: React.FC<props> = ({ label, value, setValue, err }) => {
  if (err) {
    return (
      <>
        <TextField
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          variant="outlined"
          fullWidth
          error={true}
          helperText={err}
        />
        <br />
        <br />
      </>
    );
  }
  return (
    <>
      <TextField
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        variant="outlined"
        fullWidth
      />
      <br />
      <br />
    </>
  );
};

// const CATEGORIES = ["однокласник", "сотрудник", "знакомый"];
interface Props {
  user?: User;
  submitUser: (user: User) => void;
  deleteUser?: () => void;
}
export const UserForm = ({ user, submitUser, deleteUser }: Props) => {
  const { data: CATEGORIES } = useCats();
  const [name, setName] = useState("Иван Сергеевич Иванов");
  const nameErr = checkName(name);

  const [workPhone, setWorkPhone] = useState("");
  const [mobilePhone, setMobilePhone] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("улица Пушкина 35");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const validFieldErr = isValidField([workPhone, mobilePhone, location, email]);
  const workPhoneErr = validFieldErr || checkPhone(workPhone);
  const mobilePhoneErr = validFieldErr || checkPhone(mobilePhone);

  const locationErr = validFieldErr;
  const birthdayErr = checkBirthday(birthday);
  const emailErr = validFieldErr || checkEmail(email);

  const createMode = user === undefined;

  const noErrs =
    (nameErr ||
      validFieldErr ||
      workPhoneErr ||
      mobilePhoneErr ||
      locationErr ||
      birthdayErr ||
      emailErr) === null;

  useEffect(() => {
    if (user) {
      setName(user.name);
      setWorkPhone(user.workNumber);
      setMobilePhone(user.mobileNumber);
      setBirthday(user.birthday);
      setEmail(user.email);
      setLocation(user.location);
      setCategory(user.category);
      setNote(user.note);
    }
  }, [user]);

  const onSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (noErrs) {
      const nextUser: User = {
        name,
        workNumber: workPhone,
        mobileNumber: mobilePhone,
        birthday,
        email,
        location,
        category,
        note,
      };
      submitUser(nextUser);
    }
  };

  return (
    <>
      <form style={{ width: "100%" }} onSubmit={onSubmit}>
        <br />
        <MyField
          label={engToRusField["name"]}
          value={name}
          setValue={setName}
          err={nameErr}
        />
        <MyField
          label={engToRusField["workNumber"]}
          value={workPhone}
          setValue={setWorkPhone}
          err={workPhoneErr}
        />
        <MyField
          label={engToRusField["mobileNumber"]}
          value={mobilePhone}
          setValue={setMobilePhone}
          err={mobilePhoneErr}
        />
        <MyField
          label={engToRusField["birthday"]}
          value={birthday}
          setValue={setBirthday}
          err={birthdayErr}
        />
        <MyField
          label={engToRusField["email"]}
          value={email}
          setValue={setEmail}
          err={emailErr}
        />
        <MyField
          label={engToRusField["location"]}
          value={location}
          setValue={setLocation}
          err={locationErr}
        />
        <FormControl fullWidth variant="outlined">
          <InputLabel>{engToRusField["category"]}</InputLabel>
          <Select
            label={engToRusField["category"]}
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
          >
            <MenuItem value="">
              <p />
            </MenuItem>
            {CATEGORIES?.map((cat, catIdx) => (
              <MenuItem key={catIdx + cat.text} value={cat.text}>
                {cat.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <MyField
          label={engToRusField["note"]}
          value={note}
          setValue={setNote}
          err={null}
        />
        <Button
          disabled={!noErrs}
          type="submit"
          fullWidth
          color="primary"
          size="large"
          variant="outlined"
        >
          {createMode ? "Добавить" : "Обновить"}
        </Button>
        {!createMode && (
          <>
            <br />
            <br />
            <Button
              onClick={deleteUser}
              fullWidth
              color="secondary"
              size="large"
              variant="outlined"
            >
              Удалить
            </Button>
          </>
        )}
      </form>
    </>
  );
};
