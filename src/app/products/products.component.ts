import { Component, Inject, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import product from './products.data';
import { AppService } from '../app.service';
import { ProductSelectionService } from '../product-selection-pad/product-selection-pad.service';

export interface DialogData {
  retrunMoney: string,
  productName: string,
  type: string
}

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = [];
  subscription: Subscription;
  productData: any;
  
  returnAmt: number = 0;
  currentProduct: string;

  displayData = {
    totalCashAmt: 0,
    totalCreditAmt: 0,
    totalSendItem: 0
  }
  
  constructor(
    public appService: AppService,
    public dialog: MatDialog,
    public productSelectionService: ProductSelectionService
  ) {
    //Set the product data
    //this.products = product;
    this.products = [ ...product ]
    
    /**
     * Receive the payment and product ID from the 
     * product selection pad component
     */
    this.productSelectionService.getProductDetails().subscribe(obj => {
      this.productData = obj;
      if (this.productData.type === 'card') {
        this.setCardData();
      } else {
        this.setCashData();
      }               
    });

    this.appService.getResetVendingData().subscribe(() => {
      this.displayData = {
        totalCashAmt: 0,
        totalCreditAmt: 0,
        totalSendItem: 0
      }
      this.products.forEach(obj=> {
        obj.quantity = 10;
      });
    });
  }


  /**
   * Function update the product data within the vending machine
   * when the payment mode is card
   * update the total credit amount in machine
   */
  setCardData(){
    if (this.products[this.productData.id].quantity > 0) {
      this.displayData.totalCreditAmt = this.displayData.totalCreditAmt + Number(this.products[this.productData.id].price);
      this.returnAmt = 0;
      this.displayVendingMachineData();
    } else {
      alert("Item Sold")
    }
  }

  /**
   * Function update the product data within the vending machine
   * when the payment mode is cash
   * update the total cash amount in machine
   */
  setCashData(){
    if (this.products[this.productData.id].quantity > 0) {
      if (Number(this.products[this.productData.id].price) <= this.productData.cash) {
        this.displayData.totalCashAmt = this.displayData.totalCashAmt + Number(this.products[this.productData.id].price);
        this.returnAmt = this.productData.cash - this.products[this.productData.id].price;
        this.displayVendingMachineData();
      } else {
        alert("Not enough Money");
      }
    } else {
      alert("Item Sold")
    }
  }

  /**
   * Update the quantity of the products & total sold cans
   * Open the dialog to show the selected item and cash/card
   */
  displayVendingMachineData() {
      this.products[this.productData.id].quantity = this.products[this.productData.id].quantity - 1; 
      this.displayData.totalSendItem = this.displayData.totalSendItem + 1;  
      this.currentProduct = this.products[this.productData.id].name;
      this.openDialog();    
  }

  /**
   * Open the dialog component
   */
  openDialog() {
    let tempObj = {
      'retrunMoney': this.returnAmt.toFixed(2), 
      'productName': this.currentProduct, 
      'type': this.productData.type
    }
    const dialogRef = this.dialog.open(ProductDialog, {
      width: '250px',
      data: tempObj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.appService.clearData();
    });
  }
}


@Component({
  selector: 'product-dialog',
  templateUrl: 'product-dialog.component.html',
})
export class ProductDialog {
  dialogData;

  constructor(
    public dialogRef: MatDialogRef<ProductDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.dialogData = data;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}