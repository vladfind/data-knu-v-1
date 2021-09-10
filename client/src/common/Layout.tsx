import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "0 auto",
      maxWidth: theme.breakpoints.values["md"],
      padding: theme.spacing(1),
      display: "flex",
      justifyItems: "center",
    },
  })
);

export const Layout: React.FC = ({ children }) => {
  const styles = useStyles();

  return <div className={styles.root}>{children}</div>;
};
