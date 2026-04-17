const formRegister = document.getElementById("formRegister");
const passInput = document.getElementById("pass");
const confirmInput = document.getElementById("confirmPass");
const errorPass = document.getElementById("errorPass");
const errorConfirm = document.getElementById("errorConfirm");

if (formRegister) {
    formRegister.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = document.getElementById("user").value.trim();
        const pass = passInput.value.trim();
        const confirm = confirmInput.value.trim();

        let valid = true;

        document.getElementById("errorUser").innerText = "";
        errorPass.innerText = "";
        errorConfirm.innerText = "";
        document.getElementById("msg").innerHTML = "";

        if (user.length < 4) {
            document.getElementById("errorUser").innerText = "Mínimo 4 caracteres";
            valid = false;
        }

        let mensajes = [];
        if (pass.length < 6) mensajes.push("Mínimo 6 caracteres");
        if (!/[A-Z]/.test(pass)) mensajes.push("Una mayúscula");
        if (!/[0-9]/.test(pass)) mensajes.push("Un número");
        if (!/[!@#$%^&*]/.test(pass)) mensajes.push("Un carácter especial");

        if (mensajes.length > 0) {
            errorPass.innerText = mensajes.join(" • ");
            errorPass.style.color = "#ef4444";
            valid = false;
        } else {
            errorPass.innerText = "✔ Contraseña segura";
            errorPass.style.color = "#22c55e";
        }

        if (pass !== confirm) {
            errorConfirm.innerText = "Las contraseñas no coinciden";
            errorConfirm.style.color = "#ef4444";
            valid = false;
        } else if (confirm.length > 0) {
            errorConfirm.innerText = "✔ Coinciden";
            errorConfirm.style.color = "#22c55e";
        }

        if (!valid) return;

        fetch("api/register.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, pass })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok") {
                document.getElementById("msg").innerHTML = `<div class="alert alert-success">Cuenta creada correctamente</div>`;
                setTimeout(() => { window.location.href = "login.html"; }, 1000);
            } else {
                document.getElementById("msg").innerHTML = `<div class="alert alert-danger">${data.message || "Usuario ya existe"}</div>`;
            }
        });
    });
}

if (passInput) {
    passInput.addEventListener("input", () => {
        const val = passInput.value;
        let mensajes = [];
        if (val.length < 6) mensajes.push("Mínimo 6 caracteres");
        if (!/[A-Z]/.test(val)) mensajes.push("Una mayúscula");
        if (!/[0-9]/.test(val)) mensajes.push("Un número");
        if (!/[!@#$%^&*]/.test(val)) mensajes.push("Un carácter especial");

        if (mensajes.length > 0) {
            errorPass.innerText = mensajes.join(" • ");
            errorPass.style.color = "#ef4444";
        } else {
            errorPass.innerText = "✔ Contraseña segura";
            errorPass.style.color = "#22c55e";
        }

        if (confirmInput && confirmInput.value.length > 0) {
            if (confirmInput.value !== val) {
                errorConfirm.innerText = "Las contraseñas no coinciden";
                errorConfirm.style.color = "#ef4444";
            } else {
                errorConfirm.innerText = "✔ Coinciden";
                errorConfirm.style.color = "#22c55e";
            }
        }
    });
}

if (confirmInput) {
    confirmInput.addEventListener("input", () => {
        if (confirmInput.value !== passInput.value) {
            errorConfirm.innerText = "Las contraseñas no coinciden";
            errorConfirm.style.color = "#ef4444";
        } else {
            errorConfirm.innerText = "✔ Coinciden";
            errorConfirm.style.color = "#22c55e";
        }
    });
}


// Login

const formLogin = document.getElementById("formLogin");

if (formLogin) {
    formLogin.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = document.getElementById("user").value.trim();
        const pass = document.getElementById("pass").value.trim();

        fetch("api/login.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user, pass })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok") {
                localStorage.setItem("session", JSON.stringify({ user: data.user }));
                window.location.href = "index.html";
            } else {
                document.getElementById("msg").innerHTML = `<div class="alert alert-danger">Credenciales incorrectas</div>`;
            }
        });
    });
}


// autentificacion

function checkAuth() {
    fetch("api/check_session.php")
        .then(res => res.json())
        .then(data => {
            if (data.status !== "ok") {
                window.location.href = "login.html";
            } else {
                localStorage.setItem("session", JSON.stringify({ user: data.user }));
            }
        })
        .catch(() => {
            window.location.href = "login.html";
        });
}

function mostrarUsuario() {
    const session = JSON.parse(localStorage.getItem("session"));
    const el = document.getElementById("userLogged");
    if (el && session) {
        el.innerText = session.user;
    }
}

function logout() {
    fetch("api/logout.php", { method: "POST" })
        .then(() => {
            localStorage.removeItem("session");
            window.location.href = "login.html";
        });
}

