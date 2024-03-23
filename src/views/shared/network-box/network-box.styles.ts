import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

const useNetworkBoxStyles = createUseStyles((theme: Theme) => ({
  networkBox: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  listItem: {
    padding: [theme.spacing(0.25), 0],
  },
  buttons: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(4),
  },
  button: {
    // borderRadius: 8,
    borderRadius: 0,
    display: "flex",
    alignItems: "center",
    appearance: "none",
    padding: [theme.spacing(1), theme.spacing(1.5)],
    border: "none",
    background: theme.palette.grey.light,
    cursor: "pointer",
    transition: theme.hoverTransition,
    "&:hover:not(:disabled)": {
      background: theme.palette.grey.main,
    },
    "&:disabled": {
      cursor: "inherit",
      opacity: 0.75,
    },
  },
  buttonIcon: {
    width: 20,
    marginRight: theme.spacing(1),
  },
  link: {
    color: theme.palette.primary.dark,
  },
}));

export default useNetworkBoxStyles;
