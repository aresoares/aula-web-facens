const form = document.querySelector(".formCreate");
const submitButton = form.querySelector(".btn");

function create() {
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Impede o envio do formulário
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const telefone = document.getElementById("telefone").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !telefone || !password) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newUser = {
      name,
      email,
      telefone,
      password,
    };

    try {
      const user = await createUser(newUser);
      console.log("Novo usuário criado:", user);
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("telefone").value = "";
      document.getElementById("password").value = "";
      alert("Usuário criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      alert("Erro ao criar usuário. Por favor, tente novamente.");
    }
  });
}
create();