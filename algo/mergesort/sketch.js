//background
const colorbackground = [230,235,255];

//data
var numeroRectangulos = 15;
const anchoRectangulos = 50;
const separacionRectangulos = 30;

const colorRect = [180,215,175];

const anchoSubRectangulos = 20;
const separacionSubRectangulos = 15;
const alturaSubRectangulos = 180;

var xData = 25;
const yData = 420;

//codigo
const xCodigo = 700;
const yCodigo = 100;

//boton
const anchoBoton = 100;
const altoBoton = 30;
const separacionBoton = 20;
const xBoton = xData;
const yBoton = 0;

//velocidad programa
var velocidadCiclo = 30;
var velocidadBucle = 30;

//locales
var values = [];
var limites = [];
var lado = []

var contador = 0;

var expandido = false;
var fase = 0;
var estados = 0;
var estadosaux = 0;
var ordenado = false;
var posiAux = 0;
var posiAux2 = 0;
var faseInicial = true;

var numParticiones = 0;
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

function reset(){
	var cont = xData;
	var texto;
	var textowidth;
	for (var i = 0; i < numeroRectangulos; i++) {
		var ran= Math.floor(Math.random() * 256) + 1;
		//añado al array values objetos con atributo numero, color y posicion
		values[i] = { num: ran, col: color(colorRect), ord: false, posx: cont, posy: yData};
		cont += anchoRectangulos+separacionRectangulos;
	}	

	contador = 0;
	for (var i = 0; i < limites.length; i++) {
		limites.pop();
	}
	for (var i = 0; i < lado.length; i++) {
		lado.pop();
	}
	limites[0] = 0;
	limites[1] = Math.floor(values.length/2) - 1;
	if(values.length > 1){
		limites[2] = Math.floor(values.length/2);
		limites[3] = values.length - 1;
	}
	lado[0] = 1;
	expandido = false;
	posiAux = 0;
	posiAux2 = 0;
	faseInicial = true;
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
	contador = 0;
	for (var i = 0; i < limites.length; i++) {
		limites.pop();
	}
	for (var i = 0; i < lado.length; i++) {
		lado.pop();
	}
	limites[0] = 0;
	limites[1] = Math.floor(values.length/2) - 1;
	if(values.length > 1){
		limites[2] = Math.floor(values.length/2);
		limites[3] = values.length - 1;
	}
	lado[0] = 1;
	expandido = false;
	posiAux = 0;
	posiAux2 = 0;
	faseInicial = true;
}

function setup() {
	createCanvas(1400, 800);
	var cuenta = (numeroRectangulos*anchoRectangulos + separacionRectangulos*(numeroRectangulos-1))/2;
	xData = (1400/2)-cuenta;
	var cont = xData;
	var texto;
	var textowidth;
	for (var i = 0; i < numeroRectangulos; i++) {
		var ran= Math.floor(Math.random() * 256) + 1;
		//añado al array values objetos con atributo numero, color y posicion
		values[i] = { num: ran, col: color(colorRect), posx: cont, posy: yData};
		cont += anchoRectangulos+separacionRectangulos;
	}	
	frameRate(30);
	limites[0] = 0;
	limites[1] = Math.floor(values.length/2) - 1;
	if(values.length > 1){
		limites[2] = Math.floor(values.length/2);
		limites[3] = values.length - 1;
	}
	lado[0] = 1;
	expandido = false;
	posiAux = 0;
	posiAux2 = 0;
	faseInicial = true;
}

