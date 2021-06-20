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
var valuesStates = [];
var valuesStatesAux = [];

var contador = 0;

var finciclo = false;
var primerIf = true;
var primerIf2 = false;
var inicial = true;
var seteado = false;
var mayor = false;
var m = 0;
var n = 0;

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
		contador = 1;
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
	mayor = false;
	m = 0;
	n = 0;
	inicial = true;
	primerIf = true;
	primerIf2 = false;
	finciclo = false;
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
	var mayor = false;
	var m = 0;
	var n = 0;
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
	mayor = false;
	m = 0;
	n = 0;
	inicial = true;
	primerIf = true;
	primerIf2 = false;
	finciclo = false;
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
		}		var l = 0;
		while(l<=posi){
			console.log("asdasd123666");
			values[l].col = color(colorRect);
			values[l].ord = false;
			++l;
		}
		seteado=false;
		inicial = true;
		console.log("asdasd123");
		console.log(posi);
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

	if(contador==0 && seteado==false){
		
		if(finciclo){
			finciclo = false;
			++contador;
			if(inicial){
				ejecFor2(values[n].num);
			}
			else{
				ejecIf(values[n].num, values[n+1].num);
			}
		}
		else{
			values[n].col = color(0,255,0);
			if(!inicial){
				var a = values[n].num;
				var b = values[n+1].num;
				var c = values[n].col;
				var d = values[n+1].col;
				console.log("asd2");
				//swap de un valor por el anterior
				if(a>b){
					if(!primerIf){
						values[n].num=b;
						values[n+1].num=a;
						values[n].col=d;
						values[n+1].col=c;
						mayor = true;
						primerIf = true;
						primerIf2 = false;
						console.log("asd3");
					}
					else{
						primerIf = false;
						primerIf2 = true;
						ejecInter(values[n].num, values[n+1].num);
					}
				}
				else{
					mayor = false;
				}

				if(!primerIf2){
					if(!finciclo){
						if(m < values.length){
							n = n+1;
							if(mayor==false){
								values[n-1].col = color(colorRect);
								values[n].col = color(0,255,0);
							}
							
							ejecFor2(values[n].num);
							if(n>=values.length-m-1){
								values[n].col = color(150,255,150);
								values[n].ord = true;
								n = 0;
								m = m + 1;
								inicial = true;
								contador = -velocidadBucle;
								ejecFor1();
							}
							
						}
						finciclo = true;
					}
				}
				else{
					primerIf2 = false;
				}
				++contador;
			}
			else{
				inicial = false;
				++contador;
				ejecIf(values[n].num, values[n+1].num);
			}
			if(values[n+1].ord == true){
				values[n].col = color(150,255,150);
			}
		}
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

