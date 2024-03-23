import { createUseStyles } from "react-jss";

import { Theme } from "src/styles/theme";

const useCardStyles = createUseStyles((theme: Theme) => ({
  card: {
    background: theme.palette.white,
    // borderRadius: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
}));

export default useCardStyles;
