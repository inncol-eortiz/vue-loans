import axios from "./axios";

export const signIn = async (email, password) => axios.post("/auth/login", { email, password });

export const getUserById = async (userId) => axios.get(`/users/${userId}`).then((response) => response.data);
export const getUsers = async () => axios.get("/users").then((response) => response.data);
export const createUser = async (user) => axios.post("/users", user).then((response) => response.data);
export const updateUser = async (user) => axios.put(`/users/${user.id}`, user).then((response) => response.data);
export const deleteUser = async (userId) => axios.delete(`/users/${userId}`).then((response) => response.data);

export const getMaterialById = async (materialId) => axios.get(`/materials/${materialId}`).then((response) => response.data);
export const getMaterials = async () => axios.get("/materials").then((response) => response.data);
export const createMaterial = async (material) => axios.post("/materials", material).then((response) => response.data);
export const updateMaterial = async (material) => axios.put(`/materials/${material.material_id}`, material).then((response) => response.data);
export const deleteMaterial = async (materialId) => axios.delete(`/materials/${materialId}`).then((response) => response.data);

export const getLoanById = async (loanId) => axios.get(`/loans/${loanId}`).then((response) => response.data);
export const getLoans = async () => axios.get("/loans").then((response) => response.data);
export const createLoan = async (loan) => axios.post("/loans", loan).then((response) => response.data);
export const updateLoan = async (loan) => axios.put(`/loans/${loan.loan_id}`, loan).then((response) => response.data);
export const deleteLoan = async (loanId) => axios.delete(`/loans/${loanId}`).then((response) => response.data);