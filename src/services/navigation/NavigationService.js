import API from "@/utils/axiosCreate";

export const getNavigation = () =>
    API.get("/navigation");

export const getNavigationById = (id) =>
    API.get(`/navigation/${id}`);

export const createNavigation = (data) =>
    API.post("/navigation", data);

export const updateNavigation = (id, data) =>
    API.put(`/navigation/${id}`, data);