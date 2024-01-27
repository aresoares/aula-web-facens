const userList = document.getElementById("userList");
const updateFormContainer = document.getElementById("updateFormContainer");

async function fetchAndDisplayUsers() {
  try {
    const users = await getUser();

    // Limpa a lista atual
    userList.innerHTML = "";

    if (users.length === 0) {
      const noUsersMessage = document.createElement("p");
      noUsersMessage.textContent = "Nenhum usuário encontrado.";
      userList.appendChild(noUsersMessage);
    } else {
      users.forEach((user) => {
        const listItem = document.createElement("div");
        listItem.classList.add("userItem");

        const userText = document.createElement("p");
        userText.innerHTML = `<span>Nome:</span> ${user.name} <br> <span>E-mail:</span> ${user.email}`;

        const updateButton = document.createElement("button");
        updateButton.textContent = "Atualizar";
        updateButton.classList.add("updateButton");
        updateButton.addEventListener("click", () => openUpdateForm(user));

        listItem.appendChild(userText);
        listItem.appendChild(updateButton);
        userList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Erro ao obter a lista de usuários:", error);
    userList.innerHTML = "<p>Erro ao buscar a lista de usuários. Por favor, tente novamente.</p>";
  }
}

async function openUpdateForm(user) {
  const updateFormHTML = `
    <form id="updateForm" class="formUpdate">
      <h2>Atualizar Usuário</h2>
      <label for="name">Nome</label>
      <input type="text" placeholder="Digite o novo nome" id="name" value="${user.name}" required>
      <label for="email">E-mail</label>
      <input type="email" placeholder="Digite o novo e-mail" id="email" value="${user.email}" required>
      <label for="phone">Telefone Celular</label>
      <input type="tel" placeholder="Digite o número de telefone celular" id="phone" value="${user.phone || ''}" required>
      <label for="password">Senha</label>
      <input type="password" placeholder="Digite a nova senha" id="password" value="${user.password || ""}" required>
      <button type="submit" class="btn">Atualizar</button>
    </form>
  `;

  updateFormContainer.innerHTML = updateFormHTML;
  const updateForm = document.getElementById("updateForm");

  updateForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = encodeURIComponent(document.getElementById("name").value);
    const email = encodeURIComponent(document.getElementById("email").value);
    const phone = encodeURIComponent(document.getElementById("telefone").value);
    const password = encodeURIComponent(document.getElementById("password").value);

    const newUser = {
      name,
      email,
      telefone,
      password,
    };

    try {
      await updateUser(user.id, newUser);
      closeUpdateForm();
      await fetchAndDisplayUsers();
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar candidato:", error);
      alert("Erro ao atualizar candidato. Por favor, tente novamente.");
    }
  });
}

function closeUpdateForm() {
  updateFormContainer.innerHTML = "";
}


fetchAndDisplayUsers();
