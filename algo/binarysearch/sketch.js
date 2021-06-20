//background
const colorbackground = [230,230,255];

//data
var numeroCirculos = 9;
const diametro = 50;
const alturaCirculos = 100;

const colorCirculo = [180,215,175];

//velocidad programa
var velocidadCiclo = 60;
var velocidadBucle = 30;

//locales
var values = [];
var caminos = [];
var introduced = false;
var item = 0;
var current = 0;
var text1 = "";
var text2 = "";

var contador = 0;
var ejecutado = false;


function setVelo(veloci1, veloci2){
		velocidadCiclo = veloci1;
		velocidadBucle = veloci2;
		contador = 1;
}

function buscaElem(num1){
	item = num1;
	introduced = true;
	caminos = [];
	current = values[0];
	if(current.num > item){
		ejec2(current.num, item);
	}
	else{
		ejec5(current.num, item);
	}
	text1 = "Buscando: " + num1;
	text2 = "";
	for(var i = 0; i < values.length; ++i){
		values[i].col = color(colorCirculo);
	}
}

function reset(){
	
}


function setup() {
	createCanvas(1400, 800);
	var valor = Math.floor(Math.random() * 250) + 1;
	console.log(valor);
	values[0] = { num: valor, col: color(colorCirculo), posx: 700, posy: 100, padre:-1, iz: -1, der: -1, diam:40+valor/5};
	for (var i = 1; i < numeroCirculos; i++) {
		var colocado = false;
		var desplazamiento = [];
		var nivel = 0;
		var posi = 0;
		valor = Math.floor(Math.random() * 250) + 1;
		console.log(valor);
		while(!colocado){
			if(values[posi].num>valor){
				nivel++;
				desplazamiento[desplazamiento.length] = -1;
				if(values[posi].iz == -1){
					var tama = values.length;
					values[posi].iz = tama;
					var finalpos = 700;
					for(var j = 0; j<desplazamiento.length; j++){
						if(desplazamiento[j]==-1){
							finalpos = finalpos - (1400/Math.pow(2, j+2));
						}
						else{
							finalpos = finalpos + (1400/Math.pow(2, j+2));
						}
					}
					console.log("pos");
					console.log(finalpos);
					console.log(100+(nivel*alturaCirculos));
					values[tama] = { num: valor, col: color(colorCirculo), posx: finalpos, posy: 100+(nivel*alturaCirculos), padre:posi, iz: -1, der: -1, diam:40+valor/5};
					colocado=true;
				}
				else{
					posi = values[posi].iz;
				}
			}
			else{
				nivel++;
				desplazamiento[desplazamiento.length] = 1;
				if(values[posi].der == -1){
					var tama = values.length;
					values[posi].der = tama;
					var finalpos = 700;
					for(var j = 0; j<desplazamiento.length; j++){
						if(desplazamiento[j]==-1){
							finalpos = finalpos - (1400/Math.pow(2, j+2));
						}
						else{
							finalpos = finalpos + (1400/Math.pow(2, j+2));
						}
					}
					console.log("pos");
					console.log(finalpos);
					console.log(100+(nivel*alturaCirculos));
					values[tama] = { num: valor, col: color(colorCirculo), posx: finalpos, posy: 100+(nivel*alturaCirculos), padre:posi, iz: -1, der: -1, diam:40+valor/5};
					colocado=true;
				}
				else{
					posi = values[posi].der
				}
			}
		}
		

	}	

	caminos = [];
	current = { num: values[0].num, col: values[0].col, posx: values[0].posx, posy: values[0].posy, padre: values[0].padre, iz: values[0].iz, der: values[0].der, diam: values[0].diam};
	introduced = false;
	item = 0;
	contador = 0
	ejecutado = false;
	frameRate(60);
	playPause();
}

function draw() {
	background(colorbackground);


	if(ejecutado){

		//realiza odd-even sort
		actualizaValores();
		
	}

	
	//dibujar los rectangulos
	drawlineas();
	if(introduced){
		drawcaminos();
	}

	
	drawcirculos();

}


function actualizaValores(){

	if(contador==0){
		if(introduced){
			if(current.iz != -1 || current.der != -1){
				console.log(current.num);
				console.log(current);
				if(current.num > item){
					if(current.iz == -1){
						introduced = false;
						text2= "No encontrado";
						ejec4(item);
					}
					else{
						if(values[current.iz].num == item){
							values[current.iz].col = color(72,61,139);
							introduced = false;
							text2 = "Encontrado";
							ejec1(current.num, item);
						}
						else{
							caminos[caminos.length]=values[current.iz].padre;
							caminos[caminos.length]=current.iz;
							current = values[current.iz];
							ejec2(current.num, item);
						}
					}
				}
				else{
					console.log("DOOS");
					if(current.der == -1){
						introduced = false;
						text2 = "No encontrado";
						ejec3(item);
					}
					else{

						if(values[current.der].num == item){
							ejec1(values[current.der].num, item);
							values[current.der].col = color(72,61,139);
							introduced = false;
							text2 = "Encontrado";
						}
						else{
							ejec5(current.num, item);
							caminos[caminos.length]=values[current.der].padre;
							caminos[caminos.length]=current.der;
							current = values[current.der];
						}
					}
				}
			}
			else{
				introduced = false;
				text2 = "No encontrado";
			}
		}
		++contador;
	}
	else{
		++contador;
		if(contador==velocidadCiclo){
			contador=0;
	
		}
	}
	

}

function drawlineas(){
	stroke(0);
	for(var i = 0; i<values.length; i++){
		fill(0);
		if(values[i].iz != -1){
			line(values[i].posx, values[i].posy, values[values[i].iz].posx,values[values[i].iz].posy);
		}
		if(values[i].der != -1){
			line(values[i].posx, values[i].posy, values[values[i].der].posx,values[values[i].der].posy);
		}
	}
}

function drawcaminos(){
	if(caminos.length > 0){
		console.log("caminos");
		strokeWeight(6);
		stroke(0,255,0);
		for(var i = 0; i<caminos.length; ++i){
			line(values[caminos[i]].posx, values[caminos[i]].posy, values[caminos[i+1]].posx,values[caminos[i+1]].posy);
			++i;
		}
		strokeWeight(1);
		stroke(0);	
	}
	else{
		
	}
}


function drawcirculos(){

	for(var i = 0; i<values.length; i++){
		stroke(0);
		fill(values[i].col);
		circle(values[i].posx, values[i].posy, values[i].diam);
		fill(0);
		textFont('Arial', 20);
		noStroke();
		textAlign(CENTER);
		text(values[i].num,values[i].posx,values[i].posy+7);
	}
	textFont('Arial', 30);
	text(text2, values[0].posx + 520, values[0].posy - 20);
	text(text1, values[0].posx - 550, values[0].posy - 20);	

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