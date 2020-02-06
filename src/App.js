import React, { Component } from 'react';
import Serpiente from './Serpiente';
import Fruta from './Fruta';

const coordenadas = () => {
	let min = 5;
	let max = 100;
	let x = Math.floor((Math.random() * (max - min) + min) / 5) * 5;
	let y = Math.floor((Math.random() * (max - min) + min) / 5) * 5;
	return [ x, y ];
};

const Inicio = {
	velocidad: 300,
	fruta: coordenadas(),
	direction: 'RIGHT',
	cuerpoSerpiente: [ [ 0, 0 ], [ 5, 0 ] ]
};

class App extends Component {
	state = Inicio;

	componentDidMount() {
		setInterval(this.moversnake, this.state.velocidad); //seteamos un intervalo para el movimiento de la serpiente
		document.onkeydown = this.tecla; //recogemos la tecla presionada
	}

	componentDidUpdate() {
		this.salirsedelarea();
		this.serpientegolpeada();
		this.comer();
	}

	tecla = (e) => {
		e = e || window.event; //cogemos la tecla que pulsamos comprobamos que no presionemos al sentido contrario para no perder automaticamente cuando damos a la flecha contraria
//flecha arriba
		if (e.keyCode === 38 && this.state.direction !== 'DOWN') {
			this.setState({ direction: 'UP' }); 
//flecha abajo
		} else if (e.keyCode === 40 && this.state.direction !== 'UP') {
			this.setState({ direction: 'DOWN' }); 
//flecha izquierda
		} else if (e.keyCode === 37 && this.state.direction !== 'RIGHT') {
			this.setState({ direction: 'LEFT' }); 
//flecha derecha
		} else if (e.keyCode === 39 && this.state.direction !== 'LEFT') {
			this.setState({ direction: 'RIGHT' }); 
		}
	};

	moversnake = () => {
//guardar los puntitos del cuerpo de la serpiente
		let bloques = [ ...this.state.cuerpoSerpiente ]; 
//cabeza de la serpiente (array length -1 que equivale al último elemento)
		let cabeza = bloques[bloques.length - 1]; 
//switch de sleccion de movimiento segun la dirección, el primer array de cabeza contiene el valor x y el segundo el valor de y
		switch (this.state.direction) {
			case 'RIGHT':
				cabeza = [ cabeza[0] + 5, cabeza[1] ]; //para ir a la derecha aumentamos x
				break;

			case 'LEFT':
				cabeza = [ cabeza[0] - 5, cabeza[1] ]; //para ir a la izquierda disminuimos x
				break;

			case 'DOWN':
				cabeza = [ cabeza[0], cabeza[1] + 5 ]; //para ir abajo aumentamos y
				break;

			case 'UP':
				cabeza = [ cabeza[0], cabeza[1] - 5 ]; //para ir arriba disminuimos y
				break;

			default:
				break;
		}
		bloques.push(cabeza); //metemos el nuevo valor en el array para la cabeza para indicar el movimiento
		bloques.shift(); //eliminamos el primer elemento del array (la cola de la serpiente)
		this.setState({
			cuerpoSerpiente: bloques
		});
	};

	//funcion de perder, alert y reset
	gameover() {
		alert('Game Over');
		this.setState(Inicio);
	}

	//funcion para comprobar si se sale del area la serpiente
	salirsedelarea() {
		let cabeza = this.state.cuerpoSerpiente[this.state.cuerpoSerpiente.length - 1]; //almacenamos en una variable la cabeza de la serpiente
		if (cabeza[0] >= 100 || cabeza[1] >= 100 || cabeza[0] < 0 || cabeza[1] < 0) {
			this.gameover();
		}
	}

	//funcion que comprueba si la serpiente se ha golpeado a si misma
	serpientegolpeada() {
		let snake = [ ...this.state.cuerpoSerpiente ];
		let cabeza = snake[snake.length - 1];
		snake.pop();
		snake.forEach((punto) => {
		//comprobamos si la serpiente se golpea a si misma en cada uno de sus puntos
			if (cabeza[0] === punto[0] && cabeza[1] === punto[1]) {
				this.gameover();
			}
		});
	}
	//funcion de comer
	comer() {
		let cabeza = this.state.cuerpoSerpiente[this.state.cuerpoSerpiente.length - 1];
		let fruta = this.state.fruta;
		if (cabeza[0] == fruta[0] && cabeza[1] == fruta[1]) {
			this.setState({
				//actualizamos la posicion de la fruta antes de aumentar el tamaño de la serpiente, si no se crea un bucle infinito
				fruta: coordenadas()
			});
			this.crecer();
			this.aumentarvelocidad();
		}
	}
	crecer() {
		let newSerpiente = [ ...this.state.cuerpoSerpiente ];
		newSerpiente.unshift([]);
		this.setState({
			cuerpoSerpiente: newSerpiente
		});
	}
	aumentarvelocidad() {
		if (this.state.velocidad > 10) {
			this.setState({
				velocidad: this.state.velocidad - 10
			});
		}
	}
	render() {
		return (
			<div className="area">
				<Serpiente cuerpoSerpiente={this.state.cuerpoSerpiente} /> <Fruta bloque={this.state.fruta} />{' '}
			</div>
		);
	}
}

export default App;
