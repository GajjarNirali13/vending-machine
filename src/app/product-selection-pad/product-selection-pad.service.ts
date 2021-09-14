import { Injectable } from "@angular/core";  
import { Observable, Subject } from "rxjs";  

  
@Injectable()  
export class ProductSelectionService {  
    private subject = new Subject<any>();
    

    sendProductDetails(obj: any) {
        this.subject.next(obj);
    }

    getProductDetails(): Observable<any> {
        return this.subject.asObservable();
    }
}  