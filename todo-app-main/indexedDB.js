////////////////////////////////////////////// FileReader ////////////////////////////////////
//Cargamos datos que le pedimos al usuario.
                                                                    /*
"use strict";
                  
//Como leer un archivo de texto:
                                                                     
const archivo = document.getElementById("archivo");
archivo.addEventListener("change",(e)=>{ //El eventos change se ejecuta cuando se modifica el input
    leerArchivo(archivo.files[0]) //Con archivo.files[0] accedemos al archivo que nos pasa, en caso de que sea uno solo.
})
                                                                   
const leerArchivo = ar =>{
    const reader = new FileReader();
    reader.readAsText(ar);
    reader.addEventListener("load",(e)=>{
        console.log(JSON.parse(e.currentTarget.result))
    })
}
                                                                   */
//Como leer varios archivos de texto:
                                                                    /*
const archivo = document.getElementById("archivo");
archivo.addEventListener("change",(e)=>{ //El eventos change se ejecuta cuando se modifica el input
    leerArchivo(archivo.files) //Con archivo.files accedemos a todos los archivos.
})  

const leerArchivo = ar =>{
    for (let i = 0; i < ar.length; i++){
        const reader = new FileReader();
        reader.readAsText(ar[i]);
        reader.addEventListener("load",(e)=>{
        console.log(JSON.parse(e.currentTarget.result))
    })
    }
}
                                                                  */
//Las imagenes, videos, se leen con .readAsDataURL().
//Ejemplo de uso 1 (Cargar galeria dinamicamente): 
                                                                   /*
const archivo = document.getElementById("archivo");
archivo.addEventListener("change",(e)=>{ 
    leerArchivo(archivo.files);
})  

const leerArchivo = ar =>{
    for (let i = 0; i < ar.length; i++){
        const reader = new FileReader();
        reader.readAsDataURL(ar[i]);
        reader.addEventListener("load",(e)=>{
        let newImg = `<img src='${e.currentTarget.result}'>`;
        document.querySelector(".resultado").innerHTML += newImg;
    })
    }
}
                                                                    */

//Ejemplo de uso 2 (FileReader + Drag & Drop):
                                                                        /*
const zona = document.querySelector(".zona-arrastre");

zona.addEventListener("dragover",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#444");
})

zona.addEventListener("dragleave",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
})

zona.addEventListener("drop",(e)=>{
    e.preventDefault();
    changeStyle(e.srcElement, "#888");
    cargarArchivo(e.dataTransfer.files[0]);
    zona.style.border = "4px solid #888";
})

const changeStyle = (obj,color)=>{
    obj.style.color = color;
    obj.style.border = `4px dashed ${color}`;
}
                                                                 */
                                                               /*  //como meter un texto
const cargarArchivo = (ar) =>{
    const reader = new FileReader();
    reader.readAsText(ar);
    reader.addEventListener("load",(e)=>{
        document.querySelector(".resultado").textContent = e.currentTarget.result;
    })
}
                                                                 */
                                                                  /*  //como meter una imagen

const cargarArchivo = (ar) =>{
    const reader = new FileReader();
    reader.readAsDataURL(ar);
    reader.addEventListener("load",(e)=>{
        let url = URL.createObjectURL(ar);
        let img = document.createElement("IMG");
        img.setAttribute("src",url);
        document.querySelector(".resultado").appendChild(img);
    })
}

                                                                 */
                                                                   /*  //como meter un video

const cargarArchivo = (ar) =>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(ar);
    reader.addEventListener("load",(e)=>{
        let video = new Blob([new Uint8Array(e.currentTarget.result)],{type: 'video/mp4'});
        let url = URL.createObjectURL(video);
        let img = document.createElement("VIDEO");
        img.setAttribute("src",url);
        document.querySelector(".resultado").appendChild(img);
        img.play();
    })
}
                                                                     */
//Como ver el progeso de lo que tarda en cargar: 
                                                               /*
const cargarArchivo = (ar) =>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(ar);
    reader.addEventListener("progress",(e)=>{  // "progresss" es el evento que detecta mientras algo esta cargando
        let carga = (e.loaded / ar.size * 100);
        console.log(carga);
    })
    reader.addEventListener("load",(e)=>{
        let video = new Blob([new Uint8Array(e.currentTarget.result)],{type: 'video/mp4'});
        let url = URL.createObjectURL(video);
        let img = document.createElement("VIDEO");
        img.setAttribute("src",url);
        document.querySelector(".resultado").appendChild(img);
        img.play();
    })
}
                                                            */

