import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from 'rxjs';

import {AppService} from '../app.service'
import { PaymentService } from './payment.service';

@Component({
  selector: 'payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  cashForm: FormGroup;
  numberRegEx = /\-?\d*\.?\d{1,2}/;
  subscription: Subscription;


  constructor(
    public appService: AppService,
    public PaymentService: PaymentService
  ) {
    /**
     * Set the reactive form and validate the input
     */
    this.cashForm = new FormGroup({
      cash: new FormControl("", {
        validators: [Validators.required, Validators.pattern(this.numberRegEx)],
        updateOn: "blur"
      })
    });

    /**
     * After completing the vending machine transcation 
     * following function clears the form data
     */
    this.subscription = this.appService.clearDataObs().subscribe(() => {
      this.cashForm.reset()
    });
  }

  ngOnInit(){}

  /**
   * Following function manages the payment  the payment mode and 
   * payment amount to the (payment-selection-pad) sibling component 
   * @param type 
   */
  madePayment(type){
    let obj = {
      amount: 0,
      type:""
    }
    if (type === 'cash') {
      obj['amount']= this.cashForm.value.cash;
    } else {
      obj['amount']= 0;
    }
    this.PaymentService.sendPayment( {'amount': obj.amount, 'type':type});
  }
}
