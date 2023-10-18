import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import MovieIcon from '@mui/icons-material/Movie';
import { styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import './Header.css'

export default function Header() {
  const [search, setSearch] = useState("");
  const [inputOpen, setInputOpen] = useState(false)
  let inputRef = useRef(null)

  const openedStyle = {
    width: '100%',
    transition: 'width 1s',
  };
  const closedStyle = {
    width: 50,
    transition: 'width 1s',
  };

  function findBySearch(event: any): void {
    event.preventDefault()
    console.log(event);
  }

  function focus() {
    inputRef.current.focus()
    setInputOpen((prev) => !prev)
  }

  return (
    <div className="header-container">
      <header className="m-auto flex items-center justify-between py-6">
        <div className="flex items-center gap-2">
          <MovieIcon fontSize="large" />
          <h2>movieRank</h2>
        </div>
        <form className="flex gap-2 w-auto" onSubmit={findBySearch}>
          <div className="pseudo-input" style={inputOpen ? openedStyle : closedStyle}>
            <SearchIcon sx={{ cursor: 'pointer' }} onClick={focus} />
            <input className="input" type="text" ref={inputRef} placeholder="Поиск..." />
          </div>
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
