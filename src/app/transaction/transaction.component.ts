import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {

  transactions: any;

  constructor(private ds: DataService) {
    this.ds.getTransaction(JSON.parse(localStorage.getItem("currentAcno") || "")).subscribe(
      (result: any) => {
        this.transactions = result.transaction;
        console.log(this.transactions);
      }
    );
  }
}
