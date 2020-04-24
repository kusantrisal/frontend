import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';

const material = [MatButtonModule,
  MatCheckboxModule,
  MatCardModule, MatToolbarModule, MatFormFieldModule, MatSelectModule, MatInputModule, MatSidenavModule, MatListModule, MatIconModule, MatTableModule, MatPaginatorModule, MatGridListModule, MatButtonToggleModule, MatChipsModule];
@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
