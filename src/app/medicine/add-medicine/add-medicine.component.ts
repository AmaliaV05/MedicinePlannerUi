import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MedicineDTO } from 'src/app/dtos/medicine.dto';
import { MedicineService } from 'src/app/services/medicine-service.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css']
})
export class AddMedicineComponent implements OnInit, AfterViewInit, OnDestroy {
  medicine!: MedicineDTO;
  option = '';
  private clickListener1!: () => void;
  private clickListener2!: () => void;
  medicineFG!: FormGroup;

  @ViewChild('option1', {  read: ElementRef, static: false }) private option1Btn!: ElementRef<HTMLButtonElement>;
  @ViewChild('option2', { read: ElementRef, static: false }) private option2Btn!: ElementRef<HTMLButtonElement>;

  constructor(private medicineService: MedicineService,
    private renderer: Renderer2,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {    
    this.initializeForm();
  }

  initializeForm(){
    this.medicineFG = this.formBuilder.group({
      medicine: this.formBuilder.group({
        name: new FormControl(''),
        expirationDate: new FormControl(''),
        stock: new FormControl('')
      }),
      planning: this.formBuilder.group({
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        pauseEndDate: new FormControl('')
      })
    })
  }

  ngAfterViewInit() {
    this.clickListener2 = this.renderer.listen(this.option1Btn.nativeElement, 'click', () => {
      this.option = 'custom';
    });
    this.clickListener2 = this.renderer.listen(this.option2Btn.nativeElement, 'click', () => {
      this.option = 'daily';
    });
  }

  addMedicine() {
    this.medicine = {
      name: this.medicineFG.get('medicine.name')?.value,
      expirationDate : this.medicineFG.get('medicine.expirationDate')?.value,
      stock: {
        total: this.medicineFG.get('medicine.stock')?.value
      },
      plannings: [{ 
        startDate: this.medicineFG.get('planning.startDate')?.value,
        endDate: this.medicineFG.get('planning.endDate')?.value,
        pauseEndDate: this.medicineFG.get('planning.pauseEndDate')?.value 
      }]
    };
    this.medicineService.addMedicine(this.medicine).subscribe(() => {
      this.option = '';
    });
  }

  ngOnDestroy() {
    this.clickListener1();
    this.clickListener2();
  }
}
