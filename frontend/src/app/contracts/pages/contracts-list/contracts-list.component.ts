import { ContractService } from './../../services/contract.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styles: [],
})
export class ContractsListComponent implements OnInit {
  constructor(private contractsService: ContractService) {}

  ngOnInit(): void {
    this.contractsService.findAll().subscribe((res) => console.log(res));
  }
}
