//background
const colorbackground = [230,235,255];

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

var fase = 0;
var estados = 0;
var estadosaux = 0;
var ordenado = false;

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
		contador = 0;
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

	pulsado = false;
	posiAux = 0;
	inicio = true;
	fase = 0; 
	oddeven = 0;
	ordenado = false;
	ejecutado = false;
	arrastrando = false;
	primerCiclo = false;
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

	pulsado = false;
	posiAux = 0;
	inicio = true;
	fase = 0; 
	oddeven = 0;
	ordenado = false;
	ejecutado = false;
	arrastrando = false;
	primerCiclo = false;
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
	fase=0;
	estados=0;
	var le = values.length;
	while(le>=2){
		estados++;
		le = le/2;
	}
	estados = estados+estados;
	estadosaux = 0;
	ejecutado=false;
	pulsado = false;
}

function draw() {
	background(colorbackground);


	if(ejecutado){

		//realiza odd-even sort
		actualizaValores();
		
	}

	
	//dibujar los rectangulos
	drawlineas();
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
		if(ejecutado || pulsado){
			if(estadosaux==estados){
				for (var i = 1; i < values.length; i++) {
					var j;
					j = i;
					while (j>0 && values[j-1].num > values[j].num){
						swap(j-1, j);
						--j;
					}
				}
				for (var i = 0; i < values.length; i++) {
					values[i].col = color(150,255,150);
					ordenado = true;
				}
				limpia();
			}
			else{
				estadosaux++;
			}
			pulsado = false;
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
			}
		}
	}
	

}

function drawlineas(){
	if(!ordenado){
		if(estadosaux!=0){
			if(estadosaux>(estados/2)){
				ejec1();
				var est2 = estados - estadosaux;
				est = 2**est2;
				for (var i = 0; i < est; i++) {
					stroke(10);
					line(values[i*(values.length/(2**est2))].posx+anchoRectangulos/2, values[i*(values.length/(2**est2))].posy+25, values[i*(values.length/(2**est2))].posx+anchoRectangulos/2, values[i*(values.length/(2**est2))].posy+40);
					line(values[((i+1)*(values.length/(2**est2)))-1].posx+anchoRectangulos/2, values[((i+1)*(values.length/(2**est2)))-1].posy+25, values[((i+1)*(values.length/(2**est2)))-1].posx+anchoRectangulos/2, values[((i+1)*(values.length/(2**est2)))-1].posy+40);
					line(values[i*(values.length/(2**est2))].posx+anchoRectangulos/2, values[i].posy+40, values[((i+1)*(values.length/(2**est2)))-1].posx+anchoRectangulos/2, values[i].posy+40);
				}
				for (var i = 0; i < est; i++) {
					var auxili = xData + (anchoRectangulos*(values.length/(2**est2)))+(separacionRectangulos*(values.length/(2**est2))) - separacionRectangulos;
					posiAux = xData + i*(auxili-xData) +(auxili-xData)/2 + i*separacionRectangulos;
					var subrect = (values.length/(2**est2));
					posiAux = posiAux - ((subrect/2)*anchoSubRectangulos);
					var valuesAux = [];
					for (var j = 0; j < subrect; j++) {
						valuesAux[j] = {num: values[i*(values.length/(2**est2))+j].num, col: values[i*(values.length/(2**est2))+j].col, posx: values[i*(values.length/(2**est2))+j].posx, posy: values[i*(values.length/(2**est2))+j].posy};
					}
					for (var k = 1; k < valuesAux.length; k++) {
						var l;
						l = k;
						while (l>0 && valuesAux[l-1].num > valuesAux[l].num){
							var a = valuesAux[l].num;
							var b = valuesAux[l-1].num;
							var c = valuesAux[l].col;
							var d = valuesAux[l-1].col;
							valuesAux[l].num=b;
							valuesAux[l-1].num=a;
							valuesAux[l].col=d;
							valuesAux[l-1].col=c;
							--l;
						}
					}
					fill(150,255,150);
					noStroke();
					for (var j = 0; j < subrect; j++) {
						quad(posiAux, valuesAux[j].posy+alturaSubRectangulos, posiAux, valuesAux[j].posy+alturaSubRectangulos - (valuesAux[j].num/2), posiAux + anchoSubRectangulos, valuesAux[j].posy+alturaSubRectangulos - (valuesAux[j].num/2), posiAux + anchoSubRectangulos, valuesAux[j].posy+alturaSubRectangulos);
						posiAux = posiAux + separacionSubRectangulos + anchoSubRectangulos;
					}
					
				}
			}
			else{
				ejec2();
				var est = 2**estadosaux;
				for (var i = 0; i < est; i++) {
					stroke(10);
					line(values[i*(values.length/(2**estadosaux))].posx+anchoRectangulos/2, values[i*(values.length/(2**estadosaux))].posy+25, values[i*(values.length/(2**estadosaux))].posx+anchoRectangulos/2, values[i*(values.length/(2**estadosaux))].posy+40);
					line(values[((i+1)*(values.length/(2**estadosaux)))-1].posx+anchoRectangulos/2, values[((i+1)*(values.length/(2**estadosaux)))-1].posy+25, values[((i+1)*(values.length/(2**estadosaux)))-1].posx+anchoRectangulos/2, values[((i+1)*(values.length/(2**estadosaux)))-1].posy+40);
					line(values[i*(values.length/(2**estadosaux))].posx+anchoRectangulos/2, values[i].posy+40, values[((i+1)*(values.length/(2**estadosaux)))-1].posx+anchoRectangulos/2, values[i].posy+40);
				}
				for (var i = 0; i < est; i++) {
					var auxili = xData + (anchoRectangulos*(values.length/(2**estadosaux)))+(separacionRectangulos*(values.length/(2**estadosaux))) - separacionRectangulos;
					posiAux = xData + i*(auxili-xData) +(auxili-xData)/2 + i*separacionRectangulos;
					var subrect = (values.length/(2**estadosaux));
					posiAux = posiAux - ((subrect/2)*anchoSubRectangulos);
					fill(colorRect);
					noStroke();
					for (var j = 0; j < subrect; j++) {
						quad(posiAux, values[i].posy+alturaSubRectangulos, posiAux, values[i].posy+alturaSubRectangulos - (values[i*(values.length/(2**estadosaux))+j].num/2), posiAux + anchoSubRectangulos, values[i*(values.length/(2**estadosaux))+j].posy+alturaSubRectangulos - (values[i*(values.length/(2**estadosaux))+j].num/2), posiAux + anchoSubRectangulos, values[i*(values.length/(2**estadosaux))+j].posy+alturaSubRectangulos);
						posiAux = posiAux + separacionSubRectangulos + anchoSubRectangulos;
					}
					
				}

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
		contador = 0;
		pulsado = true;
		actualizaValores();
		
	}
}

function botonback(){

}

function getEjec(){
	return ejecutado;
}