//Como hacer una barra de progreso:
                                                                           /*
const cargarArchivo = (ar) =>{
    const reader = new FileReader();
    reader.readAsArrayBuffer(ar);
    reader.addEventListener("progress",(e)=>{ 
        let carga = Math.round(e.loaded / ar.size * 100);
        zona.textContent = `${carga}%`;
        document.querySelector(".barra-de-carga").style.padding = "75px 20px";
        document.querySelector(".barra-de-carga").style.width = `${carga}%`;
    })
    reader.addEventListener("loadend",()=>{
        changeStyle(zona,"4f9");
    })
    reader.addEventListener("load",(e)=>{
        let video = new Blob([new Uint8Array(e.currentTarget.result)],{type: 'video/mp4'});
        let url = URL.createObjectURL(video);
        let img = document.createElement("VIDEO");
        img.setAttribute("src",url);
        document.querySelector(".resultado").appendChild(img);
        img.play();
    })
}

                                                                       */

///////////////////////////////////////////// API IndexedDB /////////////////////////////////////////
//Base de datos indexada, almacena informacion en el navegador de forma similar a localStorage.
//Es orientada a objetos.
//Es asincrona, es decir, trabaja en tiempo real.
//Trabaja con eventos del DOM.
//Almacenar datos en forma de objetos.
                                                                      /*

const IDBRequest = indexedDB.open("daltobase",1);  //Abre una base de datos y si no existe, la crea.
                                                   //El segundo parametro es para el numero de la verion.
                                                   //Esto es la solicitud, no la base de datos en si.

IDBRequest.addEventListener("upgradeneeded",()=>{  //Verifica si la base de datos existe y sino la crea.                                                
                                                  //Para crear el storage de objetos, se tiene que clarar cuando se ejecuta el evento, es decir, cuando se crea y no cuando ya existe.
    const db = IDBRequest.result;  //Si todo sale bien, db es el resultado de la peticion y ahora si, la base de datos.
    db.createObjectStore("nombres", {
        autoIncrement: true   //como 2do parametro esto va si o si, hace que cada valor sea unico.
    })
})

            
IDBRequest.addEventListener("success",()=>{        // success nos devuelve que todo salio correctamente.
    console.log("Todo salio correctamente");
})
  
IDBRequest.addEventListener("error",()=>{   //En caso de que haya un error, se ejecuta esto.
    console.log("Ocurrio un error al abrir la base de datos");
})

//CRUD: funciones para trabajar los datos.
//Cada vez que querramos operar la base de datos, hay que abrir una transaction.
//Create:

const addObjeto = objeto =>{
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombres","readwrite"); //.transaction permite hacer una accion con el objeto, lo q quieras, y el 2do parametro es para saber si es solo lectura o se puede modificar.
    const objectStore = IDBtransaction.objectStore("nombres"); //De esta manera abrimos la transaccion en el store "nombres".
    objectStore.add(objeto); //Y se agrega el objeto que pasamos como parametro cuando llamamos la funcion.
    IDBtransaction.addEventListener("complete",()=>{
        console.log("Objeto agregado correctamente");
    })
}

//Como leer todos los objetos:

const leerObjetos = ()=>{
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombres","readonly");
    const objectStore = IDBtransaction.objectStore("nombres");
    const cursor = objectStore.openCursor();
    cursor.addEventListener("success",()=>{
        if(cursor.result) {
            console.log(cursor.result.value);
            cursor.result.continue();
        } else {
            console.log("todos los datos fueron leidos");
        }
    })
}

//Como mofificar objetos: (Repito: todas las acciones requieren las transacciones, es casi copiar y pegar).

const modificarObjeto = (key,objeto) =>{ //En este caso necesitamos ver el key y el objeto.
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombres","readwrite"); 
    const objectStore = IDBtransaction.objectStore("nombres"); 
    objectStore.put(objeto,key); //Usamos .put(objeto,key) que si no existe el objeto, lo crea, y sino lo modifica.
    IDBtransaction.addEventListener("complete",()=>{
        console.log("Objeto modificado correctamente");
    })
}

//Como eliminar objetos:

const eliminarObjeto = key =>{ //En este caso solo necesitamos ver el key.
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombres","readwrite"); 
    const objectStore = IDBtransaction.objectStore("nombres"); 
    objectStore.delete(key); //Usamos .delete(key).
    IDBtransaction.addEventListener("complete",()=>{
        console.log("Objeto eliminado correctamente");
    })
}
                                                                        */
