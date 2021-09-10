import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { FormEvent, useState } from "react";
import { engToRusField, fieldNamesEng, User } from "../types";

interface props {
  startSearch: (query: null | { field: keyof User; value: string }) => void;
}

export const SearchForm: React.FC<props> = ({ startSearch }) => {
  const [field, setField] = useState<keyof User>(fieldNamesEng[0]);
  const [query, setQuery] = useState("");
  const onSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    if (query === "") {
      startSearch(null);
    } else {
      startSearch({ field, value: query });
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <br />
      <FormControl fullWidth variant="outlined">
        <InputLabel variant="outlined">Поле</InputLabel>
        <Select
          fullWidth
          variant="outlined"
          label="Поле"
          value={field}
          onChange={(e) => setField(e.target.value as any)}
        >
          {fieldNamesEng.map((fieldName) => (
            <MenuItem key={fieldName} value={fieldName}>
              {(engToRusField as Record<string, string>)[fieldName]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <br />
      <br />
      <TextField
        label="Значение"
        fullWidth
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <br />
      <br />
      <Button
        type="submit"
        fullWidth
        variant="outlined"
        color="primary"
        size="large"
      >
        Найти
      </Button>
    </form>
  );
};
