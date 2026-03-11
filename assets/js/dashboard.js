function horaAtual() {
// Função para atualizar a data e hora a cada segundo
function atualizarDataEHora() { 
// Seleciona o elemento onde a data e hora serão exibidas
const resultado = document.getElementById("resultado");
// Obtém a data e hora atuais
const data = new Date();
// Formata a data no formato "dia da semana, dia de mês de ano"
const dataFormatada = data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric'
});

// Formata a hora no formato HH:MM:SS
const horaformatada = data.toLocaleTimeString('pt-BR');
// Exibe a data e hora formatadas no console e na página
console.log(`${dataFormatada}`);
// Atualiza o conteúdo do elemento resultado
resultado.innerHTML = `<p>${dataFormatada} -  ${horaformatada}</p>`;
}

// Chama a função inicialmente e depois a cada segundo
atualizarDataEHora();
// Atualiza a data e hora a cada 1000 milissegundos (1 segundo)
setInterval(atualizarDataEHora, 1000);
}



function Lista() {
const inputTarefa = document.querySelector('.input-nova-tarefa');
const btnTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

function criaBotaoApagar(li) {
    li.innerText += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.textContent = "Apagar";
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('tittle', 'Apagar esta tarefa');
    li.appendChild(botaoApagar);
}

inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function limpaInput() {
    inputTarefa.value = "";
    inputTarefa.focus();
}

function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;

    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

function salvarTarefas() {
    const litarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of litarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace("Apagar", "").trim();
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    console.log(listaDeTarefas);
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas()
}




function CalcularIMC() {
//Capturar evento de submit do formulário
const form = document.querySelector('#formulario');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const inputPeso = e.target.querySelector('#peso');
    const inputAltura = e.target.querySelector('#altura');
    
    const peso = Number(inputPeso.value);
    const altura = Number(inputAltura.value);
    
    if (!peso) {
        setResultado('Peso inválido', false);
        return;
    }

    if (!altura) {
        setResultado("Altura inválida", false);
        return;
    }

    const imc = getImc(peso, altura);
    const nivelImc = getNivelIMC(imc);

    const msg = `Seu IMC é ${imc} (${nivelImc}).`;

    setResultado(msg, true);
});

function getNivelIMC(imc) {
    const nivel = [
        'Abaixo do peso',
        'Peso normal',
        'Sobrepeso',
        'Obesidade grau 1',
        'Obesidade grau 2',
        'Obesidade grau 3'
    ];

    if (imc >= 39.9) return nivel[5];
    if (imc >= 34.9) return nivel[4];
    if (imc >= 29.9) return nivel[3];
    if (imc >= 24.9) return nivel[2];
    if (imc >= 18.5) return nivel[1];
    if (imc < 18.5) return nivel[0];
}

function getImc(peso, altura) {
    const imc = peso / (altura * altura);
    return imc.toFixed(2);
}

function criaP() {
    const p = document.createElement('p');
    return p;
}

function setResultado(msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';

    const p = criaP(); // CRIA o paragrafo

    if (isValid) {
        p.classList.add('paragrafo-resultado');
    } else {
        p.classList.add('bad');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
}
}



function relogio() {
function criaHoraDosSegundos(segundos) {
    const data = new Date(segundos * 1000);
    return data.toLocaleTimeString("pt-Br", {
        hour12: false,
        timeZone: "GMT"
    });
}

const relogio = document.querySelector(".relogio");
const iniciar = document.querySelector(".iniciar");
const pausar = document.querySelector(".pausar");
const zerar = document.querySelector(".zerar");
let segundos = 0;
let timer;

function iniciaRelogio() {
    timer = setInterval(function() {
     segundos++;
     relogio.innerHTML = criaHoraDosSegundos(segundos);
    }, 1000)
}

document.addEventListener("click", function(event) {
    let el = event.target;

    if (el.classList.contains("iniciar")) {
        relogio.classList.remove('pausado');
        clearInterval(timer);
        iniciaRelogio();
    }

     if (el.classList.contains("pausar")) {
        relogio.classList.add('pausado');
        clearInterval(timer);
    }

    if (el.classList.contains("zerar")) {
        clearInterval(timer);
        segundos = 0;
        relogio.innerHTML = "00:00:00"
        relogio.classList.remove('pausado');
    }
})
}

relogio();
Lista();
CalcularIMC()
horaAtual();