import { Injectable } from "@angular/core";  
import { Observable, Subject } from "rxjs";  

  
@Injectable()  
export class PaymentService {  
    private subject = new Subject<any>();
    
    /**
     * Pass the payment mode and amount to the product component
     * @param obj 
     */
    sendPayment(obj: any){
        this.subject.next(obj);
    }

    /**
     * 
     * Receive the payment mode and amount from the 
     * payment(child) component  
     * @returns 
     */
    getPayment(): Observable<any> {
        return this.subject.asObservable();
    }
}  

