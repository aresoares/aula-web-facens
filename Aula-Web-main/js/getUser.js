const userList = document.getElementById("userList");

async function fetchUserList() {
  try {
    const users = await getUser();

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

        listItem.appendChild(userText);
        userList.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("Erro ao obter a lista de usuários:", error);
    userList.innerHTML = "<p>Erro ao buscar a lista de usuários. Por favor, tente novamente.</p>";
  }
}
fetchUserList();
