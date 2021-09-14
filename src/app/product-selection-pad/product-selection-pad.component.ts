import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AppService } from '../app.service'
import { PaymentService } from '../payment/payment.service';
import { ProductSelectionService } from '../product-selection-pad/product-selection-pad.service';

@Component({
  selector: 'product-selection-pad',
  templateUrl: './product-selection-pad.component.html',
  styleUrls: ['./product-selection-pad.component.css']
})
export class ProductsSelectionPadComponent {
  subscription: Subscription;
  cash: number
  paymentMode: string
  
  constructor(
    public appService: AppService,
    public paymentService: PaymentService,
    public productSelectionService: ProductSelectionService
  ) {
    /**
     * Subscription to receive the payment component data
     */
    this.paymentService.getPayment().subscribe(data => {
      this.cash = data.amount;
      this.paymentMode = data.type;
    });

    /**
     * Once the transcation complete, 
     * data of this component will be cleared
     */
    this.appService.clearDataObs().subscribe(() => {
      this.cash = undefined;
      this.paymentMode = undefined
    });
  }

  /**
   * send the payment details and 
   * the selected product id to the product component
   * @param id 
   */
  sendProductDetail(id){
    if (this.paymentMode){
      this.productSelectionService.sendProductDetails({"id":id, "cash": this.cash, type:this.paymentMode});
    } else {
      alert("Please Select Payment Method")
    }
  }  
}
