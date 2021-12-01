import React from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"
import { lightTheme } from "./themes/light.theme"
import { darkTheme } from "./themes/dark.theme"

export { default as GlobalStyles } from "./globalStyles"

const themes = {
  light: lightTheme,
  dark: darkTheme
}

const theme = themes["dark"]

export const ThemeProvider = (props) => {
  return (
    <StyledThemeProvider theme={theme}>
      {props.children}
    </StyledThemeProvider>
  )
}