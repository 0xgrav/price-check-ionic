import {Injectable} from '@angular/core';
import {Client, NgxSoapService} from 'ngx-soap';
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  client: Client;
  private userId:string;
  private clientReady = new BehaviorSubject(false);
  constructor(private soap: NgxSoapService) {
    this.soap.createClient("../../../assets/TextileApi.xml")
      .then(client => {
        this.client = client;
        this.clientReady.next(true);
      });
  }

  clientState(){
    return this.clientReady.asObservable();
  }

  getEmployee(userID){
    return this.client.call('GetEmployee',{userID:userID}).pipe(
      map(data => data.result.GetEmployeeResult),
    );
  }

  getProduct(barcode) {
    return this.client.call('GetProduct', {barcode:barcode}).pipe(
      map(data => data.result.GetProductResult),
    );
  }
}