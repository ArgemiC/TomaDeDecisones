class Atributos{
    constructor(tipo,palabraOK,palabraKO){
        this.tipo = tipo; /* "2PALABRAS": Barato/Caro 
		                     "PREFIJOCON": Con paisajes/Sin paisajes 
							 "PREFIJOMAS": Mas duradero/menos duradero 
							 "PREFIJOMEJOR": Mejor diseño/peor diseño 
							 "PREFIJOCONMAS": Con mas seguridad/con menos seguridad */
        this.palabraOK = palabraOK;
        this.palabraKO = palabraKO;
        this.puntuacion = 0; /* Veces que sale como bueno - veces que sale como malo 
		                        Positivo OK, negativo KO */
    }
    enPositivo(){
        if (this.tipo == "2PALABRAS") return(this.palabraOK);
        else if (this.tipo == "PREFIJOCON") return("con "+ this.palabraOK);
		else if (this.tipo == "PREFIJOMAS") return("mas "+ this.palabraOK);
		else if (this.tipo == "PREFIJOMEJOR") return("con mejor "+ this.palabraOK);
        else if (this.tipo == "PREFIJOCONMAS") return("con más "+ this.palabraOK);
    }
    enNegativo(){
        if (this.tipo == "2PALABRAS") return(this.palabraKO);
        else if (this.tipo == "PREFIJOCON") return("sin "+ this.palabraOK);
		else if (this.tipo == "PREFIJOMAS") return("menos "+ this.palabraOK);
		else if (this.tipo == "PREFIJOMEJOR") return("con peor "+ this.palabraOK);
        else if (this.tipo == "PREFIJOCONMAS") return("con menos "+ this.palabraOK);
    }
}

class ParejasAtributos{
    constructor(){
        this.listaParejas = [];
        this.listaAtributos = [];
    }
    anyadirParejasAtributos(atributoOK,atributoKO){
        this.listaParejas.push([atributoOK, atributoKO]);
    }
    puntuarAtributos(){
		this.listaAtributos = [];
        // Primero obtenemos los atributos diferentes que tenemos
        for (let parejaatributo of this.listaParejas){
			/*
            document.write("<br>Bucle parejas0: " + parejaatributo[0].palabraOK);
            document.write("<br>Bucle parejas1: " + parejaatributo[1].palabraOK);
			*/
            this.listaAtributos.push(parejaatributo[0]);
            this.listaAtributos.push(parejaatributo[1]);
        }
        document.write("<br>Numatributos:" + this.listaAtributos.length);
        // Eliminamos duplicados
        this.listaAtributos = this.listaAtributos.filter((item,index)=>{
            return this.listaAtributos.indexOf(item) === index;
          })
        document.write("<br>Numatributos:" + this.listaAtributos.length);
        // Los ponemos a 0 (seguro que soy idiota)
        for (let atributo of this.listaAtributos){
			atributo.puntuacion=0;
		}
        // Ahora simplemente puntuamos atributos
        for (let atributo of this.listaAtributos){
            for (let parejaatributo of this.listaParejas){
                if( parejaatributo[0] == atributo ) atributo.puntuacion ++;
                if( parejaatributo[1] == atributo ) atributo.puntuacion --;
            }
        }
    }
    verPuntos(){
        document.write("<br> Puntuación de atributos <br>");
        for (let atributo of this.listaAtributos){
            document.write(`<br>${atributo.palabraOK} ${atributo.puntuacion}`);
        }
    }
}

