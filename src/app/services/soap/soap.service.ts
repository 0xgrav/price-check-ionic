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
        console.log("client:",client);
        this.client = client;
        this.clientReady.next(true);
      });
  }

  clientState(){
    return this.clientReady.asObservable();
  }

  getEmployee(userId){
    return this.client.call('GetEmployee',{userID:userId}).pipe(
      map(data => {
        console.log('data: ',data);
        // return data.result.ListOfCountryNamesByResult.tCountryCodeAndName;
      })
    );
  }
}