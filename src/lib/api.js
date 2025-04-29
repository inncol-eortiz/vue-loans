import axios from "./axios";

export const signIn = async (email, password) => axios.post("/auth/login", { email, password });

export const getUserById = async (userId) => axios.get(`/users/${userId}`).then((response) => response.data);
export const getUsers = async () => axios.get("/users").then((response) => response.data);
export const createUser = async (user) => axios.post("/users", user).then((response) => response.data);
export const updateUser = async (user) => axios.put(`/users/${user.id}`, user).then((response) => response.data);
export const deleteUser = async (userId) => axios.delete(`/users/${userId}`).then((response) => response.data);