/* VIAJE */
class Cosas{
    constructor(nombre,opcion1,opcion2){
        this.nombre = nombre; /* VIAJE */
        this.opcion1 = opcion1; /* NY */
        this.opcion2 = opcion2; /* CUBA */
        this.listaAtributos = [];
        this.pesoAtributos = [];
        this.numAtributos = 0;
        this.parejasAtributos = new ParejasAtributos();
    }
    addAtributo(atributo){
        this.listaAtributos[this.numAtributos]=atributo;
        this.pesoAtributos[this.numAtributos]=0;
        this.numAtributos++;
    }
	asignarAtributoPeso(atributo, valor) {
        let indice = this.listaAtributos.indexOf(atributo);
        this.pesoAtributos[indice] = valor;
    }
    preguntarPeso(atributo){
        let indice = this.listaAtributos.indexOf(atributo);
        let unnumero = parseInt(prompt(`¿cual es el nivel de ${atributo.palabraOK} entre ${this.opcion1} y ${this.opcion2} (-2 a 2):`));
        document.write("<br>Numero leido:" + unnumero);
        if (isNaN(unnumero)) {
            console.log("El valor ingresado no es un número entero, por favor ingrese un número entero válido.");
          }
        this.pesoAtributos[indice]=unnumero;
    }
    priorizarAtributos(atributoOK,atributoKO){
        document.write("<br>Resultado pregunta:" + atributoOK.palabraOK + "/" + atributoKO.palabraOK);
        this.parejasAtributos.anyadirParejasAtributos(atributoOK,atributoKO);
    }
    verpeso(){
        document.write("<br> Atributos:" + this.numAtributos + "<br>");
        for (let atributo of this.listaAtributos){
            document.write(" Palabras:" + atributo.palabraOK + "/" + atributo.palabraKO);
        }
        for (let unpeso of this.pesoAtributos){
           document.write(" Peso:" + unpeso);
        }
    }
    hacerPregunta(atributo1, atributo2){
        let respuesta=confirm(`¿Aceptas un ${this.nombre} ${atributo1.enPositivo()} pero ${atributo2.enNegativo()}?`);
        return(respuesta);
    }
    decision(){
		let peso_normalizado1;
		let peso_normalizado2;
        let importancia1 = 0;
        let importancia2 = 0;
		let puntuacion_normalizada;
		// puntuacion es      -4, -3, -2, -1, 0, 1, 2, 3, 4, 
		//     lo paso a      1/5 1/4 1/3 1/2 1  2  3  4  5  
		// pesoAtributos va de [-2    -1     0    1     2], 
		//     lo paso a      100/0 75/25 50/50 25/75 0/100 
		for (let atributo of this.parejasAtributos.listaAtributos){
			if (atributo.puntuacion >= 0){
				puntuacion_normalizada=atributo.puntuacion+1;
			}
			else{
				puntuacion_normalizada=1/(atributo.puntuacion*-1+1);
			}
			let indice = this.listaAtributos.indexOf(atributo);
			// Ya lo haré con fórmulas
			switch (this.pesoAtributos[indice]){
				case -2:
				 peso_normalizado1=100;
				 peso_normalizado2=0;
				 break;
				case -1:
				 peso_normalizado1=75;
				 peso_normalizado2=25;
				 break;
				case 0:
				 peso_normalizado1=50;
				 peso_normalizado2=50;
				 break;
				case 1:
				 peso_normalizado1=25;
				 peso_normalizado2=75;
				 break;
				case 2:
				 peso_normalizado1=0;
				 peso_normalizado2=100;
				 break;
			}
			importancia1 = importancia1 + peso_normalizado1 * puntuacion_normalizada;
			importancia2 = importancia2 + peso_normalizado2 * puntuacion_normalizada;
			document.write(
				"<br> Atributo:Puntuacion1/Puntuacion2" +
				atributo.palabraOK +
				":" +
				"[" + peso_normalizado1 + "*" + puntuacion_normalizada + "=" + peso_normalizado1 * puntuacion_normalizada +
				"/" +
				"[" + peso_normalizado2 + "*" + puntuacion_normalizada + "=" + peso_normalizado2 * puntuacion_normalizada 
			);
		}
        document.write("<br> Importancia1:" + importancia1);
        document.write("<br> Importancia2:" + importancia2);
		if (importancia1 > importancia2)
			document.write("<br> Tu " + this.nombre + " será " + this.opcion1 );
		else if (importancia2 == importancia1)
			document.write("<br> Tu " + this.nombre + " no está decidido ");
		else
			document.write("<br> Tu " + this.nombre + " será " + this.opcion2 );
		return [importancia1 , importancia2];
    }
}
// Creamos algunos atributos
barato = new Atributos("2PALABRAS","barato","caro");
seguridad = new Atributos("PREFIJOCONMAS","seguridad",null);
paisajes = new Atributos("PREFIJOCON","bonitos paisajes",null);

