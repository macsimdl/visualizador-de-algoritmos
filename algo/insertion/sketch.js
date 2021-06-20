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
var principio = true;
var inicial = true;
var seteado = false;
var mayor = true;
var m = 1;
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
	mayor = true;
	m = 1;
	n = 0;
	inicial = true;
	principio = true;
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
	var m = 1;
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
	mayor = true;
	m = 1;
	n = 0;
	inicial = true;
	principio = true;
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
		m = 1;
		n = 0;
		inicial = true;
		principio = true;
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
		if(mayor){
			console.log("asd1");
			if(inicial){
				if(m==1){
					ejecIni(values[m].num, values[m-1].num);
				}
				else{
					ejecCompara(values[m].num, values[m-1].num);
				}
				n=m;
				inicial = false;
				values[n].col = color(0,255,0);
				
			}
			else{
				if(n>0){
					console.log("asd2");
					var a = values[n].num;
					var b = values[n-1].num;
					var c = values[n].col;
					var d = values[n-1].col;
					if(b>a){
						values[n].num=b;
						values[n-1].num=a;
						values[n].col=d;
						values[n-1].col=c;
						n--;
						console.log("asd3");
						ejecMay(values[n+1].num, values[n].num);
					}

					else{
						console.log("asd4");
						mayor=false;
						values[n].col = color(150,255,150);
						ejecMen(values[n].num, values[n-1].num);
					}
					if(principio){
						if(b>a){
							console.log("asd5");
							values[m].col = color(150,255,150);
							ejecIniMay(values[m].num<values[m-1].num);
						}
						else{
							console.log("asd6");
							values[m-1].col = color(150,255,150);
							ejecIniMay(values[m].num>values[m-1].num);
						}
						
						principio = false;
					}


				}
				else{
					console.log("asd7");
					values[n].col = color(150,255,150);
					mayor=false;
					inicial=true;
					ejecElemFinal(values[n].num)
					
				}

			}
		}
		else{
			console.log("asd8");
			m++;
			mayor=true;
			inicial=true;
			if(m!=values.length){
				ejecIgual(values[m].num);
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
			}
			contador=0;
		}
	}

}

function drawbotones(){

	strokeWeight(2);
	stroke(50,30,100);
	if(ejecutado){
		fill(100,200,100);
	}
	else{
		fill(255,255,255);
	}
	rect(xBoton, yBoton, anchoBoton, altoBoton);
	noStroke();
	fill(0,0,0);
	textFont('Arial', 12);
	textAlign(CENTER);
	if(ejecutado == false){
		text("Start", xBoton+(anchoBoton/2), yBoton+(altoBoton/2)+5);
	}
	else{
		text("Pause", xBoton+(anchoBoton/2), yBoton+(altoBoton/2)+5);
	}

	//boton paso a paso
	strokeWeight(2);
	stroke(50,30,100);
	if(ejecutado){
		fill(190,190,190);
	}
	else{
		fill(255,255,255);
	}
	rect(xBoton+separacionBoton + anchoBoton, yBoton, anchoBoton + 20, altoBoton);
	noStroke();
	if(ejecutado){
		fill(100,100,100);
	}
	else{
		fill(0,0,0);
	}
	textFont('Arial', 12);
	textAlign(CENTER);
	text("Paso a paso", xBoton+anchoBoton+((anchoBoton+20)/2)+separacionBoton, yBoton+(altoBoton/2)+5);

	//boton analisis
	strokeWeight(2);
	stroke(50,30,100);
	fill(255,255,255);
	rect(xBoton + separacionBoton + anchoBoton + anchoBoton + 20 + separacionBoton, yBoton, anchoBoton + 20, altoBoton);
	noStroke();
	fill(0,0,0);
	textFont('Arial', 12);
	textAlign(CENTER);
	text("Análisis", xBoton+anchoBoton+((anchoBoton+20)/2)+separacionBoton + separacionBoton + anchoBoton+20, yBoton+(altoBoton/2)+5);


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

function mouseClicked(){

	if(mouseX > xBoton && mouseY > yBoton && mouseX < (xBoton+anchoBoton) && mouseY < yBoton+altoBoton){
		if(ejecutado){
			ejecutado = false;
		}
		else{
			ejecutado = true;
		}
	}
	else if(mouseX > xBoton+separacionBoton+anchoBoton && mouseY > yBoton && mouseX < xBoton+separacionBoton+2*anchoBoton+20 && mouseY < yBoton+altoBoton){
		if(!ejecutado){
			contador = 0;
			actualizaValores();
		}
	}
	else if(mouseX > xBoton+2*separacionBoton+2*anchoBoton && mouseY > yBoton && mouseX < xBoton+2*separacionBoton+3*anchoBoton+2*20 && mouseY < yBoton+altoBoton){
		location.href = "pasoapaso/bubblepasoapaso.html";
	}

}

function drawtext() {

	textFont('Verdana', 20);
	textAlign(LEFT);
	textStyle(NORMAL);
	fill(0,0,255);
	texto = 'función ';
	textowidth = textWidth(texto);
	text(texto, xCodigo, yCodigo);
	fill(150,70,255);
	texto = 'Bubble Sort ';
	text(texto, xCodigo+textowidth, yCodigo);
	texto = 'función Bubble Sort'
	textowidth = textWidth(texto);
	fill(0);
	text("(lista)", xCodigo+textowidth, yCodigo);
	fill(0,0,255);
	text("for ", xCodigo+20, yCodigo+50);
	texto = 'for ';
	textowidth = textWidth(texto);
	fill(0);
	text("elementos ", xCodigo+20+textowidth, yCodigo+50);
	texto = 'for elementos ';
	textowidth = textWidth(texto);
	fill(0,0,255);
	text("in ", xCodigo+20+textowidth, yCodigo+50);
	fill(0);
	texto = 'for elementos in ';
	textowidth = textWidth(texto);
	text("lista", xCodigo+40+textowidth, yCodigo+50);
	fill(0,0,255);
	text("if ", xCodigo+40, yCodigo+80);
	texto = 'if ';
	textowidth = textWidth(texto);
	fill(0);
	text("lista[i] > lista[i+1]:", xCodigo+40+textowidth, yCodigo+80);
	text("intercambiar( lista[i], lista[i+1] )", xCodigo+60, yCodigo+110);
	fill(0,0,255);
	text("end if", xCodigo+40, yCodigo+140);
	text("end for", xCodigo+20, yCodigo+170);
	text("end Bubble Sort", xCodigo, yCodigo+220);

}