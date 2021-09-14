// Angular built-in modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular Material built-in modules
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';

//Application Components & Services
import { AppComponent } from './app.component';
import { AppService } from './app.service';
import { PaymentService } from './payment/payment.service';
import { ProductSelectionService } from './product-selection-pad/product-selection-pad.service';
import { ProductsComponent } from './products/products.component';
import { ProductsSelectionPadComponent } from './product-selection-pad/product-selection-pad.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsSelectionPadComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatButtonModule,
    MatBadgeModule,
    MatCardModule,
    MatInputModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [AppService, PaymentService, ProductSelectionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
