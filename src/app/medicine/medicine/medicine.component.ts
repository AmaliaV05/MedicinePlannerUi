import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicineDTO } from 'src/app/dtos/medicine.dto';
import { MedicineService } from 'src/app/services/medicine-service.service';

@Component({
  selector: 'app-medicine',
  templateUrl: './medicine.component.html',
  styleUrls: ['./medicine.component.css']
})
export class MedicineComponent implements OnInit {
  medicine: MedicineDTO = {
    id: 0,
    name: '',
    stock: {
      id: 0,
      total: 0
    },
    plannings: []
  };
  idMedicine!: number;

  constructor(private medicineService: MedicineService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMedicineId();
    this.getMedicine();
  }

  getMedicine() {
    this.medicineService.getMedicineDetails(this.idMedicine).subscribe((response: MedicineDTO) => {
      this.medicine = response;
    });
  }

  getMedicineId() {
    this.idMedicine = Number(this.route.snapshot.paramMap.get('id'));
  }

}
