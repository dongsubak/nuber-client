import * as styledComponents from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";

interface ThemeInterface {
  blueColor: string;
}

const {
  default: styled,
  css,
  injectGlobal, /*keyframes*/
  ThemeProvider
} = styledComponents as ThemedStyledComponentsModule<ThemeInterface>;

export { css, injectGlobal, ThemeProvider, /*keyframes*/ };
export default styled;