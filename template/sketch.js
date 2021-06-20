//Este código usa la libreria p5.js
//Podrás conseguir documentación en su página oficial p5js.org

//background
const colorbackground = [230,235,255];

//data
var numeroRectangulos = 15;
const anchoRectangulos = 40;
const separacionRectangulos = 20;

var xData = 200;
const yData = 500;

const colorRect = [176,224,230];

//codigo
const xCodigo = 500;
const yCodigo = 30;

//boton
const anchoBoton = 80;
const altoBoton = 30;
const separacionBoton = 40;
const xBoton = xData;
const yBoton = 0;

//velocidad programa
var velocidadCiclo = 10;
var velocidadBucle = 10;

//locales
var values = [];

var contador = 0;


var ejecutado = false;
var arrastrando = false;
var primerCiclo = false;
mousePosX = 0;
mousePosY = 0;
var auxCol;
var auxNum;
var posi;
var posActual;
var posiSiguiente;
var auxPosX;
var auxPosY;

function setup() {
	createCanvas(1400, 800);
	var cuenta = (numeroRectangulos*anchoRectangulos + separacionRectangulos*(numeroRectangulos-1))/2;
	xData = (1400/2)-cuenta;
	var cont = xData;
	var texto;
	var textowidth;
	for (var i = 0; i < numeroRectangulos; i++) {
		var ran= Math.floor(Math.random() * 356) + 1;
		//añado al array values objetos con atributo numero, color y posicion
		values[i] = { num: ran, col: color(colorRect), ord: false, posx: cont, posy: yData};
		cont += anchoRectangulos+separacionRectangulos;
	}	
	ejecutado=false;
	frameRate(60);
}

function draw() {
	background(colorbackground);

	if(ejecutado){
		actualizaValores();
	}

	//dibujar los rectangulos
	drawrectangulos();

	if(arrastrando){
		dragAndDrop();
	}

}

function actualizaValores(){

	if(contador==0){
		
		//Código		

		contador++;
	}
	else{
		++contador;
		if(contador==velocidadCiclo){
			var ordenado = true;
			for (var i = 0; i < values.length-1; i++) {
				if(values[i].num>values[i+1].num){
					ordenado = false;
				}
			}
			if(ordenado){
				parar();
				ejecutado = false;
			}
			contador=0;
		}
	}

}

function drawrectangulos(){

	noStroke();
	for(var i=0; i<values.length; i++){
		fill(values[i].col);
		quad(values[i].posx, values[i].posy, values[i].posx, values[i].posy - values[i].num, values[i].posx+anchoRectangulos, values[i].posy - values[i].num, values[i].posx+anchoRectangulos, values[i].posy);
		fill(0);
		textFont('Arial', 20);
		textAlign(CENTER);
		text(values[i].num,values[i].posx+(anchoRectangulos/2),values[i].posy+20);
	}

}

function setVelo(veloci1, veloci2){
		velocidadCiclo = veloci1;
		velocidadBucle = veloci2;
		contador = 0;
}

function crearLista(list, len){
	numeroRectangulos = len;
	var cuenta = (numeroRectangulos*anchoRectangulos + separacionRectangulos*(numeroRectangulos-1))/2;
	xData = (1400/2)-cuenta;
	var cont = xData;
	var cont = xData;
	var texto;
	var textowidth;
	values = [];
	for (var i = 0; i < len; i++) {
		var ran= list[i];
		//añado al array values objetos con atributo numero, color y posicion
		values[i] = { num: ran, col: color(colorRect), ord: false, posx: cont, posy: yData};
		cont += anchoRectangulos+separacionRectangulos;
	}	
	ejecutado=false;
}
function reset(){
	var cont = xData;
	var texto;
	var textowidth;
	for (var i = 0; i < numeroRectangulos; i++) {
		var ran= Math.floor(Math.random() * 356) + 1;
		//añado al array values objetos con atributo numero, color y posicion
		values[i] = { num: ran, col: color(colorRect), ord: false, posx: cont, posy: yData};
		cont += anchoRectangulos+separacionRectangulos;
	}	
	ejecutado=false;

}

function mousePressed(){

	if(!ejecutado){
		for (var i = 0; i < numeroRectangulos; i++) {
			if(mouseX > values[i].posx && mouseY < values[i].posy && mouseX < values[i].posx+anchoRectangulos && mouseY > values[i].posy-200){
				arrastrando = true;
				primerCiclo = true;
			}
		}
	}

}

function mouseReleased(){
	if(arrastrando){
		values[posActual].col = auxCol;
		arrastrando = false;
		if(posActual>posi){
			posi = posActual;
		}
		var l = 0;
		while(l<values.length){
			values[l].col = color(colorRect);
			values[l].ord = false;
			++l;
		}
	}

}

function dragAndDrop(){
	
	if(primerCiclo){
		posi = Math.trunc((mouseX-xData)/(anchoRectangulos+separacionRectangulos));
		auxCol = values[posi].col;
		auxNum = values[posi].num;
		auxPosX = values[posi].posx;
		auxPosY = values[posi].posy;
		mousePosX = mouseX;
		mousePosY = mouseY;
		primerCiclo = false;
		posActual = posi;
		values[posi].col = color(colorbackground);
	}
	posiSiguiente = Math.trunc((mouseX-xData)/(anchoRectangulos+separacionRectangulos));
	if (posActual != posiSiguiente){
		var numA = values[posActual].num;
		var numB = values[posiSiguiente].num;
		var colA = values[posActual].col;
		var colB = values[posiSiguiente].col;
		values[posActual].num = numB;
		values[posiSiguiente].num = numA;
		values[posActual].col = colB;
		values[posiSiguiente].col = colA;
		posActual = posiSiguiente
	}
	
	fill(auxCol);
	strokeWeight(2);
	stroke(50,30,100);
	quad(auxPosX + (mouseX - mousePosX), auxPosY - (mousePosY - mouseY), auxPosX + (mouseX - mousePosX), auxPosY - auxNum - (mousePosY - mouseY), auxPosX+anchoRectangulos + (mouseX - mousePosX), auxPosY - auxNum - (mousePosY - mouseY), auxPosX+anchoRectangulos + (mouseX - mousePosX), auxPosY - (mousePosY - mouseY));

}

function actualizaValores(){

	if(contador==0){
		
		//Código		

		contador++;
	}
	else{
		++contador;
		if(contador==velocidadCiclo){
			var ordenado = true;
			for (var i = 0; i < values.length-1; i++) {
				if(values[i].num>values[i+1].num){
					ordenado = false;
				}
			}
			if(ordenado){
				parar();
				ejecutado = false;
			}
			contador=0;
		}
	}

}


function botonPlay(){
	if(ejecutado){
			ejecutado = false;
		}
		else{
			ejecutado = true;
		}
}

function botonforwd(){
	if(!ejecutado){
		contador = 0;
		actualizaValores();
	}
}

function botonback(){

}

function getEjec(){
	return ejecutado;
}


