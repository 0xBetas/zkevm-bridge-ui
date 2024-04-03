import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useLayoutStyles = createUseStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    margin: [0, "auto"],
    paddingBottom: theme.spacing(2),
    width: "100%",
  },
  layout: {
    background: "transparent",
    // background: theme.palette.grey.light,
    // backgroundImage: "linear-gradient(180deg,rgba(0,0,0,.5),transparent 109.37%)",
    // backgroundImage:
    //   "linear-gradient(90deg, rgba(163,34,9,1) 0%, rgba(131,31,11,1) 51%, rgba(71,12,3,1) 100%)",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    width: "100%",
  },
  linkContainer: {
    marginTop: theme.spacing(2),
  },
}));