//verificar user
const formVerificar = document.getElementById("formVerificarUsuario");

if (formVerificar) {
    formVerificar.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = document.getElementById("user").value.trim();

        fetch("api/verificar_usuario.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: user })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok") {
                sessionStorage.setItem("reset_user", user);
                window.location.href = "cambiar_password.html";
            } else {
                document.getElementById("msg").innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
            }
        })
        .catch(() => {
            document.getElementById("msg").innerHTML = `<div class="alert alert-danger">Error al verificar usuario</div>`;
        });
    });
}

//cambio de contraseña
const formCambiar = document.getElementById("formCambiarPassword");

if (formCambiar) {
    const newPassInput = document.getElementById("newPass");
    const confirmPassInput = document.getElementById("confirmPass");
    const errorPassSpan = document.getElementById("errorPass");
    const errorConfirmSpan = document.getElementById("errorConfirm");
    const userInput = document.getElementById("user");

    const resetUser = sessionStorage.getItem("reset_user");
    if (resetUser && userInput) {
        userInput.value = resetUser;
        const msgUsuario = document.getElementById("mensajeUsuario");
        if (msgUsuario) {
            msgUsuario.innerHTML = `Usuario: <strong>${resetUser}</strong>`;
        }
    } else if (!resetUser) {
        window.location.href = "olvide_password.html";
    }

    if (newPassInput) {
        newPassInput.addEventListener("input", () => {
            const val = newPassInput.value;
            let mensajes = [];
            if (val.length < 6) mensajes.push("Mínimo 6 caracteres");
            if (!/[A-Z]/.test(val)) mensajes.push("Una mayúscula");
            if (!/[0-9]/.test(val)) mensajes.push("Un número");
            if (!/[!@#$%^&*]/.test(val)) mensajes.push("Un carácter especial");

            if (mensajes.length > 0) {
                errorPassSpan.innerText = mensajes.join(" • ");
                errorPassSpan.style.color = "#ef4444";
            } else {
                errorPassSpan.innerText = "✔ Contraseña segura";
                errorPassSpan.style.color = "#22c55e";
            }

            if (confirmPassInput && confirmPassInput.value.length > 0) {
                if (confirmPassInput.value !== val) {
                    errorConfirmSpan.innerText = "Las contraseñas no coinciden";
                    errorConfirmSpan.style.color = "#ef4444";
                } else {
                    errorConfirmSpan.innerText = "✔ Coinciden";
                    errorConfirmSpan.style.color = "#22c55e";
                }
            }
        });
    }

    if (confirmPassInput) {
        confirmPassInput.addEventListener("input", () => {
            if (confirmPassInput.value !== newPassInput.value) {
                errorConfirmSpan.innerText = "Las contraseñas no coinciden";
                errorConfirmSpan.style.color = "#ef4444";
            } else {
                errorConfirmSpan.innerText = "✔ Coinciden";
                errorConfirmSpan.style.color = "#22c55e";
            }
        });
    }

    formCambiar.addEventListener("submit", function(e) {
        e.preventDefault();

        const user = userInput.value;
        const newPass = newPassInput.value.trim();
        const confirmPass = confirmPassInput.value.trim();

        let valid = true;
        let mensajes = [];

        if (newPass.length < 6) mensajes.push("Mínimo 6 caracteres");
        if (!/[A-Z]/.test(newPass)) mensajes.push("Una mayúscula");
        if (!/[0-9]/.test(newPass)) mensajes.push("Un número");
        if (!/[!@#$%^&*]/.test(newPass)) mensajes.push("Un carácter especial");

        if (mensajes.length > 0) {
            errorPassSpan.innerText = mensajes.join(" • ");
            errorPassSpan.style.color = "#ef4444";
            valid = false;
        }

        if (newPass !== confirmPass) {
            errorConfirmSpan.innerText = "Las contraseñas no coinciden";
            errorConfirmSpan.style.color = "#ef4444";
            valid = false;
        }

        if (!valid) return;

        const btn = formCambiar.querySelector("button[type='submit']");
        btn.innerText = "Actualizando...";
        btn.disabled = true;

        fetch("api/actualizar_password.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: user, newPass: newPass })
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "ok") {
                document.getElementById("msg").innerHTML = `<div class="alert alert-success">${data.message}</div>`;
                sessionStorage.removeItem("reset_user");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000);
            } else {
                document.getElementById("msg").innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
                btn.innerText = "Actualizar contraseña";
                btn.disabled = false;
            }
        })
        .catch(() => {
            document.getElementById("msg").innerHTML = `<div class="alert alert-danger">Error al actualizar contraseña</div>`;
            btn.innerText = "Actualizar contraseña";
            btn.disabled = false;
        });
    });
}