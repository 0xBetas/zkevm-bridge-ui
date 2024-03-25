import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useActivityStyles = createUseStyles((theme: Theme) => ({
  bridgeCardwrapper: {
    "&:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: [0, theme.spacing(2)],
  },
  emptyMessage: {
    alignSelf: "center",
    maxWidth: theme.maxWidth,
    padding: [50, theme.spacing(2)],
    textAlign: "center",
    width: "100%",
    [theme.breakpoints.upSm]: {
      padding: 100,
    },
  },
  filterBox: {
    "&:not(:first-of-type)": {
      marginLeft: theme.spacing(2),
    },
    alignItems: "center",
    backgroundColor: "transparent",
    // borderRadius: 8,
    borderRadius: 0,
    cursor: "pointer",
    display: "flex",
    padding: [[theme.spacing(0.75), theme.spacing(1)]],
    transition: theme.hoverTransition,
  },
  filterBoxes: {
    background: theme.palette.grey.light,
    display: "flex",
    margin: [theme.spacing(5), "auto", theme.spacing(2)],
    maxWidth: theme.maxWidth,
    padding: 8,
    width: "100%",
  },
  filterBoxLabel: {
    padding: [theme.spacing(0), theme.spacing(1)],
  },
  filterBoxSelected: {
    backgroundColor: theme.palette.white,
    borderColor: theme.palette.grey.dark,
    borderStyle: "solid",
    borderWidth: 1,
    color: theme.palette.grey.dark,
  },
  filterNumberBox: {
    alignItems: "center",
    backgroundColor: theme.palette.grey.main,
    // borderRadius: 6,
    borderRadius: 0,
    display: "flex",
    padding: [theme.spacing(0.25), theme.spacing(1)],
  },
  filterNumberBoxSelected: {
    backgroundColor: theme.palette.grey.light,
  },
  stickyContent: {
    // background: theme.palette.grey.light,
    background: "transprent",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  stickyContentBorder: {
    borderBottom: `${theme.palette.grey.main} 1px solid`,
  },
}));
