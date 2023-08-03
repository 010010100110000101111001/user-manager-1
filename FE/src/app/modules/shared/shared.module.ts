import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [LoadingComponent, NavbarComponent],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent,
    NgxSpinnerModule,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
