import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

export default function Header() {
  const [search, setSearch] = useState("");

  function findBySearch(value: any) {
    value.preventDefault()
    console.log(value);
  }

  return (
    <header>
      <img src="" alt="" />
      <form onSubmit={findBySearch}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button>Найти</button>
      </form>
      {/* <TextField
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
      /> */}
      <div>
        {/* <Button variant="contained">Вход</Button>
        <Button variant="contained">Регистрация</Button> */}
      </div>
    </header>
  );
}
