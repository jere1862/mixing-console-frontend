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
  MatProgressBarModule,
  MatProgressSpinnerModule
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
    MatProgressBarModule,
    MatProgressSpinnerModule
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
    MatProgressBarModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialModule { }
