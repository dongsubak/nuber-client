import * as styledComponents from "styled-components";
import { ThemeInterface } from "./theme"


/*
interface ThemeInterface {
  blueColor: string;
  greyColor: string;
}
*/


/*
type StyledFunction<T> = styledComponents.ThemedStyledFunction<any, ThemeInterface>;

function withProps<T, U extends HTMLElement = HTMLElement>(
  styledFunction: StyledFunction<React.HTMLProps<U>>
): StyledFunction<T & React.HTMLProps<U>> {
  return styledFunction;
}
*/

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ThemeInterface>; //or <ThemeInterface>

export { css, createGlobalStyle, keyframes, ThemeProvider, /*withProps*/ };
export default styled;