function crearControlesDeslizantes() {
    const contenedor = document.getElementById("atributos");

    for (let atributo of viaje.listaAtributos) {
        const div = document.createElement("div");
        const label = document.createElement("label");
        label.innerHTML = `Nivel de ${atributo.palabraOK} entre ${viaje.opcion1} y ${viaje.opcion2}: `;
        div.appendChild(label);

        const input = document.createElement("input");
        input.type = "range";
        input.min = "-2";
        input.max = "2";
        input.step = "1";
        input.value = "0";
        input.setAttribute("data-atributo", atributo.palabraOK);
        div.appendChild(input);

        // Crear un elemento span para mostrar el valor seleccionado
        const span = document.createElement("span");
        span.innerHTML = ` [50%/50%]`; // Inicializar el contenido del span con el valor actual del input
        div.appendChild(span);

        // Agregar un event listener al input para actualizar el contenido del span cuando cambie el valor
        input.addEventListener("input", (event) => {
            const valor = parseInt(event.target.value);
            viaje.asignarAtributoPeso(atributo, valor);
			let peso_normalizado1;
			let peso_normalizado2;
			switch (valor){
				case -2:
				 peso_normalizado1=100;
				 peso_normalizado2=0;
				 break;
				case -1:
				 peso_normalizado1=75;
				 peso_normalizado2=25;
				 break;
				case 0:
				 peso_normalizado1=50;
				 peso_normalizado2=50;
				 break;
				case 1:
				 peso_normalizado1=25;
				 peso_normalizado2=75;
				 break;
				case 2:
				 peso_normalizado1=0;
				 peso_normalizado2=100;
				 break;
			}
            span.innerHTML = ` [${peso_normalizado1}%/${peso_normalizado2}%]`; // Actualizar el contenido del span con el nuevo valor
        });

        contenedor.appendChild(div);
    }
}
// Vamos a decidir sobre dos viajes
viaje = new Cosas("Viaje","NY","Filipinas");
viaje.addAtributo(barato);
viaje.addAtributo(paisajes);
viaje.addAtributo(seguridad);

function initSpeedometer() {
  const canvas = document.getElementById('speedometer');
  const ctx = canvas.getContext('2d');

  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const minSpeed = -100; // Velocidad mínima en el indicador (negativa)
  const maxSpeed = 100; // Velocidad máxima en el indicador (positiva)
  const radius = Math.min(centerX, centerY) - 10;

  function drawIndicator(speed) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar el semicírculo del indicador
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI, false);
    ctx.stroke();

    // Asegurar que la velocidad esté en el rango permitido
    speed = Math.max(minSpeed, Math.min(maxSpeed, speed));

    // Calcular la posición de la flecha en función de la velocidad proporcionada
    const angle = (1 - (speed - minSpeed) / (maxSpeed - minSpeed)) * Math.PI;
    const arrowLength = radius * 0.9;
    const arrowX = centerX + arrowLength * Math.cos(angle);
    const arrowY = centerY - arrowLength * Math.sin(angle);

    // Dibujar la flecha
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(arrowX, arrowY);
    ctx.stroke();
  }

const initialSpeed = 0;
drawIndicator(initialSpeed);
return drawIndicator;

}

document.addEventListener('DOMContentLoaded', function() {
 updateIndicator = initSpeedometer();
});

document.addEventListener('DOMContentLoaded', function() {
    crearControlesDeslizantes();
});

