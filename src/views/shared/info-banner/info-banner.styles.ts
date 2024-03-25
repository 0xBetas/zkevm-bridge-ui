import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

export const useInfoBannerStyles = createUseStyles((theme: Theme) => ({
  infoBanner: {
    background: theme.palette.grey.main,
    // borderRadius: 8,
    borderRadius: 0,
    display: "flex",
    gap: theme.spacing(1),
    maxWidth: theme.maxWidth,
    padding: theme.spacing(2),
    width: "100%",
  },
  message: {
    color: theme.palette.black,
  },
}));
