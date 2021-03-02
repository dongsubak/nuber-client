import baseStyled, { DefaultTheme, ThemedStyledInterface } from 'styled-components';

export const theme: DefaultTheme = {
  blueColor: "#3498db",
  greyColor: "#7f8c8d"
}

export type ThemeInterface = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<ThemeInterface>;