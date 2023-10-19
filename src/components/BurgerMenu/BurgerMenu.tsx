import { Box, IconButton, Drawer, Button } from "@mui/material";
import React, { useState } from "react";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { Link } from "react-router-dom";

export default function BurgerMenu() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const toggleDrawer = (value: boolean) => {
    setOpen(value);
  };

  const list = () => (
    <Box sx={{ width: "50vw", maxWidth: "500px", minWidth: "350px", backgroundColor: '#424242', height: '100vh' }}>
      <div className="grid gap-4 p-8">
        <span className="pseudo-input">
          <span className="material-symbols-outlined text-black">search</span>
          <input
            value={search}
            className="input"
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Найти..."
          />
        </span>
        <Link className="w-full" to={``}>
          <Button className="w-full" variant="contained">
            Главная
          </Button>
        </Link>
        <Link className="w-full" to={`profile`}>
          <Button className="w-full" variant="contained">
            Профиль
          </Button>
        </Link>
        <Button variant="contained">Вход</Button>
        <Button variant="contained">Регистрация</Button>
      </div>
    </Box>
  );

  return (
    <>
      <IconButton onClick={() => toggleDrawer(true)}>
        <DragHandleRoundedIcon />
      </IconButton>
      <Drawer anchor={"right"} open={open} onClose={() => toggleDrawer(false)}>
        {list()}
      </Drawer>
    </>
  );
}
