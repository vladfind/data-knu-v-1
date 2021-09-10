import {
  ButtonGroup,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
  Button,
} from "@material-ui/core";
import { Close as CloseIcon, Edit as EditIcon } from "@material-ui/icons";
import React, { useState } from "react";
import { Cat } from "../types";

interface Props {
  cat: Cat;
  remove: () => void;
  update: (cat: string) => void;
}
export const CatItem: React.FC<Props> = ({ cat, update, remove }) => {
  const { text } = cat;
  const [nextCat, setNextCat] = useState(text);
  return (
    <ListItem
      style={{
        paddingLeft: 0,
        paddingRight: 0,
      }}
    >
      <form
        style={{ width: "100%", margin: 0 }}
        onSubmit={(e) => {
          e.preventDefault();
          if (nextCat) {
            update(nextCat);
          }
        }}
      >
        <TextField
          label="Категория"
          variant="outlined"
          fullWidth
          value={nextCat}
          onChange={(e) => setNextCat(e.target.value)}
        />
        <ButtonGroup fullWidth>
          <Button type="submit">Обновить</Button>
          <Button color="secondary" onClick={remove}>
            Удалить
          </Button>
        </ButtonGroup>
      </form>
    </ListItem>
  );
};
