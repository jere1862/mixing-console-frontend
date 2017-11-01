import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSliderModule,
  MatGridListModule,
  MatTabsModule,
  MatCardModule,
  MatCheckboxModule,
  MatProgressBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressBarModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSliderModule,
    MatGridListModule,
    MatTabsModule,
    MatCardModule,
    MatCheckboxModule,
    MatProgressBarModule
  ]
})
export class MaterialModule { }
