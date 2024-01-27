const BASE_URL = "http://localhost:3000";

async function fetchAPI(url, options) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}

async function getUser() {
  try {
    const data = await fetchAPI(`${BASE_URL}/users`);
    return data;
  } catch (error) {
    return [];
  }
}

async function createUser(user) {
  try {
    const data = await fetchAPI(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    alert(`Usuário ${data.name} criado com sucesso`);
    return data;
  } catch (error) {
    throw error;
  }
}

async function updateUser(id, user) {
  try {
    const data = await fetchAPI(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    alert(`Usuário ${data.name} atualizado com sucesso`);
    return data;
  } catch (error) {
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const data = await fetchAPI(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    return data;
  } catch (error) {
    throw error;
  }
}
