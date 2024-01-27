const userList = document.getElementById("userList");

// Função para buscar e exibir a lista de usuários
async function displayUsers() {
  try {
    // Limpa a lista atual
    userList.innerHTML = "";

    const users = await getUser();

    if (users.length === 0) {
      const noUsersMessage = document.createElement("p");
      noUsersMessage.textContent = "Nenhum candidato encontrado.";
      userList.appendChild(noUsersMessage);
      return;
    }

    users.forEach((user) => {
      const listItem = document.createElement("div");
      listItem.classList.add("userItem");

      const userText = document.createElement("p");
      userText.innerHTML = `<span>Nome:</span> ${user.name} <br> <span>E-mail:</span> ${user.email} `;

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Deletar";
      deleteButton.classList.add("deleteButton");
      deleteButton.addEventListener("click", async () => {
        try {
          await deleteUser(user.id);
          // Atualize a lista de usuários após a exclusão bem-sucedida
          await displayUsers();
          alert("Candidato excluído com sucesso!");
        } catch (error) {
          console.error("Erro ao excluir candidato:", error);
          alert("Erro ao excluir candidato. Por favor, tente novamente.");
        }
      });

      listItem.appendChild(userText);
      listItem.appendChild(deleteButton);
      userList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Erro ao obter a lista de candidatos:", error);
    userList.innerHTML = "<p>Erro ao buscar a lista de candidatos. Por favor, tente novamente.</p>";
  }
}
displayUsers();
