import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import MovieIcon from "@mui/icons-material/Movie";
import { Backdrop, Fade, Modal } from "@mui/material";
import { login, registration } from "../../http/http";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

export default function Header() {
  const [search, setSearch] = useState("");
  const [inputOpen, setInputOpen] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, type: "Вход" });
  const [modalForm, setModalForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  let inputRef = useRef(null);

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

  function findBySearch(event: any) {
    event.preventDefault();
    navigate("/search?word=" + search);
  }

  function submitModal(event: any) {
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
    setInputOpen(!inputOpen);
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

  return (
    <div className="header-container">
      <header className="m-auto flex items-center justify-between py-6">
        <Link to={``}>
          <div className="flex items-center gap-2">
            <MovieIcon fontSize="large" />
            <h2>movieRank</h2>
          </div>
        </Link>
        <div className="hidden lg:flex gap-2">
          <form className="flex gap-2" onSubmit={findBySearch}>
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
                placeholder="Найти..."
              />
            </span>
            <Link to={``}>
              <Button variant="contained">Главная</Button>
            </Link>
            <Link to={`profile`}>
              <Button variant="contained">Профиль</Button>
            </Link>
          </form>
          <div className="hidden lg:flex gap-2">
            <Button onClick={() => openModal("Вход")} variant="contained">
              Вход
            </Button>
            <Button
              onClick={() => openModal("Регистрация")}
              variant="contained"
            >
              Регистрация
            </Button>
          </div>
        </div>
        <div className="block lg:hidden">
          <BurgerMenu />
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
