import cfenv from "cfenv";
import express from "express";
import cors from "cors";
import { CatRouter } from "./routes/cat";
import { USERS } from "./src/users";

const appEnv = cfenv.getAppEnv();
const app = express();
const PORT = appEnv.port;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/cat", CatRouter);

app.get("/", async (req, res) => {
  const items = await USERS.get();
  res.json(items);
});

app.post("/", async (req, res) => {
  const { user } = req.body;
  if (user === undefined) {
    res.sendStatus(400);
    return;
  }
  await USERS.add(user);
  res.sendStatus(200);
});

app.delete("/:idx", async (req, res) => {
  const { idx } = req.params;
  await USERS.remove(Number(idx));
  res.sendStatus(200);
});

app.patch("/:idx", async (req, res) => {
  const { idx } = req.params;
  const { user } = req.body;
  await USERS.update(Number(idx), user);
  res.sendStatus(200);
});

app.listen(PORT, appEnv.bind, () => {
  console.log(`Listening on ${PORT}`);
});
