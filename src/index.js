import './css/main.css';
import './img/favicon.ico';
var esquerda = 37, cima = 38, direita = 39 , baixo = 40;  // inicializa as variaves com seus keyCode;
var moveEsquerda = false, moveDireita = false, moveCima = false, moveBaixo = false; // incializa as variaveis de mover com boolean false
var canvas = document.querySelector("canvas") // determina o canvas
var cx = canvas.getContext("2d"); // deternina o context do canvas com seu desenho 2d
var quadrado = { // desenha o quadrado na cordenada de 10 em x e 10 em y
	x:10,
	y:10
};

atualizar(); // ao iniciar a tela esse metodo recursivo é chamado

window.addEventListener("keydown", apertar); // funçao para quando apertar a tecla, fazer alguma coisa

window.addEventListener("keyup",soltar); //função para quando uma tecla é liberada

/**
 * Função para que ao apertar teclas que se anulam ao mesmo tempo, como direita/esquerda ou cima/baixo, não se mova
 * Caso aperte outras teclas ao mesmo tempo, move diagonalmente.
 * @param {*} e 
 */

function apertar(e) {
	let chave = e.keyCode; // var chave recebe o codigo das teclas de direção
	 
	if(chave == esquerda && chave !== direita) {
		moveEsquerda = true;
	}
	if(chave == direita && chave !== esquerda) {
		moveDireita = true;
	}
	if(chave == cima && chave != baixo) {
		moveCima = true;
	}
	if(chave == baixo && chave != cima) {
		moveBaixo = true;
	}
}

/**
 * Se liberar teclas que se anulam ao mesmo tempo, como direita/esquerda ou cima/baixo, não se move
 * @param {*} e 
 */
function soltar(e){
			//Variável recebe o código da tecla liberada
			let chave = e.keyCode;

			if(chave == esquerda && chave !== direita){
				moveEsquerda = false;
			}
			
			if(chave == direita && chave !== esquerda){
				moveDireita = false;
			}
			
			if(chave == cima && chave !== baixo){
				moveCima = false;
			}
			
			if(chave == baixo && chave !== cima){
				moveBaixo = false;
			}
		}
	
	/**
	 * Incrementa x e y para mover para direita e cima
	 * Decrementa x e y para mover para esquerda e baixo
	 */
	function mover(){
			
			if(moveEsquerda){
				quadrado.x--;
			}
			
			if(moveDireita){
				quadrado.x++;
			}
			
			if(moveCima){
				quadrado.y--;
			}
			
			if(moveBaixo){
				quadrado.y++;
			}
		}

	/**
	 * Funçao para sempre limpar o quadrado e redesenhar de acordo com as cordenadas recebidas
	 */
	function renderizar() {
		cx.clearRect(0,0,canvas.width,canvas.height);
		cx.fillRect(quadrado.x,quadrado.y,50,50)
	}
	
	/**
	 * Funçao que recebe um request de animação recursivo, porntanto sempre será chamada.
	 * Na recursivade recebe a propia função e a variavel canvas que é o que queremos que receba a animação
	 * As funções de mover e renderizar sempre serão chamadas a cada requisição de animação, fazendo com o desenho fique nas cordenadas estabelecidas
	 */
	function atualizar(){
			
			requestAnimationFrame(atualizar, canvas);
			
			mover();
			
			renderizar();
		}

