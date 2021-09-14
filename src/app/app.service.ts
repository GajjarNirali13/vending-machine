import { Injectable } from "@angular/core";  
import { Observable, Subject } from "rxjs";  

  
@Injectable()  
export class AppService {  
    private subject = new Subject<any>();
    private subjectReset = new Subject<any>();

    clearData() {
        this.subject.next();
    }

    clearDataObs(): Observable<any> {
        return this.subject.asObservable();
    }

    setResetVendingData() {
        this.subjectReset.next();
    }

    getResetVendingData(): Observable<any> {
        return this.subjectReset.asObservable();
    }

}  