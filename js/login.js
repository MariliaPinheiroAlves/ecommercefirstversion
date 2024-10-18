const iconeExibirSenha = document.getElementById("iconeExibirSenha");
const inputSenha = document.getElementById("senha");
const loginButton = document.getElementById("loginBtn");
const usernameInput = document.getElementById("username");
const messageDiv = document.getElementById("message");

iconeExibirSenha.addEventListener('click', () => {
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
    } else {
        inputSenha.type = 'password';
    }
})

loginButton.addEventListener("click", async () => {
    const username = usernameInput.value;
    const password = inputSenha.value;

    try {
        if (!username || !password) {
            throw new Error("Por favor insira um usuario e/ou uma senha");
        };

        const response = await fetch("https://fakestoreapi.com/users");
        const users = await response.json();

        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            window.location.href = "index.html";
        } else {
            messageDiv.classList.remove("hidden");
            messageDiv.classList.add('erro-message');
            messageDiv.innerText = "Usuário e/ou senha inválidos.";
            setTimeout(() => {
                messageDiv.classList.add("hidden");
            }, 2000);
        }

    } catch (error) {
        console.error("Erro ao fazer a requisição:", error);
        messageDiv.innerText = "Ocorreu um erro. Tente novamente mais tarde.";
    }
});
