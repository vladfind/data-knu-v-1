import { Router } from "express";
import { getItems, addItem, recreateItem, deleteItem } from "../src/data";

const PATH = "data/cats.json";

export namespace CATS {
  export const get = async () => getItems<string[]>(PATH);
  export const add = async (cat: string) => addItem<string>(PATH, cat);
  export const update = async (idx: number, cat: string) =>
    recreateItem<string>(PATH, idx, cat);
  export const remove = async (idx: number) => deleteItem<string>(PATH, idx);
}

export const CatRouter = Router();

CatRouter.get("/", async (req, res) => {
  const items = await CATS.get();
  res.json(items);
});

CatRouter.post("/", async (req, res) => {
  const { cat } = req.body;
  if (cat === undefined) {
    res.sendStatus(400);
    return;
  }
  await CATS.add(cat);
  res.sendStatus(200);
});

CatRouter.delete("/:idx", async (req, res) => {
  const { idx } = req.params;
  await CATS.remove(Number(idx));
  res.sendStatus(200);
});

CatRouter.patch("/:idx", async (req, res) => {
  const { idx } = req.params;
  const { cat } = req.body;
  await CATS.update(Number(idx), cat);
  res.sendStatus(200);
});
