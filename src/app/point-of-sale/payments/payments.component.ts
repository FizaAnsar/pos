import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  GST: number = 0;
  menuTotal: number = 0;
  serviceCharges: number = 0;
  Discount: number = 0;
  totalBill: number = 0;
  Bill=0;
  amountTender: number = 0;
  changeValue: number = 0;
  fiveThousand: number = 0;
  fiveHundered: number = 0;
  oneHundered: number = 0
  oneThousand: number = 0;
  fifty: number = 0

  constructor(private api: ApiService, private router:Router) { }

  ngOnInit(): void {
    console.log("GST Amount", this.api.gst);
    console.log("Menu Total Amount", this.api.menuTotal);
    console.log("Total Amount sum of GST and MenuTotal", this.api.total);
    this.GST = this.api.gst;
    this.menuTotal = this.api.menuTotal;
    this.serviceCharges = this.api.serviceCharge;
    this.Discount = 0;
    this.Bill = this.GST + this.menuTotal + this.serviceCharges + this.Discount
    this.totalBill=this.Bill;
  }
  max() {
    this.amountTender = this.totalBill;
    this.changeValue = this.amountTender - this.totalBill
  }
  fiveThounands() {
    this.fiveThousand+= 5000;

    this.addition()
  }
  oneThounands() {
    this.oneThousand+= 1000;
    this.addition()
  }
  fiveHundereds() {
    this.oneThousand+= 500;
    this.addition()
  }
  oneHundereds() {
    this.oneHundered+= 100;
    this.addition()
  }
  fifties() {
    this.fifty+= 50;
    this.addition();
   
  }
  addition(){
    this.amountTender = this.fiveThousand + this.oneThousand + this.fiveHundered + this.oneHundered + this.fifty;
    this.changeValue = this.amountTender - this.totalBill
  }
  input:string =""
  pressNum(num:string){
    this.input=this.input +num
    this.changeValue=~~parseInt(this.input)-this.totalBill
  }
  gotoReserve(){
    this.router.navigate(['/point-of-sale', {
      outlets: { 'pos': ['reserve'] }
    }])
  
  }
}
