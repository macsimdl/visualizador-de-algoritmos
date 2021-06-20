//background
const colorbackground = [230,235,255];

//data
var numeroCirculos = 12;
const diametro = 50;
const alturaCirculos = 100;

const colorCirculo = [180,215,175];

//velocidad programa
var velocidadCiclo = 30;
var velocidadBucle = 30;

//locales
var values = [];
var explorados = [];
var caminos = [];
var iniciado = false;
var flag = 0;
var extremo = false;
var texto = "";
var empezado = false;

var contador = 0;
var ejecutado = false;


function setVelo(veloci1, veloci2){
		velocidadCiclo = veloci1;
		velocidadBucle = veloci2;
		contador = 1;
}

function reset(){
	values = [];
	explorados = [];
	caminos = [];
	var valor = Math.floor(Math.random() * 250) + 1;
	values[0] = { num: valor, col: color(colorCirculo), posx: 700, posy: 100, padre:-1, iz: -1, der: -1, diam:40+valor/5};
	for (var i = 1; i < numeroCirculos; i++) {
		var colocado = false;
		var desplazamiento = [];
		var nivel = 0;
		var posi = 0;
		valor = Math.floor(Math.random() * 250) + 1;
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
					values[tama] = { num: valor, col: color(colorCirculo), posx: finalpos, posy: 100+(nivel*alturaCirculos), padre:posi, iz: -1, der: -1, diam:40+valor/5};
					colocado=true;
				}
				else{
					posi = values[posi].der
				}
			}
		}
		

	}	

	extremo = false;
	flag = 0;
	caminos = [];
	contador = 0;
	iniciado = false;
	explorados[0] = 0;

	for(var i = 0; i< values.length; i++){
		var valor = Math.floor(Math.random() * 250) + 1;
		values[i].num = valor;
		values[i].diam = 40+valor/5;
	}

	ejecutado = false;
}


function setup() {
	createCanvas(1400, 800);
	var valor = Math.floor(Math.random() * 250) + 1;
	values[0] = { num: valor, col: color(colorCirculo), posx: 700, posy: 100, padre:-1, iz: -1, der: -1, diam:40+valor/5, exp: false};
	for (var i = 1; i < numeroCirculos; i++) {
		var colocado = false;
		var desplazamiento = [];
		var nivel = 0;
		var posi = 0;
		valor = Math.floor(Math.random() * 250) + 1;
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
					values[tama] = { num: valor, col: color(colorCirculo), posx: finalpos, posy: 100+(nivel*alturaCirculos), padre:posi, iz: -1, der: -1, diam:40+valor/5, exp: false};
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
					values[tama] = { num: valor, col: color(colorCirculo), posx: finalpos, posy: 100+(nivel*alturaCirculos), padre:posi, iz: -1, der: -1, diam:40+valor/5, exp: false};
					colocado=true;
				}
				else{
					posi = values[posi].der
				}
			}
		}
		

	}	
	empezado = false;
	texto = "Nodos visitados: ";
	extremo = false;
	flag = 0;
	caminos = [];
	contador = 0;
	iniciado = false;
	explorados[0] = 0;

	for(var i = 0; i< values.length; i++){
		var valor = Math.floor(Math.random() * 250) + 1;
		values[i].num = valor;
		values[i].diam = 40+valor/5;
	}

	ejecutado = false;
	frameRate(60);
}

function draw() {
	background(colorbackground);


	if(ejecutado){

		//realiza odd-even sort
		actualizaValores();
		
	}

	
	//dibujar los circulos
	drawlineas();
	drawcaminos();
	drawcirculos();

}


function actualizaValores(){

	if(contador==0){
		if(iniciado){
				if(explorados.length > 0){
					var actual = explorados[explorados.length-1];
					extremo = false;
					if(values[actual].iz != -1 || values[actual].der != -1){
						if(flag == 0){
							if(values[actual].iz != -1 && values[values[actual].iz].exp==false){
								values[values[actual].iz].exp = true;
								explorados[explorados.length]=values[actual].iz;
								caminos[caminos.length] = values[actual].iz;
								caminos[caminos.length] = actual;
								values[values[actual].iz].col = color(0,255,0); 
								ejecIzquierda(values[actual].num);
							}
							else{
								flag = 1;
							}
						}
						else{
							if(values[actual].der != -1 && values[values[actual].der].exp==false){
								explorados[explorados.length]=values[actual].der;
								values[values[actual].der].exp = true;
								caminos[caminos.length] = values[actual].der;
								caminos[caminos.length] = actual;
								values[values[actual].der].col = color(0,255,0);
								ejecDerecha(values[actual].num);
								flag = 0;
							}
							else{
								values[actual].col = color(150,255,150);
								if(!empezado){
									texto = texto + values[explorados[explorados.length-1]].num;
								}
								else{
									texto = texto + ", " + values[explorados[explorados.length-1]].num;
								}
								ejecAtras(values[actual].num);
								explorados.pop();
								empezado = true;

							}
						}
					}
					else{
						extremo = true;
						values[actual].col = color(150,255,150);
						if(!empezado){
							texto = texto + values[explorados[explorados.length-1]].num;
						}
						else{
							texto = texto + ", " + values[explorados[explorados.length-1]].num;
						}
						explorados.pop();
						empezado = true;
						ejecFinal(values[actual].num);
						values[actual].exp = true;
					}
				}
				else{
					caminos = [];
					playPause();
					ejecutado = false;
				}
				for(var i=0; i<explorados.length; i++){
					console.log(values[explorados[i]].num);
				}
				
		}
		else{
			values[0].col = color(0,255,0);
			iniciado = true;
			ejecInicial();
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

function drawcaminos(){
	if(caminos.length > 0){
		strokeWeight(6);
		stroke(150,255,150);
		for(var i = 0; i<caminos.length-2; ++i){
			line(values[caminos[i]].posx, values[caminos[i]].posy, values[caminos[i+1]].posx,values[caminos[i+1]].posy);
			++i;
		}
		if(!extremo){
			stroke(0,255,0);
		}
		line(values[caminos[caminos.length-1]].posx, values[caminos[caminos.length-1]].posy, values[caminos[caminos.length-2]].posx,values[caminos[caminos.length-2]].posy);
	}
	else{
		ejecAcaba();
	}
}

function drawlineas(){
	smooth();
	stroke(100);
	strokeWeight(2);
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

function drawcirculos(){
	stroke(0);
	strokeWeight(1);
	smooth();
	for(var i = 0; i<values.length; i++){
		fill(values[i].col);
		circle(values[i].posx, values[i].posy, values[i].diam);
		fill(0);
		textFont('Arial', 20);
		textAlign(CENTER);
		text(values[i].num,values[i].posx,values[i].posy+7);
	}
	textFont('Arial', 30);
	textAlign(LEFT);
	text(texto,values[0].posx - 500,values[0].posy-60);

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