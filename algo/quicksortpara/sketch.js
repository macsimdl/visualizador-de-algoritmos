//background
const colorbackground = [230,230,255];

//data
var numeroRectangulos = 16;
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

var contador = 0;

var setpivotes = false;
var pivotes = [];
var numpivotes = 1;
var pivote;
var posPivote;
var ordenado = false;
var seteado = false;
var pulsado = false;

var posiAux = 0;
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
	values = [];
	for (var i = 0; i < numeroRectangulos; i++) {
		var ran= Math.floor(Math.random() * 256) + 1;
		//añado al array values objetos con atributo numero, color y posicion
		values[i] = { num: ran, col: color(colorRect), ord: false, posx: cont, posy: yData};
		cont += anchoRectangulos+separacionRectangulos;
	}	
	valuesaux2 = [];
	valuesaux = [];
	pivotes = [];
	posPivote = Math.floor(Math.random() * numeroRectangulos); 
	pivote = { num: values[posPivote].num, col: color(72,61,139), posx: values[posPivote].posx, posy: values[posPivote].posy};
	pivotes[0] = { num: pivote.num, col: pivote.col, posx: pivote.posx, posy: pivote.posy};
	contador=0;
	ejecutado=false;
	seteado=false;
	pivote.col = color(72,61,139);
	numpivotes = 1;
	setpivotes = false;
	limpia();

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
	valuesaux2 = [];
	valuesaux = [];
	pivotes = [];
	posPivote = Math.floor(Math.random() * numeroRectangulos); 
	pivote = { num: values[posPivote].num, col: color(72,61,139), posx: values[posPivote].posx, posy: values[posPivote].posy};
	pivotes[0] = { num: pivote.num, col: pivote.col, posx: pivote.posx, posy: pivote.posy};
	contador=0;
	ejecutado=false;
	seteado=false;
	pivote.col = color(72,61,139);
	numpivotes = 1;
	setpivotes = false;
	limpia();
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
	frameRate(20);
	posPivote = Math.floor(Math.random() * numeroRectangulos); 
	pivote = { num: values[posPivote].num, col: color(72,61,139), posx: values[posPivote].posx, posy: values[posPivote].posy};
	pivotes[0] = { num: pivote.num, col: pivote.col, posx: pivote.posx, posy: pivote.posy};
	contador=0;
	ejecutado=false;
	seteado=false;
	pivote.col = color(72,61,139);
	numpivotes = 1;
	setpivotes = false;
}

