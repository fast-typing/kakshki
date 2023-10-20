import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import MovieIcon from "@mui/icons-material/Movie";
import { Backdrop, Box, Drawer, Fade, IconButton, Modal } from "@mui/material";
import { login, registration } from "../../http/http";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export default function Header() {
  let inputRef = useRef(null);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: "Вход" });
  const [openSideBar, setOpenSideBar] = useState(false);
  const [modalForm, setModalForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  const openedStyle = {
    width: "250px",
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

  const sideBarStyle = {
    width: "50vw",
    maxWidth: "500px",
    minWidth: "350px",
    backgroundColor: "#424242",
    height: "100vh",
    padding: 4,
  };

  function findBySearch(event: any) {
    event.preventDefault();
    if (!search.length) return;
    navigate(`/search?title=${search}`);
  }

  async function submitModal(event: any) {
    event.preventDefault();
    if (modalForm.username.length < 3 || modalForm.password.length < 3) return;
    if (modal.type === "Вход") {
      login(modalForm);
    } else {
      registration(modalForm);
    }
  }

  function focus(): void {
    inputRef.current.focus();
    setInputOpen(true);
  }

  function closeInput(): void {
    if (search.length) return;
    setInputOpen(false);
  }

  function openModal(type: "Вход" | "Регистрация") {
    setModal({ isOpen: true, type: type });
  }

  function handleChange(e: any) {
    setModalForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  const closeModal = () => {
    setModal({ isOpen: false, type: modal.type });
    setModalForm({ username: "", password: "", email: "" });
  };

  const nav = (isMobile: boolean): ReactJSXElement => {
    return (
      <>
        <form
          className={isMobile ? "grid gap-6 mb-6" : "flex gap-2"}
          onSubmit={findBySearch}
        >
          <span className="pseudo-input"
            onMouseEnter={() => setInputOpen(true)}
            onMouseLeave={() => { console.log(inputRef); if (inputRef) setInputOpen(false); }}
          >
            <span
              className="material-symbols-outlined"
              onClick={findBySearch}
            >
              search
            </span>
            <input
              value={search}
              type="text"
              ref={inputRef}
              onChange={(e) => setSearch(e.target.value)}
              onBlur={closeInput}
              placeholder="Найти..."
              style={
                isMobile
                  ? { width: "100%" }
                  : inputOpen
                    ? openedStyle
                    : closedStyle
              }
            />
            {isMobile ? (
              <IconButton onClick={() => setOpenSideBar(false)}>
                <CloseRoundedIcon />
              </IconButton>
            ) : (
              ""
            )}
          </span>
          <Link to={``} className={isMobile ? "w-full" : ""}>
            <Button variant="contained" className={isMobile ? "w-full" : ""}>
              Главная
            </Button>
          </Link>
          <Link to={`profile`} className={isMobile ? "w-full" : ""}>
            <Button variant="contained" className={isMobile ? "w-full" : ""}>
              Профиль
            </Button>
          </Link>
        </form >
        <div className={isMobile ? "grid gap-6" : "flex gap-2"}>
          <Button onClick={() => openModal("Вход")} variant="contained">
            Вход
          </Button>
          <Button onClick={() => openModal("Регистрация")} variant="contained">
            Регистрация
          </Button>
        </div>
      </>
    );
  };

  return (
    <div className="header-container">
      <header className="m-auto flex items-center justify-between py-6">
        <Link to={``}>
          <div className="flex items-center gap-2">
            <MovieIcon fontSize="large" />
            <h2>movieRank</h2>
          </div>
        </Link>
        <div className="hidden lg:flex gap-2">{nav(false)}</div>
        <div className="block lg:hidden">
          <IconButton onClick={() => setOpenSideBar(true)}>
            <DragHandleRoundedIcon />
          </IconButton>
          <Drawer
            anchor={"right"}
            open={openSideBar}
            onClose={() => setOpenSideBar(false)}
          >
            <Box sx={sideBarStyle}>{nav(true)}</Box>
          </Drawer>
        </div>
        <Modal
          open={modal.isOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={modal.isOpen}>
            <form className="modalContent w-[300px]" onSubmit={submitModal}>
              <div className="flex justify-between">
                <h2>{modal.type}</h2>
                <CloseRoundedIcon
                  className="cursor-pointer"
                  onClick={closeModal}
                />
              </div>
              <input
                name="username"
                placeholder="Логин"
                onChange={handleChange}
                value={modalForm.username}
              />
              {modal.type === "Регистрация" ? (
                <input
                  name="email"
                  placeholder="Почта"
                  onChange={handleChange}
                  value={modalForm.email}
                />
              ) : (
                ""
              )}
              <input
                name="password"
                placeholder="Пароль"
                onChange={handleChange}
                value={modalForm.password}
              />
              <Button variant="contained" onClick={submitModal}>
                Отправить
              </Button>
            </form>
          </Fade>
        </Modal>
      </header>
    </div>
  );
}
