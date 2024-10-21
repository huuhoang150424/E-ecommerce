import React, { createContext, useContext, useState } from "react"

interface Props {
  children?: React.ReactNode;
  defaultTheme: string 
}

interface ThemeContext {
  theme: string;
  toggleTheme: (theme:"light" | "dark")=>void
}

const ThemeContext=createContext<ThemeContext | undefined>(undefined);

export function ThemeProvider({ children, defaultTheme }: Props) {
  /**
   * theme dark mode
   */
  const [theme, setTheme] = useState<string>(
    localStorage.getItem('theme') || defaultTheme
  );

  const toggleTheme = (selectedTheme: 'light' | 'dark') => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

export const useTheme=()=>{
  const context=  useContext(ThemeContext);
  if (!context ) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context;

}