function draw() {
	background(colorbackground);


	if(ejecutado){

		//realiza odd-even sort
		actualizaValores();
		
	}

	
	//dibujar los rectangulos

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
		pivotes = [];
		posPivote = Math.floor(Math.random() * numeroRectangulos); 
		pivote = { num: values[posPivote].num, col: color(72,61,139), posx: values[posPivote].posx, posy: values[posPivote].posy};
		pivotes[0] = { num: pivote.num, col: pivote.col, posx: pivote.posx, posy: pivote.posy};
		contador=0;
		ejecutado=false;
		seteado=false;
		pivote.col = color(72,61,139);
		numpivotes = 1;
		setpivotes = false;
		valuesaux2 = [];
		valuesaux = [];
		for(var i=0; i<values.length; i++){
			values[i].col = color(colorRect);
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

	function swap(n){
		var a = values[n].num;
		var b = pivote.num;
		var c = values[n].col;
		var d = pivote.col;
		values[n].num=b;
		pivote.num=a;
		values[n].col=d;
		pivote.col=c;
	} 
	function swap2(n,m){
		var a = values[n].num;
		var b = valuesaux[m].num;
		var c = values[n].col;
		var d = valuesaux[m].col;
		values[n].num=b;
		valuesaux[m].num=a;
		values[n].col=d;
		valuesaux[m].col=c;
	}
	function swapPivotes(n, m){
		var a = pivotes[n].num;
		var b = pivotes[m].num;
		var c = pivotes[n].col;
		var d = pivotes[m].col;
		pivotes[n].num=b;
		pivotes[m].num=a;
		pivotes[n].col=d;
		pivotes[m].col=c;
	} 

	if(contador==0){
		if(!seteado){
			swap(posPivote);
			seteado = true;
			ejec1();
		}
		else{
			if(!setpivotes){
				ejec2();
				var valuesaux2 = []; //array del que borrar elem
				var valuesaux = [];
				for (var i = 0; i < values.length; i++) {
					valuesaux2[i] = { num: values[i].num, col: values[i].col, posx: values[i].posx, posy: values[i].posy };
				}
				var elem = 0;
				for(var j = 0; j < pivotes.length; j++){
					var numeropiv = pivotes[j].num;
					var k = 0;
					var mayores = 0;
					while (k < valuesaux2.length){
						if(valuesaux2[k].num <= numeropiv && blue(valuesaux2[k].col) == 175){
							valuesaux[elem] = { num: valuesaux2[k].num, col: valuesaux2[k].col, posx: valuesaux2[k].posx, posy: valuesaux2[k].posy };
							valuesaux2.splice(k, 1);
							elem++;
						}
						else{
							if(valuesaux2[k].num == numeropiv){
								mayores = k;
							}
							k++;
							
						}
					}
					
					valuesaux[elem] = { num: valuesaux2[mayores].num, col: valuesaux2[mayores].col, posx: valuesaux2[mayores].posx, posy: valuesaux2[mayores].posy };
					valuesaux2.splice(mayores, 1);
					elem++;
					if(j == pivotes.length - 1){
						for (var i = 0; i < valuesaux2.length; i++) {
							if(valuesaux2[i].num >= numeropiv){
								valuesaux[elem] = { num: valuesaux2[i].num, col: valuesaux2[i].col, posx: valuesaux2[i].posx, posy: valuesaux2[i].posy };
								elem++;
							}
						}
					}
				}
				for (var i = 0; i < values.length; i++) {
					swap2(i,i);
				}
				
				setpivotes = true;
				ordenado = true;
				for (var i = 0; i < values.length-1; i++) {
					if(values[i].num>values[i+1].num){
						ordenado = false;
					}
				}
				if(ordenado){
					for (var i = 0; i < values.length; i++) {
						values[i].col = color(150,255,150);
					}
					if(!pulsado){
						playPause();
						ejecutado = false;
					}
					limpia();
				}
			}
			else{
				ejec3();
				var iterador = 0;
				var lengthpivotes = pivotes.length;
				for(var i = 0; i < lengthpivotes; i++){
					var encontrado = false;
					var subValues = 0;
					while(!encontrado){
						if(blue(values[iterador].col) == 175){
							subValues++;
							iterador++;
						}
						else{
							encontrado = true;
							iterador++;
						}
					}
					if(subValues>1){
						posPivote = Math.floor(Math.random() * subValues);
						numpivotes++;
						pivote = { num: values[iterador - 2 - posPivote].num, col: color(72,61,139), posx: values[iterador - 2 - posPivote].posx, posy: values[iterador - 2 - posPivote].posy};
						pivotes[numpivotes-1] = { num: pivote.num, col: pivote.col, posx: pivote.posx, posy: pivote.posy};
						swap(iterador-2-posPivote);
					}
					if(i == lengthpivotes-1){
						subValues = values.length - iterador;
						if(values.length - iterador > 1){
							posPivote = Math.floor(Math.random() * subValues);
							numpivotes++;
							pivote = { num: values[iterador + posPivote].num, col: color(72,61,139), posx: values[iterador + posPivote].posx, posy: values[iterador + posPivote].posy};
							pivotes[numpivotes-1] = { num: pivote.num, col: pivote.col, posx: pivote.posx, posy: pivote.posy};
							swap(iterador + posPivote);
						}
					}
				}
				console.log("ASD2");
				for (var i = 1; i < pivotes.length; i++) {
					var j;
					j = i;
					while (j>0 && pivotes[j-1].num > pivotes[j].num){
						swapPivotes(j-1, j);
						--j;
					}
				}
				setpivotes = false;
			}
		}
		++contador;
		pulsado = false;
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
				console.log(ejecutado);
				ejecutado = false;
				console.log(ejecutado);
			}
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
		actualizaValores();
		
	}
}

function botonback(){

}

function getEjec(){
	return ejecutado;
}