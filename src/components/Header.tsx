import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from '@mui/material/styles';
import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";
import theme from '../theme'

const CustomInput = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.color,
  '&.Mui-checked': {
    color: theme.color,
  },
}));

export default function Header() {
  const [search, setSearch] = useState("");

  function findBySearch(value: any) {
    value.preventDefault()
    console.log(value);
  }

  return (
    <ThemeProvider theme={theme}>
      <header>
        <div className="m-auto flex w-[1000px] items-center">
          <img src="" alt="" />
          <form onSubmit={findBySearch}>
            <CustomInput
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSubmit={findBySearch}
              name="search"
              label="Поиск..."
              variant="outlined"
            />
          </form>
          <div className="flex gap-2">
            <Button variant="contained">Вход</Button>
            <Button variant="contained">Регистрация</Button>
          </div>
        </div>
      </header>
    </ThemeProvider>
  );
}
