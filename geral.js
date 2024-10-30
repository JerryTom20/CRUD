//pegando os elementos Principais do HTML
const form = document.querySelector("form");
const input = document.querySelector("#dados");
const lista = document.querySelector("ul");
const botoesContainer = document.querySelector(".botoes-container");

//Evento para Adicionar os dados na lista
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const valor = input.value;
//Alerta de valor vazio no input quando da Enter 
    if (valor === "") {
        input.style.border = "3px solid red";
        alert("Preencha com algum valor");
        return;
    }

    // Cria o elemento <li> e seus filhos
    const nome = document.createElement("li");
    const novoNome = document.createElement("span");
    const excluir = document.createElement("input");
    excluir.type = "checkbox";

    nome.classList.add("liLista");
    novoNome.textContent = valor;

    // Anexa o checkbox e o nome ao item da lista
    nome.appendChild(excluir);
    nome.appendChild(novoNome);
    lista.prepend(nome);

    // Limpa o valor do input após adicionar o item
    input.value = "";
    input.style.border = ""; 
});

//Botão de Excluir
const bDletar = document.createElement("button");
bDletar.textContent = "Excluir";
bDletar.classList.add("delet");
botoesContainer.appendChild(bDletar);

//Evento de click para excluir itens 
bDletar.addEventListener("click", (e) => {
    e.preventDefault();

 //Para Excluir algo precisa estar selecionado no chaeckbox 
    const marcados = document.querySelectorAll("input[type='checkbox']:checked");

    // Remove cada item pai do checkbox marcado
    marcados.forEach((checkbox) => {
        const item = checkbox.parentElement; 
        lista.removeChild(item); 
    });
});

// Botão de check
const feito = document.createElement("button");
feito.textContent = "Feito";
feito.classList.add("feitoC", "enviar");
botoesContainer.appendChild(feito);

// Para dar Check precisa estar selecionado na CheckBox
feito.addEventListener("click", (e) => {
    e.preventDefault();

    const marcados = document.querySelectorAll("input[type='checkbox']:checked");

    marcados.forEach((checkbox) => {
        const item = checkbox.parentElement;
        const texto = item.querySelector("span");

        // Colocando o icone de check quando o click for feito
        const icone = document.createElement("i");
        icone.classList.add("fa-solid", "fa-check");
        icone.style.color = "green"; 
        icone.style.marginLeft = "10px";

        item.appendChild(icone);
    });
});

// Criação do botão de edição
const editar = document.createElement("button");
editar.textContent = "Editar";
editar.classList.add("edit", "enviar");
botoesContainer.appendChild(editar);

// Evento de clique para editar o conteúdo do item selecionado
editar.addEventListener("click", (e) => {
    e.preventDefault();

    const marcados = document.querySelectorAll("input[type='checkbox']:checked");

    if (marcados.length !== 1) {
        alert("Selecione apenas um item para editar.");
        return;
    }

    const checkbox = marcados[0];
    const item = checkbox.parentElement;
    const texto = item.querySelector("span");

    // Cria o campo de edição e substitui o `span`
    const inputEdit = document.createElement("input");
    inputEdit.type = "text";
    inputEdit.value = texto.textContent;

    // Aplica estilo para centralizar o campo de edição
    inputEdit.style.width = "80%";       
    inputEdit.style.margin = "0 auto";   
    inputEdit.style.textAlign = "center"; 
    inputEdit.classList.add("dados")
    item.replaceChild(inputEdit, texto);

    // Salva o valor ao sair do campo ou pressionar "Enter"
    inputEdit.addEventListener("blur", () => {
        texto.textContent = inputEdit.value;
        item.replaceChild(texto, inputEdit);
    });

    inputEdit.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            texto.textContent = inputEdit.value;
            item.replaceChild(texto, inputEdit);
        }
    });

    // Foca o campo de edição automaticamente
    inputEdit.focus();
});

