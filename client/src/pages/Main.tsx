import { Container } from "@material-ui/core";
import { Display } from "../comp/Display";
import { SearchForm } from "../comp/SearchForm";
import { User } from "../types";
import { useMemo, useState } from "react";
import { useUsers } from "../query/useUser";

export const Main: React.FC = () => {
  const [query, setQuery] = useState<null | {
    field: keyof User;
    value: string;
  }>(null);

  const { data } = useUsers();

  const foundUsers = useMemo(() => {
    if (data === undefined) {
      return [];
    }
    if (query === null) {
      return data;
    }

    return data.filter((user) => user[query.field] === query.value);
  }, [query, data]);

  return (
    <>
      <Container>
        <SearchForm startSearch={(q) => setQuery(q)} />
        <Display users={foundUsers} />
      </Container>
    </>
  );
};
