import React, { useState } from "react";
import { Backdrop, Button, Fade, Modal } from "@mui/material";
import { login, registration } from "../../additional/http.service";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

interface Props {
  open: boolean;
  type: "Вход" | "Регистрация";
  onClose: Function;
}

export default function AuthModal(props: Props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });

  async function submitModal(event: any) {
    event.preventDefault();
    if (form.username.length < 3 || form.password.length < 3) return;
    if (props.type === "Вход") {
      const res = await login(form);
      if (typeof res !== "string") return;
      props.onClose();
    } else {
      const res = await registration(form);
      if (!res.id) return;
      props.onClose();
    }
  }

  function handleChange(e: any) {
    setForm((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  return (
    <Modal
      open={props.open}
      onClose={() => props.onClose()}
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
      <Fade in={props.open}>
        <form className="modalContent w-[300px]" onSubmit={submitModal}>
          <div className="flex justify-between">
            <h2>{props.type}</h2>
            <CloseRoundedIcon className="cursor-pointer" onClick={() => props.onClose()} />
          </div>
          <input
            name="username"
            placeholder="Логин"
            onChange={handleChange}
            value={form.username}
          />
          {props.type === "Регистрация" ? (
            <input
              name="email"
              placeholder="Почта"
              onChange={handleChange}
              value={form.email}
            />
          ) : (
            ""
          )}
          <input
            name="password"
            placeholder="Пароль"
            onChange={handleChange}
            value={form.password}
          />
          <Button variant="contained" onClick={submitModal}>
            Отправить
          </Button>
        </form>
      </Fade>
    </Modal>
  );
}
