//background
const colorbackground = [230,235,255];

//data
var numeroRectangulos = 8;
const anchoRectangulos = 50;
const separacionRectangulos = 30;

const colorRect = [180,215,175];

const anchoSubRectangulos = 10;
const separacionSubRectangulos = 6;
const alturaSubRectangulos = 170;

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

var pulsado = false;
var posiAux = 0;
var inicio = true;
var fase = 0; //fase 0=valores, 1=subvalores desordenados, 2=subvalores ordenados
var oddeven = 0;
var ordenado = false;

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
	console.log(fase);
	console.log(contador);
	if(contador==0){
		if(fase == 0){
			ordenado = true;
			for (var i = 0; i < values.length-1; i++) {
				if(values[i].num>values[i+1].num){
					console.log("asdasd22");
					ordenado = false;
				}
			}
			if(ordenado){
				console.log("asdasd");
				ejecutado = false;
			}
			if(ejecutado || pulsado){
				if(inicio){
					inicio = false;
				}
				else{
					if(oddeven == 0){
						if(numeroRectangulos%2==0){
							for (var i = 0; i < values.length; i = i+2) {
								if(values[i].num>values[i+1].num){
									swap(i,i+1);
								}
							}
						}
						else{
							for (var i = 0; i < values.length-1; i = i+2) {
								if(values[i].num>values[i+1].num){
									swap(i,i+1);
								}
							}
						}
						++oddeven;
					}
					else{
						if(numeroRectangulos%2==0){
							for (var i = 1; i < values.length-1; i = i+2) {
								if(values[i].num>values[i+1].num){
									swap(i,i+1);
								}
							}
						}
						else{
							for (var i = 1; i < values.length; i = i+2) {
								if(values[i].num>values[i+1].num){
									swap(i,i+1);
								}
							}
						}
						oddeven = 0;
					}
				}
				if(pulsado){
					pulsado=false;
				}
			}
			ejecFase0();
		}
		else if(fase == 1){
			ejecFase1(oddeven);
		}
		else{
			ejecFase2(oddeven);
		}
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
			ejecAcaba();
		}
		++contador;
		
	}
	else{
		++contador;
		if(contador==velocidadCiclo){
			contador=0;
			if(ejecutado){
				++fase;
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
				if(fase == 3){
					fase = 0;
				}
			}
			else{
				if(fase != 0){
					fase = 0;
				}
			}
		}
	}
	

}

