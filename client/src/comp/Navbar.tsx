import {
  AppBar,
  Button,
  ButtonGroup,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
export const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          style={{ textDecoration: "none", color: "white" }}
          variant="h6"
          component={RouterLink}
          to="/"
        >
          Лаб №1
        </Typography>
        <ButtonGroup
          variant="outlined"
          color="inherit"
          style={{ marginLeft: "auto" }}
        >
          <Button component={RouterLink} to="/create">
            Создать
          </Button>
          <Button component={RouterLink} to="/cats">
            Категории
          </Button>
        </ButtonGroup>
      </Toolbar>
    </AppBar>
  );
};
