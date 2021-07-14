import { ContractCreateDialogComponent } from './../../components/contract-create-dialog/contract-create-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ContractService } from './../../services/contract.service';
import { Component, OnInit } from '@angular/core';
import { IContract } from '../../interfaces/contracts-res.interfaces';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styles: [],
})
export class ContractsListComponent implements OnInit {
  contracts: IContract[] = [];
  contractsSource: IContract[] = [];
  term = '';

  constructor(
    private contractService: ContractService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.contractService.findAll().subscribe((res) => {
      if (res && res.contracts) {
        this.contracts = res.contracts;
        this.contractsSource = res.contracts;
      }
    });
  }

  activate(contract: IContract) {
    if (contract && contract.id) {
      this.contractService.removeOrActive(contract.id, true).subscribe(() => {
        const index = this.contracts.findIndex((c) => c.id === contract.id);
        this.contracts[index].isActive = true;
      });
    } else {
      throw new Error(
        'Para activar un contrato se necesita el identificador. Consulte al administrador'
      );
    }
  }

  deactivate(contract: IContract) {
    if (contract && contract.id) {
      this.contractService.removeOrActive(contract.id, false).subscribe(() => {
        const index = this.contracts.findIndex((c) => c.id === contract.id);
        this.contracts[index].isActive = false;
      });
    } else {
      throw new Error(
        'Para activar un contrato se necesita el identificador. Consulte al administrador'
      );
    }
  }

  openContractCreateDialog(contract?: IContract) {
    if (contract) {
      this.openUpdate(contract);
    } else {
      this.openCreate();
    }
  }

  filter() {
    this.contracts = this.contractsSource.filter((contract) => {
      return Object.values(contract)
        .join('')
        .concat(contract.client.name)
        .trim()
        .toLowerCase()
        .includes(this.term.trim().toLowerCase());
    });
  }

  private openUpdate(contract: IContract) {
    this.matDialog
      .open(ContractCreateDialogComponent, { data: contract })
      .afterClosed()
      .subscribe((data) => {
        if (data && data.id) {
          const index = this.contracts.findIndex((c) => c.id === data.id);
          this.contracts[index] = data;
        }
      });
  }

  private openCreate() {
    this.matDialog
      .open(ContractCreateDialogComponent)
      .afterClosed()
      .subscribe((data) => {
        if (data && data.id) {
          this.contracts.push(data);
        }
      });
  }
}