function drawlineas(){
	if(fase == 1){
		if(oddeven == 0){
			if(numeroRectangulos%2==0){
				for (var i = 0; i < values.length; i++) {
					stroke(126);
					line(values[i].posx+anchoRectangulos/2, values[i].posy+25, values[i].posx+anchoRectangulos/2, values[i].posy+40);
					if(i%2 == 0){
						line(values[i].posx+anchoRectangulos/2, values[i].posy+40, (values[i].posx+anchoRectangulos/2)+anchoRectangulos+separacionRectangulos, values[i].posy+40);
						posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
						fill(values[i].col)
						noStroke();
						quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
						fill(values[i+1].col)
						quad(posiAux+(separacionSubRectangulos), values[i+1].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i+1].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i+1].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
					}
				}
			}
			else{
				for (var i = 0; i < values.length-1; i++) {
					stroke(126);
					line(values[i].posx+anchoRectangulos/2, values[i].posy+25, values[i].posx+anchoRectangulos/2, values[i].posy+40);
					if(i%2 == 0){
						line(values[i].posx+anchoRectangulos/2, values[i].posy+40, (values[i].posx+anchoRectangulos/2)+anchoRectangulos+separacionRectangulos, values[i].posy+40);
						posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
						fill(values[i].col)
						noStroke();
						quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
						fill(values[i+1].col)
						quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
					}
				}
			}
		}
		else{
			if(numeroRectangulos%2==0){
				for (var i = 1; i < values.length-1; i++) {
					stroke(126);
					line(values[i].posx+anchoRectangulos/2, values[i].posy+25, values[i].posx+anchoRectangulos/2, values[i].posy+40);
					if(i%2 == 1){
						line(values[i].posx+anchoRectangulos/2, values[i].posy+40, (values[i].posx+anchoRectangulos/2)+anchoRectangulos+separacionRectangulos, values[i].posy+40);
						posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
						fill(values[i].col)
						noStroke();
						quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
						fill(values[i+1].col)
						quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
					}
				}
			}
			else{
				for (var i = 1; i < values.length; i++) {
					stroke(126);
					line(values[i].posx+anchoRectangulos/2, values[i].posy+25, values[i].posx+anchoRectangulos/2, values[i].posy+40);
					if(i%2 == 1){
						line(values[i].posx+anchoRectangulos/2, values[i].posy+40, (values[i].posx+anchoRectangulos/2)+anchoRectangulos+separacionRectangulos, values[i].posy+40);
						posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
						fill(values[i].col)
						noStroke();
						quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
						fill(values[i+1].col)
						quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i+1].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
					}
				}
			}
		}
	}
	else if(fase == 2){
		if(oddeven == 0){
			if(numeroRectangulos%2==0){
				for (var i = 0; i < values.length; i++) {
					stroke(126);
					line(values[i].posx+anchoRectangulos/2, values[i].posy+25, values[i].posx+anchoRectangulos/2, values[i].posy+40);
					if(i%2 == 0){
						line(values[i].posx+anchoRectangulos/2, values[i].posy+40, (values[i].posx+anchoRectangulos/2)+anchoRectangulos+separacionRectangulos, values[i].posy+40);
						if(values[i].num > values[i+1].num){
							posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
							fill(values[i+1].col)
							noStroke();
							quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
							fill(values[i].col)
							quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
						}
						else{
							posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
							fill(values[i].col)
							noStroke();
							quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
							fill(values[i+1].col)
							quad(posiAux+(separacionSubRectangulos), values[i+1].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i+1].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i+1].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
					
						}
					}
				}
			}
			else{
				for (var i = 0; i < values.length-1; i++) {
					stroke(126);
					line(values[i].posx+anchoRectangulos/2, values[i].posy+25, values[i].posx+anchoRectangulos/2, values[i].posy+40);
					if(i%2 == 0){
						line(values[i].posx+anchoRectangulos/2, values[i].posy+40, (values[i].posx+anchoRectangulos/2)+anchoRectangulos+separacionRectangulos, values[i].posy+40);
						if(values[i].num > values[i+1].num){
							posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
							fill(values[i+1].col)
							noStroke();
							quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
							fill(values[i].col)
							quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
						}
						else{
							posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
							fill(values[i].col)
							noStroke();
							quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
							fill(values[i+1].col)
							quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
					
						}
					}
				}
			}
		}
		else{
			if(numeroRectangulos%2==0){
				for (var i = 1; i < values.length-1; i++) {
					stroke(126);
					line(values[i].posx+anchoRectangulos/2, values[i].posy+25, values[i].posx+anchoRectangulos/2, values[i].posy+40);
					if(i%2 == 1){
						line(values[i].posx+anchoRectangulos/2, values[i].posy+40, (values[i].posx+anchoRectangulos/2)+anchoRectangulos+separacionRectangulos, values[i].posy+40);
						if(values[i].num > values[i+1].num){
							posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
							fill(values[i+1].col)
							noStroke();
							quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
							fill(values[i].col)
							quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
						}
						else{
							posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
							fill(values[i].col)
							noStroke();
							quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
							fill(values[i+1].col)
							quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
					
						}
					}
				}
			}
			else{
				for (var i = 1; i < values.length; i++) {
					stroke(126);
					line(values[i].posx+anchoRectangulos/2, values[i].posy+25, values[i].posx+anchoRectangulos/2, values[i].posy+40);
					if(i%2 == 1){
						line(values[i].posx+anchoRectangulos/2, values[i].posy+40, (values[i].posx+anchoRectangulos/2)+anchoRectangulos+separacionRectangulos, values[i].posy+40);
						if(values[i].num > values[i+1].num){
							posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
							fill(values[i+1].col)
							noStroke();
							quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
							fill(values[i].col)
							quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
						}
						else{
							posiAux = (values[i].posx+anchoRectangulos+(separacionRectangulos/2));
							fill(values[i].col)
							noStroke();
							quad(posiAux-(anchoSubRectangulos+separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux-(anchoSubRectangulos+separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, (values[i].posy+alturaSubRectangulos) - (values[i].num/2), posiAux-separacionSubRectangulos, values[i].posy+alturaSubRectangulos);
							fill(values[i+1].col)
							quad(posiAux+(separacionSubRectangulos), values[i].posy+alturaSubRectangulos, posiAux+(separacionSubRectangulos), (values[i+1].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), (values[i].posy+alturaSubRectangulos) - (values[i+1].num/2), posiAux+(anchoSubRectangulos + separacionSubRectangulos), values[i].posy+alturaSubRectangulos);
						}
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