function draw() {
	background(colorbackground);


	if(ejecutado){

		//realiza odd-even sort
		actualizaValores();
		
	}

	
	//dibujar los rectangulos
	drawcolores();
	drawrectangulos();

	//dibuja el código


	if(arrastrando){
		dragAndDrop();
	}

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
		for (var i = 0; i < values.length; i++) {
			values[i].col = color(colorRect);
		}
		for (var i = 0; i < limites.length; i++) {
			limites.pop();
		}
		for (var i = 0; i < lado.length; i++) {
			lado.pop();
		}
		limites[0] = 0;
		limites[1] = Math.floor(values.length/2) - 1;
		if(values.length > 1){
			limites[2] = Math.floor(values.length/2);
			limites[3] = values.length - 1;
		}
		lado[0] = 1;
		expandido = false;
		posiAux = 0;
		posiAux2 = 0;
		faseInicial = true;
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

	if(contador==0){
		if(faseInicial){
			faseInicial = false;
		}
		else{
			if(lado.length > 0){
				if(lado[lado.length-1] == 1){
					if(!expandido){
						posiAux = limites[limites.length-4];
						posiAux2 = limites[limites.length-3];
						var calc = posiAux2 + 1 - posiAux;
						if(calc>2){
							limites[limites.length] = posiAux;
							limites[limites.length] = Math.floor(calc/2)-1 + posiAux;
							limites[limites.length] = limites[limites.length-1] + 1;
							limites[limites.length] = posiAux2;
							lado[lado.length] = 1;
							listaiz();
						}
						else{
							if(values[limites[limites.length-4]].num > values[limites[limites.length-3]].num){
								swap(limites[limites.length-4], limites[limites.length-3]);
							}
							lado[lado.length-1] = 0;
							expandido = true;
							if(calc==1){
								ejecmergeuno();
							}
							else{
								ejecmergedos();	
							}
						}

					}
					else{
						lado[lado.length-1] = 0;
						expandido = false;
					}

				}
				else if(lado[lado.length-1] == 0){
					if(expandido){
						if(values[limites[limites.length-2]].num > values[limites[limites.length-1]].num){
							swap(limites[limites.length-2], limites[limites.length-1]);
						}
						lado[lado.length-1] = -1;
						listader();
					}
					else{
						posiAux = limites[limites.length-2];
						posiAux2 = limites[limites.length-1];
						var calc = posiAux2 + 1 - posiAux;
						if(calc>2){
							limites[limites.length] = posiAux;
							limites[limites.length] = Math.floor(calc/2)-1 + posiAux;
							limites[limites.length] = limites[limites.length-1] + 1;
							limites[limites.length] = posiAux2;
							lado[lado.length] = 1;
						}
						else{
							if(values[limites[limites.length-4]].num > values[limites[limites.length-3]].num){
								swap(limites[limites.length-4], limites[limites.length-3]);
							}
							lado[lado.length-1] = -1;
						}
					}

				}
				else{
					posiAux = limites[limites.length-4];
					posiAux2 = limites[limites.length-1];
					var calc = posiAux2 + 1 - posiAux;
					calc = calc + posiAux;
					for (var i = posiAux+1; i < calc; i++) {
						var j;
						j = i;
						while (j>posiAux && values[j-1].num > values[j].num){
							swap(j-1, j);
							--j;
						}
					}
					lado.pop();
					limites.pop();
					limites.pop();
					limites.pop();
					limites.pop();
				}
			}
				
		}
		++contador;
	}
	else{
		++contador;
		if(contador==velocidadCiclo){
			contador=0;
			ordenado = true;
			for (var i = 0; i < values.length-1; i++) {
				if(values[i].num>values[i+1].num){
					ordenado = false;
				}
			}
			if(ordenado){
				fase = 0;
				ejecutado = false;
				for (var i = 0; i < values.length; i++) {
					values[i].col = color(150,255,150);
				}
			}
		}
	}
	

}


function drawcolores(){
	if(limites.length > 0 && !faseInicial){
		fill(255,218,185);
		noStroke();
		if(lado[lado.length-1]==0){
			quad(values[limites[limites.length-2]].posx - separacionRectangulos/2, values[limites[limites.length-2]].posy + separacionRectangulos/2, values[limites[limites.length-2]].posx - separacionRectangulos/2, values[limites[limites.length-2]].posy - 256 , values[limites[limites.length-1]].posx + separacionRectangulos/2 + anchoRectangulos, values[limites[limites.length-1]].posy - 256 ,values[limites[limites.length-1]].posx + separacionRectangulos/2 + anchoRectangulos, values[limites[limites.length-1]].posy + separacionRectangulos/2)

		}
		else if(lado[lado.length-1] == 1){
			quad(values[limites[limites.length-4]].posx - separacionRectangulos/2, values[limites[limites.length-4]].posy + separacionRectangulos/2, values[limites[limites.length-4]].posx - separacionRectangulos/2, values[limites[limites.length-4]].posy - 256 , values[limites[limites.length-3]].posx + separacionRectangulos/2 + anchoRectangulos, values[limites[limites.length-3]].posy - 256 ,values[limites[limites.length-3]].posx + separacionRectangulos/2 + anchoRectangulos, values[limites[limites.length-3]].posy + separacionRectangulos/2)
		}
		else{
			quad(values[limites[limites.length-4]].posx - separacionRectangulos/2, values[limites[limites.length-4]].posy + separacionRectangulos/2, values[limites[limites.length-4]].posx - separacionRectangulos/2, values[limites[limites.length-4]].posy - 256 , values[limites[limites.length-1]].posx + separacionRectangulos/2 + anchoRectangulos, values[limites[limites.length-1]].posy - 256 ,values[limites[limites.length-1]].posx + separacionRectangulos/2 + anchoRectangulos, values[limites[limites.length-1]].posy + separacionRectangulos/2)
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

function mouseClicked(){

	if(mouseX > xBoton && mouseY > yBoton && mouseX < (xBoton+anchoBoton) && mouseY < yBoton+altoBoton){
		if(!ejecutado){
			ejecutado = true;
			contador == 0;
			++fase;
			if(fase == 3){
				fase = 0;
			}
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
		pulsado = true;
		contador = 0;
		++fase;
		if(fase==3){
			fase=0;
		}
		actualizaValores();
		
	}
}

function botonback(){

}

function getEjec(){
	return ejecutado;
}