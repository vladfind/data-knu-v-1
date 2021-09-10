import {
  Button,
  Container,
  List,
  ListItem,
  TextField,
} from "@material-ui/core";
import {
  useCats,
  useCreateCat,
  useDeleteCat,
  useUpdateCat,
} from "../query/useCats";
import { CatItem } from "../comp/CatItem";
import { useState } from "react";

export const Cats: React.FC = () => {
  const [myCat, setMyCat] = useState("");
  const { data: cats } = useCats();
  const { mutate: update } = useUpdateCat();
  const { mutate: remove } = useDeleteCat();
  const { mutate: create } = useCreateCat();

  return (
    <Container>
      <List>
        {cats?.map((cat, catIdx) => {
          return (
            <CatItem
              key={catIdx}
              cat={cat}
              remove={() => {
                remove(catIdx);
              }}
              update={(nextCat) => {
                update({ idx: catIdx, cat: { text: nextCat } });
              }}
            />
          );
        })}
      </List>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (myCat) {
            create({ text: myCat });
            setMyCat("");
          }
        }}
      >
        <TextField
          label="Категория"
          value={myCat}
          onChange={(e) => setMyCat(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <br />
        <br />
        <Button type="submit" color="primary" fullWidth variant="outlined">
          Добавить
        </Button>
      </form>
    </Container>
  );
};
