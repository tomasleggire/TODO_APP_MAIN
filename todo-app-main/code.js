const setTheme = theme => document.documentElement.className = theme;


const btnDark = document.getElementById("btn-dark");
const btnLight = document.getElementById("btn-light");

const img1 = document.getElementById("img-1");
const img2 = document.getElementById("img-2");
const img3 = document.getElementById("img-3");
const img4 = document.getElementById("img-4");

const back = document.querySelector(".back");

btnLight.addEventListener("click",()=> {
    img3.classList.remove("hide");
    img4.classList.remove("hide");

    img1.classList.remove("show");
    img1.classList.add("hide");
    img2.classList.remove("show");
    img2.classList.add("hide");
    
    back.classList.add("onlight");
    back.classList.remove("ondark");
    
})


btnDark.addEventListener("click",()=> {
    img3.classList.add("hide");
    img4.classList.add("hide");

    img1.classList.add("show");
    img2.classList.add("show");

    back.classList.remove("onlight");
    back.classList.add("ondark");
})

const btnChecks = document.querySelectorAll(".check");

const span = document.querySelector(".span");

let contador = 0;

const todoList = document.querySelector(".todos");

const tick = `<svg id="tick" class="hide" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>`;

const baseDeDatos = indexedDB.open("base",1);

baseDeDatos.addEventListener("upgradeneeded",()=> {
    const db = baseDeDatos.result;
    db.createObjectStore("tareas", {
        autoIncrement: true
    })
})

baseDeDatos.addEventListener("success",()=> {
    leerObjetos();
})

baseDeDatos.addEventListener("error",()=>{   
    console.log("Ocurrio un error al abrir la base de datos");
})


const addObjeto = (objeto) => {
    const db = baseDeDatos.result;
    const transaction = db.transaction("tareas","readwrite");
    const objectStore = transaction.objectStore("tareas");
    objectStore.add(objeto);
}

const leerObjetos = ()=> {
    const db = baseDeDatos.result;
    const transaction = db.transaction("tareas","readonly");
    const objectStore = transaction.objectStore("tareas");
    const cursor = objectStore.openCursor();
    const fragment = document.createDocumentFragment();
    todoList.innerHTML = "";
    cursor.addEventListener("success",()=> {
        if (cursor.result) {
            let elemento = crearTodo(cursor.result.key,cursor.result.value);
            todoList.appendChild(elemento);
            cursor.result.continue();
        }
    })
}

const eliminarObjeto = (key)=> {
    const db = baseDeDatos.result;
    const transaction = db.transaction("tareas","readwrite");
    const objectStore = transaction.objectStore("tareas");
    objectStore.delete(key);
}

const crearTodo = (id,value) => {
    let div = document.createElement("DIV");
    let div2 = document.createElement("DIV");
    let div3 = document.createElement("DIV");
    let div4 = document.createElement("DIV");
    let p = document.createElement("P");

    div.classList.add("todo");
    div2.classList.add("check");
    div2.classList.add("active");
    div3.classList.add("check-icon");
    div4.classList.add("div4");

    p.textContent = value;

    div3.innerHTML = `<svg id="tick" class="hide" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>`;
    div4.innerHTML = `<svg id="cruz" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>`;
    
    div2.appendChild(div3);
    div.appendChild(div2);
    div.appendChild(p);
    div.appendChild(div4);

    div2.addEventListener("click",()=> {
        if (div2.classList.contains("active")) {
            div2.innerHTML = `<svg id="tick" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>`;
            div2.style.background = "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
            div2.classList.remove("active");
            p.classList.add("tachado");
            div.classList.add("tachado-div");
            p.style.color = "var(--color-border)";
            div4.classList.add("hide");
            console.log("pito1");
        } else {
            div2.innerHTML = "";
            div2.style.background = "var(--color-create)";
            div2.style.border = "1px solid hsl(234, 11%, 52%)";
            div2.classList.add("active");
            p.classList.remove("tachado");
            div.classList.remove("tachado-div");
            p.style.color = "var(--color-text)";
            div4.classList.remove("hide");
            console.log("pito2");
        }
    })

    div4.addEventListener("click",()=> {
        eliminarObjeto(id);
        todoList.removeChild(div);
        location.reload();
    })
    
    return div;
}

