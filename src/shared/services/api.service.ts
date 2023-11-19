import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { BASE_URL } from '../constants/api.constant';
import { Layout } from '../models/interfaces/ILayout';
import { Inventory, ReceivedInventory } from '../models/interfaces/IInventory';
import { UserSignInResponse } from '../models/interfaces/IUserSignInResponse';
import { RegisterResponse } from '../models/interfaces/IRegisterResponse';
import { SupplyResponse } from '../models/interfaces/ISupplyResponse';
import { OrderResponse } from '../models/interfaces/IOrderResponse';
import { CheckIn } from '../models/interfaces/ICheckIn';
import { CheckOut } from '../models/interfaces/ICheckOut';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  uniqueSuppliers = new BehaviorSubject<string[]>([]);
  scanString : String = "";
  layout = new BehaviorSubject<Layout>({
    internalId: {},
    zone: 4,
    aisle: 2,
    rack: 2,
    shelf: 5,
    bin: 5
});

  inventory = new BehaviorSubject<Inventory>({
    "LOC-A-1-1-1-1" : {
      sku : '',
      qty: 0,
      title: '',
      isOccupied: false
    }
  })

  originalInventory = new BehaviorSubject<ReceivedInventory[]>([]);
  toggle = new BehaviorSubject<boolean>(false);
  

  constructor(private http : HttpClient) { 

  }



  getInventoryLayout() : void{
    this.http.get<Layout>(BASE_URL + '/InventoryLayout').subscribe(
      data => {
        this.layout.next(data);
      }
    );
  }

  getInventory() : void{
    this.http.get<Inventory[]>(BASE_URL + "/Inventory/current").subscribe(
      data => {
        const dictionary = data.reduce((acc : Inventory, item : any) => {
          const location = item.location;
          acc[location] = { sku : item.sku, qty : item.qty, isOccupied: item.isOccupied, title: item.title};
          return acc;
        }, {});
        console.log(dictionary);
        this.inventory.next(dictionary);
      }
    );
  }

  getInventoryOriginal() : void {
    this.http.get<ReceivedInventory[]>(BASE_URL + "/Inventory/current").subscribe(
      data =>{
        this.originalInventory.next(data);
      }
    );
  }

  getInventoryItem(location : string){
    return this.inventory.value[location];
  }

  checkIfEmpty(location: string) : boolean{
    for(let i = 0; i < this.layout.value.bin;i++){
      let item = this.getInventoryItem(location + "-"+(i+1));
      if(item.isOccupied){
        return true;
      }
    }
    return false;
  }

  updateScanString(value: string) : void{
    this.scanString = value;
  }

  signIn(username: string, password: string) : Observable<UserSignInResponse>{
    return this.http.post<UserSignInResponse>(BASE_URL + '/User/authenticate',{username: username,password: password, token:""});
  }

  register(username: string, password: string, role: string): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(BASE_URL + '/User/register',{username:username, password:password,role: role,token: ""});
  }

  getUnverified()  : Observable<string[]>{
    return this.http.get<string[]>(BASE_URL + '/User/unverified');
  }

  onboard(username: string) : Observable<any>{
    return this.http.put<any>(BASE_URL + '/User/onboard',{username:username});
  }

  addSupply(sku: string, title: string, supplier: string) : Observable<any>{
    return this.http.post<any>(BASE_URL + "/Supplies",{sku:sku,title:title,supplier:supplier});
  }

  getAllSupplies(supplier: string) : Observable<SupplyResponse[]>{
    return this.http.get<SupplyResponse[]>(BASE_URL + "/Supplies/api/supplies/"+supplier);
  }

  deleteSupply(sku:string) : Observable<any>{
    return this.http.delete<any>(BASE_URL + "/Supplies/"+sku);
  }

  getAllSupplier() : void{
    this.http.get<SupplyResponse[]>(BASE_URL + '/Supplies').subscribe(
      (response) => {
        const uniqueSuppliers = new Set<string>();
        response.forEach(item => {
          uniqueSuppliers.add(item.supplier);
        });
        const uniqueSuppliersArray : string[] = [...uniqueSuppliers];
        this.uniqueSuppliers.next(uniqueSuppliersArray);
      }
    );
  }

  placeOrder(partner: string, items: any, partnerType: string) : Observable<any>{
    return this.http.post<any>(BASE_URL + '/Order',{orderId: this.generateRandomString(),partner:partner,items: items,orderStatus:"placed",partnerType: partnerType});
  } 

  generateRandomString() : string{
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  getAllOrder() : Observable<OrderResponse[]>{
   return this.http.get<OrderResponse[]>(BASE_URL + "/Order");
  }

  updateOrderStatus(orderid: string, status: string){
    return this.http.get(BASE_URL + '/Order/'+orderid+"/"+status);
  }

  getAllCheckIn() : Observable<CheckIn[]>{
    return this.http.get<CheckIn[]>(BASE_URL + '/CheckIn');
  }

  updateInventory(location: string, sku: string, qty: string, title: string) : Observable<any>{
    return this.http.post<any>(BASE_URL + '/Inventory/update', {location:location, sku:sku,qty:parseInt(qty),title: title});
  }

  deleteFromCheckIn(location: string) : Observable<any>{
    return this.http.delete<any>(BASE_URL + '/CheckIn/' + location);
  }

  getAllCheckOut() : Observable<CheckOut[]>{
    return this.http.get<CheckOut[]>(BASE_URL + '/CheckOut');
  }

  checkOutItem(sku: string, orderid: string) : Observable<any>{

    return this.http.post(BASE_URL + '/CheckOut/update',{sku: sku,orderId:orderid});
  }

  updateInventoryAfterCheckout(location: string, qty: string) : Observable<any>{
    return this.http.post(BASE_URL + '/Inventory/deduct', {location : location, qty: parseInt(qty)});
  }

  removeFromCheckout(orderid: string) : Observable<any>{
    return this.http.delete(BASE_URL + '/CheckOut/'+orderid);
  }

  
}
