import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, Subject } from 'rxjs';
import { concatAll, concatMap, debounceTime, map } from 'rxjs/operators';
import { IUser } from './../../../users/interfaces/users-res.interfaces';
import { UserService } from './../../../users/services/user.service';
import { IClient } from './../../interfaces/client-res.interfaces';
import { CreateClientDto } from './../../interfaces/client.interfaces';
import { ClientService } from './../../services/client.service';

@Component({
  selector: 'app-client-create-dialog',
  templateUrl: './client-create-dialog.component.html',
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
export class ClientCreateDialogComponent implements OnInit {
  client: IClient | null = null;
  title = '';
  showSuggestion = true;
  suggestedUsers: IUser[] = [];
  users: IUser[] = [];

  debouncer$: Subject<string> = new Subject();

  clientForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    name: ['', [Validators.required]],
    cif: ['', [Validators.required]],
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    province: ['', [Validators.required]],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IClient | null,
    private matDialogRef: MatDialogRef<ClientCreateDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.userService.findAll().subscribe((res) => {
      this.users = res.users;
      const username =
        this.users.find((user) => user.id === this.data?.user.id)?.username ||
        '';
      this.clientForm.get('username')?.setValue(username);
    });
    this.client = this.data;
    if (this.data) {
      this.initUpdate();
    } else {
      this.initCreate();
    }

    this.debouncer$.pipe(debounceTime(300)).subscribe((term) => {
      if (term) {
        this.suggestedUsers = this.users.filter((user) => {
          return user.username
            .trim()
            .toLowerCase()
            .includes(term.trim().toLowerCase());
        });
        if (
          this.suggestedUsers.length === 1 &&
          this.suggestedUsers[0].username === term
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

  search() {
    const term = this.clientForm.get('username')?.value;
    this.debouncer$.next(term);
  }

  save() {
    if (this.data) {
      this.update();
    } else {
      this.create();
    }
  }

  selectSuggestedUser(username: string) {
    this.clientForm.get('username')?.setValue(username);
  }

  isValidField(field: string) {
    return (
      this.clientForm.controls[field].errors &&
      this.clientForm.controls[field].touched
    );
  }

  private initUpdate() {
    this.title = 'Actualizar cliente';
    this.clientForm.reset({
      ...this.data,
    });
  }

  private initCreate() {
    this.title = 'Crear cliente';
  }

  private update() {
    if (this.data) {
      this.clientService
        .update(this.data.id, { ...this.clientForm.value })
        .subscribe(() => {
          this.matDialogRef.close({
            ...this.clientForm.value,
            id: this.data?.id,
            user: this.data?.user,
          });
        });
    }
  }

  private create() {
    const user = this.users.find(
      (user) => user.username === this.clientForm.get('username')?.value
    );
    if (!user) {
      throw new Error(
        `No existe ningún usuario con el nombre ${
          this.clientForm.get('username')?.value
        }`
      );
    }
    const createClientDto: CreateClientDto = {
      ...this.clientForm.value,
      userId: user.id,
    };
    this.clientService
      .create(createClientDto)
      .pipe(
        map((res) => this.userService.findOne(res.client.userId)),
        concatAll()
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
}
