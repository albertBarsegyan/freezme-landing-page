import axiosConfigured from "../libs/axios/main.config";
import { PaginatedResponse } from "../types/response.types";
import { Project } from "../types/project.types";

export async function getProjects({ page }: { page: number }): Promise<PaginatedResponse<Project> | null> {
  try {
    const params = new URLSearchParams({
      page: String(page),
    }).toString();

    const res = await axiosConfigured.get(`projects/?${params}`);

    return res.data;
  } catch (error) {
    return null;
  }
}
