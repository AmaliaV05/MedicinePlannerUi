import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMedicineComponent } from './medicine/add-medicine/add-medicine.component';
import { MedicineListComponent } from './medicine/medicine-list/medicine-list.component';
import { MedicineComponent } from './medicine/medicine/medicine.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', component: MenuComponent, children: [
    { path: 'add-medicine', component: AddMedicineComponent },
    { path: 'medicines', component: MedicineListComponent },
    { path: 'medicines/:id', component: MedicineComponent }
  ]}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
