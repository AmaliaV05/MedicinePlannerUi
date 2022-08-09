import { Component, OnInit } from '@angular/core';
import { MedicineDTO } from 'src/app/dtos/medicine.dto';
import { MedicineService } from 'src/app/services/medicine-service.service';

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.css']
})
export class MedicineListComponent implements OnInit {
  medicines: MedicineDTO[] = [];

  constructor(private medicineService: MedicineService) { }

  ngOnInit(): void {
    this.getMedicines();
  }

  getMedicines() {
    this.medicineService.getMedicineList().subscribe((response: MedicineDTO[])=> {
      this.medicines = response;
    });
  }

}
