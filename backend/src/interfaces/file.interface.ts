export interface ICSVData {
    id?: number;
    name: string;
    city: string;
    country: string;
    favorite_sport: string;
}

export interface IFileGamesModel {
    id: number | undefined;
    name: string | undefined;
    city: string | undefined;
    country: string | undefined;
    favorite_sport: string | undefined;
}