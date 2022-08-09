import { PlanningDTO } from "./planning.dto";

export interface MedicineDTO {
    id?: number;
    name: string;
    expirationDate?: Date;
    stock: StockDTO;
    plannings: PlanningDTO[];
}

export interface StockDTO {
    id?: number;
    total: number;
}