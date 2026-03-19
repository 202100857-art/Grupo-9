/*registro */
const formRegister = document.getElementById("formRegister");
const passInput = document.getElementById("pass");
const confirmInput = document.getElementById("confirmPass");
const errorPass = document.getElementById("errorPass");
const errorConfirm = document.getElementById("errorConfirm");

if (formRegister) {
    formRegister.addEventListener("submit", function(e){
        e.preventDefault();

        const user = document.getElementById("user").value.trim();
        const pass = passInput.value.trim();
        const confirm = confirmInput.value.trim();

        let valid = true;

       
        document.getElementById("errorUser").innerText = "";
        errorPass.innerText = "";
        errorConfirm.innerText = "";
        document.getElementById("msg").innerHTML = "";

        
        if(user.length < 4){
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

        if(pass !== confirm){
            errorConfirm.innerText = "Las contraseñas no coinciden";
            errorConfirm.style.color = "#ef4444";
            valid = false;
        } else if(confirm.length > 0){
            errorConfirm.innerText = "✔ Coinciden";
            errorConfirm.style.color = "#22c55e";
        }

        if(!valid) return;

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        if(usuarios.find(u => u.user === user)){
            document.getElementById("msg").innerHTML = `<div class="alert error">Usuario ya existe</div>`;
            return;
        }

        usuarios.push({ user, pass });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        document.getElementById("msg").innerHTML = `<div class="alert success">Cuenta creada correctamente</div>`;

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    });
}

/*validacion */
if(passInput){
    passInput.addEventListener("input", () => {
        const val = passInput.value;
        let mensajes = [];
        if (val.length < 6) mensajes.push("Mínimo 6 caracteres");
        if (!/[A-Z]/.test(val)) mensajes.push("Una mayúscula");
        if (!/[0-9]/.test(val)) mensajes.push("Un número");
        if (!/[!@#$%^&*]/.test(val)) mensajes.push("Un carácter especial");

        if (mensajes.length > 0){
            errorPass.innerText = mensajes.join(" • ");
            errorPass.style.color = "#ef4444";
        } else {
            errorPass.innerText = "✔ Contraseña segura";
            errorPass.style.color = "#22c55e";
        }

        if(confirmInput.value.length > 0){
            if(confirmInput.value !== val){
                errorConfirm.innerText = "Las contraseñas no coinciden";
                errorConfirm.style.color = "#ef4444";
            } else {
                errorConfirm.innerText = "✔ Coinciden";
                errorConfirm.style.color = "#22c55e";
            }
        }
    });
}

if(confirmInput){
    confirmInput.addEventListener("input", () => {
        if(confirmInput.value !== passInput.value){
            errorConfirm.innerText = "Las contraseñas no coinciden";
            errorConfirm.style.color = "#ef4444";
        } else {
            errorConfirm.innerText = "✔ Coinciden";
            errorConfirm.style.color = "#22c55e";
        }
    });
}

/* login*/
const formLogin = document.getElementById("formLogin");

if(formLogin){
    formLogin.addEventListener("submit", function(e){
        e.preventDefault();

        const user = document.getElementById("user").value.trim();
        const pass = document.getElementById("pass").value.trim();

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const encontrado = usuarios.find(u => u.user === user && u.pass === pass);

        if(!encontrado){
            document.getElementById("msg").innerHTML = `<div class="alert error">Credenciales incorrectas</div>`;
            return;
        }

        localStorage.setItem("session", JSON.stringify(encontrado));
        window.location.href = "index.html";
    });
}


function checkAuth(){
    const session = JSON.parse(localStorage.getItem("session"));
    if(!session){
        window.location.href = "login.html";
    }
}


function mostrarUsuario(){
    const session = JSON.parse(localStorage.getItem("session"));
    if(session){
        const el = document.getElementById("userLogged");
        if(el){
            el.innerText = session.user;
        }
    }
}


function logout(){
    localStorage.removeItem("session");
    window.location.href = "login.html";
}