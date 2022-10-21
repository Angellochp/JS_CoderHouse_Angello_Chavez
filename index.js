
let select1 = document.getElementById('selector1') //Variable fijada a primer desplegable
let select2 = document.getElementById('selector2')//Variable fijada a segundo desplegable
let formulario = document.getElementById("formulario");
let cotización = document.getElementById("cotización");
let tabla = document.getElementById("tabla");
let lista = document.getElementById("lista");
let erase = document.getElementById("erase");
let alerta = document.getElementById("alerta");
//se setean los mensajes default para no repetirlos en el código como string
let dfhours = "Seleccione Cantidad de Horas"
let dfspeakers = "Seleccione Cantidad de Parlantes"
let dflights = "Seleccione Set de luces"
let df = "Seleccione servicio a agregar"


// Se genera la clase constructora que va a alimentar las lineas de la cotización
class linea{
    constructor(servicio, detalle, precio){
      this.servicio = servicio;
      this.detalle = detalle;
      this.precio = precio;
    }
  }
 

const cotizacion = [];


//Este evento alimentará la tabla de cotización una vez seleccionadas
formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  //Limpiamos la alerta cada vez que se vuelva a seleccionar una opción correcta
  alerta.innerHTML="";
 /*  let inputs = e.target.children; */
  //Asignamos variable a cada contenido que resulte seleccionado para aligerar código
  let Sel1 = select1[select1.selectedIndex].textContent
  let sel2 = select2[select2.selectedIndex].textContent
  let sel3 = () => {

    switch(sel2){
        case "2 Horas":
        return 400
        case "4 Horas":
        return 600
        case "6 Horas":
        return 800
        case "1 Parlante":
        return 100
        case "2 Parlantes":
        return 150
        case "3 Parlantes":
        return 200
        case "Luces básicas":
        return 200
        case "Set profesional":
        return 500 
    }
  }
  
  //seteamos la variable que construira las lineas
  let item = new linea (Sel1,sel2,sel3());
  //Configuramos un boton que borre el contenido de la lista / clase completamente  
  erase.onclick = () => { 

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Has limpiado la cotización'
    });
    
    while (cotizacion.length>0){cotizacion.pop();}lista.innerHTML = "", localStorage.setItem("cotizacón", JSON.stringify(cotizacion))}
 /*  let alerta = document.getElementById("alerta") */
 /*  let message = alerta.innerHTML=`<p>Para cotizar ${sel2}</p>`; */

//operador Ternario que reemplaza el if
  const validate = sel2 == df?message():sel2==dfhours?message():sel2==dflights?message():sel2==dfspeakers?message(): resultado()

  //Se reemplazó el mensaje de rror en un DIV por una alerta
function message(){
  Swal.fire({
    icon: 'error',
    title: `<p>Para cotizar ${sel2}</p>`,
    /* text: 'Something went wrong!',
    footer: '<a href="">Why do I have this issue?</a>' */
  })
  /* let alerta = document.getElementById("alerta")
  alerta.innerHTML=`<p>Para cotizar ${sel2}</p>`; */

}
//If reemplazado
/* validate ? message : alert ("no") */
  //Configuramos un condicional que nos devuelva cuando no se haya seleccionado un opciòn de cantidad
/*   if (sel2 == dfhours||sel2 == df||sel2 == dflights||sel2 == dfspeakers){
  let alerta = document.getElementById("alerta")
   alerta.innerHTML=`<p>Para cotizar ${sel2}</p>`;
  
}
//si la condición se pasa se agrega un item al arreglo y se hace append en la lista
  else{ */
function resultado(){

    lista.innerHTML="";
    lista.innerHTML= '<thead><td>Servicio</td><td>Detalle</td><td>Precio</td></thead><tfoot><td colspan=2>total</td></tfoot>'

    cotizacion.push(item)

  for (const coti of cotizacion) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${coti.servicio}</td><td>${coti.detalle}</td><td>${coti.precio}</td>`;
    lista.append(tr);
    localStorage.setItem("cotizacón", JSON.stringify(cotizacion))
  }
  /* } */
}
})
 
// Con el listener "change" escucha cada vez que se cambia el depslegable, y el selected devuelve el indice selecionado

let seleccion = select1.addEventListener("change", () => {    

    switch (select1.selectedIndex){
     case 0 :
        return select2.innerHTML = `<option >${dfhours}</option><option >2 Horas</option> <option >4 Horas</option> <option >6 Horas</option>`;
     
     case 1 :
        return select2.innerHTML = `<option >${dfspeakers}</option><option >1 Parlante</option> <option >2 Parlantes</option> <option >3 Parlantes</option>`;
    
     case 2 :
        return select2.innerHTML = `<option >${dflights}</option><option >Luces básicas</option> <option >Set profesional</option> `;
     
     case 3 :
        return select2.innerHTML = `<option selected>${df}</option>`;
               
// Esto retorna un contenido del segundo desplegable en base a la elecciòn del primero
    }
})
