import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import MovieIcon from "@mui/icons-material/Movie";
import { styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Header.css";

export default function Header() {
  const [search, setSearch] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  let inputRef = useRef(null);

  const openedStyle = {
    width: "200px",
    transition: "width .5s, opacity .4s, padding .6s",
    opacity: 1,
    paddingLeft: 12,
    paddingRight: 12,
  };
  const closedStyle = {
    width: 0,
    transition: "width .5s, opacity .4s, padding .6s",
    opacity: 0,
    paddingLeft: 0,
    paddingRight: 0,
  };

  function findBySearch(event: any): void {
    event.preventDefault();
    console.log(event);
  }

  function focus(): void {
    inputRef.current.focus();
    setInputOpen((prev) => !prev);
  }

  function closeInput(): void {
    if (search.length) return
    setInputOpen(false);
  }

  return (
    <div className="header-container">
      <header className="m-auto flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <MovieIcon fontSize="large" />
          <h2>movieRank</h2>
        </div>
        <form className="flex gap-2 w-auto" onSubmit={findBySearch}>
          <span className="pseudo-input">
            <span className="material-symbols-outlined" onClick={focus}>
              search
            </span>
            <input
              value={search}
              style={inputOpen ? openedStyle : closedStyle}
              className="input"
              type="text"
              ref={inputRef}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={closeInput}
              placeholder="Поиск..."
            />
          </span>
          <Button variant="contained">Вход</Button>
          <Button variant="contained">Регистрация</Button>
        </form>
        {/* <TextField
          type="text"
          size="small"
          ref={inputRef}
          placeholder="Поиск..."
          style={inputOpen ? openedStyle : closedStyle}
          onBlur={() => setInputOpen(false)}
          onFocus={() => setInputOpen(true)}
          InputProps={{
            startAdornment: (
              <InputAdornment sx={{ cursor: 'pointer' }} onClick={focus} position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            // endAdornment: (
            //   <InputAdornment position="end" sx={{ cursor: 'pointer' }} onClick={() => () => toggleInput(false)(0)}>
            //     <CloseIcon />
            //   </InputAdornment>
            // ),
          }}
        /> */}
      </header>
    </div>
  );
}
