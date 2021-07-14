import { IClient } from './../../../clients/interfaces/client-res.interfaces';
import { ContractService } from './../../services/contract.service';
import { ClientService } from './../../../clients/services/client.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContract } from './../../interfaces/contracts-res.interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-contract-create-dialog',
  templateUrl: './contract-create-dialog.component.html',
  styles: [
    `
      mat-list-item {
        cursor: pointer;
      }

      mat-list-item:hover {
        background-color: rgba(0, 0, 0, 0.1) !important;
      }

      .suggestion {
        z-index: 9999 !important;
      }
    `,
  ],
})
export class ContractCreateDialogComponent implements OnInit {
  contract: IContract | null = null;
  title = '';
  showSuggestion = true;
  clientsSuggested: IClient[] = [];
  clients: IClient[] = [];
  debouncer$: Subject<string> = new Subject();

  formContract: FormGroup = this.fb.group({
    clientName: ['', [Validators.required]],
    dateStart: ['', [Validators.required]],
    dateEnd: ['', [Validators.required]],
    exams: [0, [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: IContract,
    private dialogRef: MatDialogRef<ContractCreateDialogComponent>,
    private fb: FormBuilder,
    private clientService: ClientService,
    private contractService: ContractService
  ) {}

  ngOnInit(): void {
    this.clientService.findAll().subscribe((res) => {
      if (res && res.clients) {
        this.clients = res.clients;
      }
    });
    if (this.data && this.data.id) {
      this.contract = this.data;
      this.formContract.reset({
        clientName: this.contract.client.name,
        dateStart: this.contract.dateStart,
        dateEnd: this.contract.dateEnd,
        exams: this.contract.exams,
      });
      this.title = 'Actualizar contrato';
    } else {
      this.title = 'Crear contrato';
    }

    this.debouncer$.pipe(debounceTime(300)).subscribe((term) => {
      if (term) {
        this.clientsSuggested = this.clients.filter((client) => {
          return client.name
            .trim()
            .toLowerCase()
            .includes(term.trim().toLowerCase());
        });
        if (
          this.clientsSuggested.length === 1 &&
          this.clientsSuggested[0].name === term
        ) {
          this.showSuggestion = false;
        } else {
          this.showSuggestion = true;
        }
      } else {
        this.showSuggestion = false;
      }
    });
  }

  selectSuggestedClient(clientName: string) {
    this.formContract.get('clientName')?.setValue(clientName);
  }

  search() {
    const term = this.formContract.get('clientName')?.value;
    this.debouncer$.next(term);
  }

  save() {
    if (this.data) {
      this.update();
    } else {
      this.create();
    }
  }

  private update() {
    const { dateStart, dateEnd, exams } = this.formContract.value;
    this.contractService
      .update(this.data.id, {
        dateEnd,
        dateStart,
        exams,
        examsDone: 0,
      })
      .subscribe(() => {
        this.data.dateEnd = dateEnd;
        this.data.dateStart = dateStart;
        this.data.exams = exams;
        this.dialogRef.close(this.data);
      });
  }

  private create() {
    const { dateStart, dateEnd, exams, clientName } = this.formContract.value;
    const client = this.clients.find((c) => c.name === clientName);
    if (!client) {
      throw new Error('Debe seleccionar un nombre de cliente existente');
    }
    this.contractService
      .create({
        clientId: client.id,
        dateStart,
        dateEnd,
        exams,
      })
      .subscribe((res) => {
        this.dialogRef.close(res.contract);
      });
  }
}
