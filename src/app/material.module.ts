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
  NoConflictStyleCompatibilityMode,
  MatSnackBarModule
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
    NoConflictStyleCompatibilityMode,
    MatSnackBarModule
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
    NoConflictStyleCompatibilityMode,
    MatSnackBarModule
  ]
})
export class MaterialModule { }
