import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MedicineDTO } from '../dtos/medicine.dto';
import { httpOptions } from './http-headers.const';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  private baseUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) { }

  private getMedicine(path: string): Observable<MedicineDTO> {
    return this.httpClient.get<MedicineDTO>(`${this.baseUrl}${path}`, httpOptions);
  }

  private getMedicines(path: string): Observable<MedicineDTO[]> {
    return this.httpClient.get<MedicineDTO[]>(`${this.baseUrl}${path}`, httpOptions);
  }

  private postMedicine(path: string, body = {}): Observable<MedicineDTO> {
    return this.httpClient.post<MedicineDTO>(`${this.baseUrl}${path}`, JSON.stringify(body), httpOptions);
  }

  getMedicineDetails(idMedicine: number) {
    return this.getMedicine(`Medicines/${idMedicine}`);
  }

  getMedicineList(): Observable<MedicineDTO[]> {
    return this.getMedicines('Medicines');
  }

  addMedicine(medicine: MedicineDTO): Observable<MedicineDTO> {
    return this.postMedicine(`Medicines`, medicine);
  }
}
