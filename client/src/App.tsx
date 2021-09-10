import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Main } from "./pages/Main";
import { Navbar } from "./comp/Navbar";
import { UpdatePage } from "./pages/UpdatePage";
import { CreatePage } from "./pages/CreatePage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Cats } from "./pages/Cats";

export const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route exact path="/create" component={CreatePage} />
          <Route exact path="/update/:idx">
            <UpdatePage />
          </Route>
          <Route exact path="/cats">
            <Cats />
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
