/* eslint-disable @typescript-eslint/no-unused-vars */
import { IOptionsService } from "../../interfaces/options.interface";
import { IResponseApi } from "../../interfaces/service.interface";
import { IItems } from "../../interfaces/items.interface";

export default class FileServiceStub {
    setLoading: (loading: boolean) => void;

    constructor(options: IOptionsService) {
        this.setLoading = options.setLoading;
    }

    async uploadFileWithSuccess(): Promise<IResponseApi> {
        try {
            this.setLoading(true);

            setTimeout(() => {
                this.setLoading(false);
            }, 1000);

            return { message: 'Upload successful' };
        } catch (error: any) {
            this.setLoading(false);
            return {
                message: error.message || 'Error uploading file',
                error,
            };
        }
    }

    async uploadFileWithError(): Promise<IResponseApi> {
        try {
            throw new Error()
        } catch (error: any) {
            this.setLoading(false);
            return {
                message: error.message || 'Error uploading file',
                error: true,
            };
        }
    }

    async searchFileWithSucess(): Promise<IResponseApi<IItems[]>> {
        try {
            const responseData: IItems[] = [
                {
                    name: "Test 1",
                    city: "City 1",
                    country: "Country 1",
                    favorite_sport: "Sport 1"
                },
                {
                    name: "Test 2",
                    city: "City 2",
                    country: "Country 2",
                    favorite_sport: "Sport 2"
                },
                {
                    name: "Test 3",
                    city: "City 3",
                    country: "Country 3",
                    favorite_sport: "Sport 3"
                },
                {
                    name: "Test 4",
                    city: "City 4",
                    country: "Country 4",
                    favorite_sport: "Sport 4"
                }
            ]

            return { message: 'Search successful', data: responseData };
        } catch (error: any) {
            this.setLoading(false);
            return {
                message: error.message || 'Error searching file',
                error,
            };
        }
    }

    async searchFileWithError(): Promise<IResponseApi<IItems[]>> {
        try {
            throw Error()
        } catch (error: any) {
            this.setLoading(false);
            return {
                message: error.message || 'Error searching file',
                error: true,
            };
        }
    }
}