btnChecks.forEach((btnCheck) => {
    btnCheck.addEventListener("click",()=> {
        if (btnCheck.classList.contains("active")) {
            btnCheck.innerHTML = `<svg id="tick" xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>`;
            btnCheck.style.background = "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))";
            btnCheck.classList.remove("active");
            console.log("pito3");
            
        } else {
            btnCheck.innerHTML = "";
            btnCheck.style.background = "var(--color-create)";
            btnCheck.style.border = "1px solid hsl(234, 11%, 52%)";
            btnCheck.classList.add("active");
            console.log("pito4");
        }
    })
})

const createInput = document.querySelector(".create-in");

document.getElementById("create").addEventListener("keypress",(e)=>{
    let value = createInput.value;
    if (e.keyCode == 13) {
        if (value.length !== 0) {
            addObjeto(value);
            leerObjetos();
            location.reload();
        } else {
            alert("Minimo 3 caracteres por tarea");
        }
    }
})

const obtenerContador = ()=> {
    baseDeDatos.addEventListener("success",()=> {
        var db = baseDeDatos.result;
        var transaction = db.transaction(["tareas"], "readwrite");
        var objectStore = transaction.objectStore("tareas"); 
        var count = objectStore.count();
    
        count.onsuccess = function() {
        contador = count.result;
        span.textContent = contador;
      };
    })
}


obtenerContador();










const clearComplete = document.querySelector(".clear");

clearComplete.addEventListener("click",()=> {
    $(document).ready(function(){
        $(".tachado-div").each(function(){
        const db = baseDeDatos.result;
        const transaction = db.transaction("tareas","readwrite");
        const objectStore = transaction.objectStore("tareas");
        const cursor = objectStore.openCursor();
        cursor.addEventListener("success",()=> {
            objectStore.delete(cursor.result.key);
        })
    })
  })
})









const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".p-active");
const completedBtn = document.querySelector(".completed");

const allBtnMobile = document.querySelector(".all-mobile");
const activeBtnMobile = document.querySelector(".p-active-mobile");
const completedBtnMobile = document.querySelector(".completed-mobile");

const botonesDesk = [allBtn,activeBtn,completedBtn];
const botonesMobile = [allBtnMobile,activeBtnMobile,completedBtnMobile];

allBtn.addEventListener("click",()=>{
    removeColorBlue();
    allBtn.classList.add("blue");
    const todos = document.getElementsByClassName("todo");
    for (let i = 1; i < todos.length; i++) {
        todos[i].style.display = "flex";
    }
})

activeBtn.addEventListener("click",()=>{
    removeColorBlue();
    activeBtn.classList.add("blue");
    const todos = document.getElementsByClassName("todo");
    for (let i = 1; i < todos.length; i++) {
        if (todos[i].classList.contains("tachado-div")) {
            todos[i].style.display = "none";
        } else {
            todos[i].style.display = "flex";
        }
    }
    
})

completedBtn.addEventListener("click",()=>{
    removeColorBlue();
    completedBtn.classList.add("blue");
    const todos = document.getElementsByClassName("todo");
    for (let i = 1; i < todos.length; i++) {
        if (todos[i].classList.contains("tachado-div")) {
            todos[i].style.display = "flex";
        } else {
            todos[i].style.display = "none";
        }
    }
})






allBtnMobile.addEventListener("click",()=>{
    removeColorBlue();
    allBtnMobile.classList.add("blue");
    const todos = document.getElementsByClassName("todo");
    for (let i = 1; i < todos.length; i++) {
        todos[i].style.display = "flex";
    }
})

activeBtnMobile.addEventListener("click",()=>{
    removeColorBlue();
    activeBtnMobile.classList.add("blue");
    const todos = document.getElementsByClassName("todo");
    for (let i = 1; i < todos.length; i++) {
        if (todos[i].classList.contains("tachado-div")) {
            todos[i].style.display = "none";
        } else {
            todos[i].style.display = "flex";
        }
    }
})

completedBtnMobile.addEventListener("click",()=>{
    removeColorBlue();
    completedBtnMobile.classList.add("blue");
    const todos = document.getElementsByClassName("todo");
    for (let i = 1; i < todos.length; i++) {
        if (todos[i].classList.contains("tachado-div")) {
            todos[i].style.display = "flex";
        } else {
            todos[i].style.display = "none";
        }
    }
})




const removeColorBlue = ()=> {
    for (let i = 0; i < botonesDesk.length; i++) {
        botonesDesk[i].classList.remove("blue");
    }
    for (let i = 0; i < botonesMobile.length; i++) {
        botonesMobile[i].classList.remove("blue");
    }
}