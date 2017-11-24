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
  MatProgressSpinnerModule,
  NoConflictStyleCompatibilityMode
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
    MatProgressSpinnerModule,
    NoConflictStyleCompatibilityMode
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
    MatProgressSpinnerModule,
    NoConflictStyleCompatibilityMode
  ]
})
export class MaterialModule { }
