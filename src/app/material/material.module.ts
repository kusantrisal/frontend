import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
const material = [MatButtonModule, MatCardModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatInputModule];
@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