function iniciarPreguntas() {
// EMPEZAMOS

// Decidimos que atributo pesa mas en cada cosa
/*
viaje.preguntarPeso(barato);
viaje.preguntarPeso(paisajes);
viaje.preguntarPeso(seguridad);
*/

viaje.verpeso();
// Hay que preguntar atributos por parejas
// Primero creamos una lista de parejas de atributos tomados de 2 en 2
// Definimos la matriz
let listaparejas_ini = [];
for(let i=0; i < 2; i++){
    listaparejas_ini[i] = [];
}
// Creamos una copia de la lista de atributos
nuevalista=viaje.listaAtributos.slice();
// Ahora desordenamos esa nueva lista de atributos
nuevalista.sort(() => Math.random() - 0.5);
// Y hacemos todas las parejas posibles: A,B A,C A,D B,C B,D C,D y se acabó
let numpa = 0;
for(let i=0; i < nuevalista.length; i++){
    for(let j=i+1; j < nuevalista.length; j++){
        listaparejas_ini[0][numpa]=nuevalista[i];
        listaparejas_ini[1][numpa]=nuevalista[j];
        numpa++;
    }
}

for(let i=0; i < numpa; i++){
    document.write("<br> Orden inicial:" + listaparejas_ini[0][i].palabraOK + "/" + listaparejas_ini[1][i].palabraOK);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Creamos una lista de índices para desordenarlos
let indices = Array.from({ length: numpa }, (_, i) => i);
indices = shuffleArray(indices);

// Desordenamos la matriz listaparejas utilizando los índices desordenados
let listaparejas = [[], []];
for (let i = 0; i < numpa; i++) {
    listaparejas[0][i] = listaparejas_ini[0][indices[i]];
    listaparejas[1][i] = listaparejas_ini[1][indices[i]];
}

// La matriz shuffledListaparejas contiene las parejas desordenadas
console.log(listaparejas);

for(let i=0; i < numpa; i++){
    document.write("<br> Orden final:" + listaparejas[0][i].palabraOK + "/" + listaparejas[1][i].palabraOK);
}
// Primero, para que todos los atributos empiecen con un 0 se priorizan contra ellos mismos
viaje.priorizarAtributos(barato,barato);
viaje.priorizarAtributos(paisajes,paisajes);
viaje.priorizarAtributos(seguridad,seguridad);
viaje.parejasAtributos.puntuarAtributos();
viaje.parejasAtributos.verPuntos();
const [importancia1, importancia2] = viaje.decision();

let cero;
let uno;
// Hacemos todas las preguntas posibles de todas las parejas, con los atributos en positivo o negativo aleatoriamente
for(let i=0; i < numpa; i++){
	// Para saber si lo hacemos en positivo o en negativo DE MOMETO NO LO HAGO
    if (Math.random() < 0.5){
        cero=0;
        uno=1;
    }
    else{
        cero=1;
        uno=0;
    }
    if (viaje.hacerPregunta(listaparejas[cero][i],listaparejas[uno][i]))
		// si la respuesta ha sido positiva el atributo cero va en OK y el uno en KO
        viaje.priorizarAtributos(listaparejas[cero][i],listaparejas[uno][i]);
    else    
		// si la respuesta ha sido negativa el atributo uno va en OK y el cero en KO
        viaje.priorizarAtributos(listaparejas[uno][i],listaparejas[cero][i]);
    viaje.verpeso();
    viaje.parejasAtributos.puntuarAtributos();
    viaje.parejasAtributos.verPuntos();
    const [importancia1, importancia2] = viaje.decision();
	speed=100*((importancia2-importancia1)/(importancia2+importancia1));
	// 12  346 -->   3%  97% =   93% --> 93 
	// 346   0 --> 100%   0% = -100% --> -100 
	// 146 146 -->  50%  50% =    0% --> 0
	document.write("<br> Velocidad:" + speed);
	updateIndicator(speed);
}
// ANDROID STUDIO
}