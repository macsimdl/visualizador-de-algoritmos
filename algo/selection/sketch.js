//background
const colorbackground = [230,230,255];

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
var valuesStates = [];
var valuesStatesAux = [];

var contador = 0;

var minimo = 0;
var continua = true;
var m = 0;
var n = 0;
var inicial = true;

var finciclo = false;
var primerIf = true;
var primerIf2 = false;
var principio = true;
var seteado = false;
var mayor = true;


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
	console.log(list[0]);
	console.log(len);
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
	seteado=false;
	principio = true;
	var mayor = true;
	
	inicial=true;
	minimo = 0;
	continua = true;
	m = 0;
	n = 0;
}

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
	seteado=false;
	principio = true;
	var mayor = true;
	
	inicial=true;
	minimo = 0;
	continua = true;
	m = 0;
	n = 0;
	frameRate(60);
}

function draw() {
	background(colorbackground);

	if(ejecutado){

		//realiza bubble sort
		actualizaValores();
		
	}
	//dibujar los rectangulos
	drawrectangulos();
	//dibuja el código
	if(arrastrando){
		dragAndDrop();
	}

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
	seteado=false;
	principio = true;
	var mayor = true;
	
	inicial=true;
	minimo = 0;
	continua = true;
	m = 0;
	n = 0;
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
		m = 0;
		n = 0;
		console.log(posi);
		console.log(posActual);
		if(posActual>posi){
			posi = posActual;
			console.log(posi);
		}
		else{
			console.log(posi);
		}
		var l = 0;
		while(l<values.length){
			values[l].col = color(colorRect);
			values[l].ord = false;
			++l;
		}
		mayor = true;
		seteado=false;
		principio = true;
		var mayor = true;
		
		inicial=true;
		minimo = 0;
		continua = true;
		m = 0;
		n = 0;
	}

}

function dragAndDrop(){
	
	if(primerCiclo){
		posi = Math.trunc((mouseX-xData)/(anchoRectangulos+separacionRectangulos));
		console.log(values[posi].num);
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
	console.log(mousePosX, mousePosY);
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
		for(var i = 0; i<values.length; i++){
			values[i].col = color(colorRect);
		}
		for (var i = 0; i < n; i++) {
			values[i].col = color(250,115,115);
		}
		for (var i = 0; i < m; i++){
			values[i].col = color(150,215,155);
		}
		values[m].col = color(72,61,139);
		function swap(n,m){
			var a = values[n].num;
			var b = values[m].num;
			var c = values[n].col;
			var d = values[m].col;
			values[n].num=b;
			values[m].num=a;
			values[n].col=d;
			values[m].col=c;
		}

		if(inicial){
			m = 0;
			minimo=m;
			inicial = false;
			n = m+1;
		}
		else{
			if(n<values.length){
				console.log(n);
				ejecCompara(values[n].num, values[minimo].num);
				if(values[n].num < values[minimo].num){
					minimo = n;
					ejecCompara2(values[n].num, values[minimo].num);
				}
				
				n++;
			}
			else{
				if(minimo != m){
					swap(minimo, m)
					ejecColoca(m, values[minimo].num);
				}
				if(m<values.length){

					m++;
					n = m+1;
					minimo=m;
				}
			}
		}

		
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
			if(ordenado && m==values.length){
				seteado=true;
				parar();
				ejecutado = false;
				for(var i = 0; i<values.length; i++){
					values[i].col = color(0,255,0);
				}
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