//////////////////////////////////// IndexedDB + Drag & Drop ////////////////////////////////////////

const IDBRequest = indexedDB.open("daltobase",1);  
                                                   
IDBRequest.addEventListener("upgradeneeded",()=>{  
    const db = IDBRequest.result;  
    db.createObjectStore("nombres", {
        autoIncrement: true   
    })
})
      
IDBRequest.addEventListener("success",()=>{        
    leerObjetos();
})
  
IDBRequest.addEventListener("error",()=>{   
    console.log("Ocurrio un error al abrir la base de datos");
})

document.getElementById("add").addEventListener("click",()=>{
    let nombre = document.getElementById("nombre").value;
    if(nombre.length > 0) {
        if (document.querySelector(".posible") != undefined) {
            if (confirm("Hay elementos sin guardar, deseas continuar?")) {
                addObjeto({nombre});
                leerObjetos();
            }
        } else {
            addObjeto({nombre});
            leerObjetos();
        }
    }
})

const addObjeto = objeto =>{
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombres","readwrite");
    const objectStore = IDBtransaction.objectStore("nombres"); 
    objectStore.add(objeto); 
    IDBtransaction.addEventListener("complete",()=>{
        console.log("Objeto agregado correctamente");
    })
}

const leerObjetos = ()=>{
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombres","readonly");
    const objectStore = IDBtransaction.objectStore("nombres");
    const cursor = objectStore.openCursor();
    const fragment = document.createDocumentFragment();
    document.querySelector(".nombres").innerHTML = "";
    cursor.addEventListener("success",()=>{
        if(cursor.result) {
            let elemento = nombresHTML(cursor.result.key,cursor.result.value);
            fragment.appendChild(elemento);
            cursor.result.continue();
        } else {
            document.querySelector(".nombres").appendChild(fragment);
        }
    })
}

const modificarObjeto = (key,objeto) =>{ 
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombres","readwrite"); 
    const objectStore = IDBtransaction.objectStore("nombres"); 
    objectStore.put(objeto,key); 
    IDBtransaction.addEventListener("complete",()=>{
        console.log("Objeto modificado correctamente");
    })
}

const eliminarObjeto = key =>{ 
    const db = IDBRequest.result;
    const IDBtransaction = db.transaction("nombres","readwrite"); 
    const objectStore = IDBtransaction.objectStore("nombres"); 
    objectStore.delete(key); 
    IDBtransaction.addEventListener("complete",()=>{
        console.log("Objeto eliminado correctamente");
    })
}


const nombresHTML = (id,name) =>{
    const container = document.createElement("DIV");
    const h2 = document.createElement("h2");
    const options = document.createElement("DIV");
    const saveButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    container.classList.add("nombre");
    options.classList.add("options");
    saveButton.classList.add("imposible");
    deleteButton.classList.add("delete");

    saveButton.textContent = "Guardar";
    deleteButton.textContent = "Eliminar";

    h2.textContent = name.nombre;
    h2.setAttribute("contenteditable","true");
    h2.setAttribute("spellcheck","false");

    options.appendChild(saveButton);
    options.appendChild(deleteButton);

    container.appendChild(h2);
    container.appendChild(options);

    h2.addEventListener("keyup",()=>{
        saveButton.classList.replace("imposible","posible");
    })

    saveButton.addEventListener("click",()=>{
        if (saveButton.className == "posible") {
            modificarObjeto(id,{nombre: h2.textContent});
            saveButton.classList.replace("posible","imposible");
        }
    })

    deleteButton.addEventListener("click",()=>{
        eliminarObjeto(id);
        document.querySelector(".nombres").removeChild(container);
    })

    return container;
}