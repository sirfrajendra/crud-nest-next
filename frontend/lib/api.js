const API = "http://localhost:4000/users";

export const getUsers = async () => {
  return fetch(API).then(res => res.json());
};

export const createUser = async (data) => {
  return fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};

export const deleteUser = async (id) => {
  return fetch(`${API}/${id}`, {
    method: "DELETE",
  });
};