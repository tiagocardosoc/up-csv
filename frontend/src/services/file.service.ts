import { AxiosInstance } from "axios";
import { IResponseApi } from "../interfaces/service.interface";
import { IOptionsService } from "../interfaces/options.interface";
import api from "./api.service";
import { IItems } from "../interfaces/items.interface";

export default class FileService {
    apiService: AxiosInstance;
    setLoading: (loading: boolean) => void;

    constructor(options: IOptionsService) {
        this.apiService = api;
        this.setLoading = options.setLoading;
    }

    async uploadFile(file: File): Promise<IResponseApi> {
        try {
            this.setLoading(true);

            const formData = new FormData();
            formData.append('file', file);

            const { data } = await this.apiService.post('/api/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setTimeout(() => {
                this.setLoading(false);
            }, 1000);

            return { message: 'Upload successful', data };
        } catch (error: any) {
            this.setLoading(false);
            return {
                message: error.message || 'Error uploading file',
                error,
            };
        }
    }

    async searchFile(query: string): Promise<IResponseApi<IItems[]>> {
        try {
            this.setLoading(true);

            const { data } = await this.apiService.get('/api/users', {
                params: {
                    q: query,
                },
            });

            setTimeout(() => {
                this.setLoading(false);
            }, 1000);

            return { message: 'Search successful', data };
        } catch (error: any) {
            this.setLoading(false);
            return {
                message: error.message || 'Error searching file',
                error,
            };
        }
    }
}
