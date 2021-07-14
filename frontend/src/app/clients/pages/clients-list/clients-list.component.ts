import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from './../../../auth/services/auth.service';
import { ClientCreateDialogComponent } from './../../components/client-create-dialog/client-create-dialog.component';
import { IClient } from './../../interfaces/client-res.interfaces';
import { ClientService } from './../../services/client.service';
@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styles: [
    `
      tr:hover {
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.1);
      }

      img {
        height: 30px;
        width: 30px;
        cursor: pointer;
      }
    `,
  ],
})
export class ClientsListComponent implements AfterViewInit {
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['cif', 'name', 'address', 'city', 'province'];
  dataSource = new MatTableDataSource<IClient>([]);
  clients: IClient[] = [];
  term = '';

  constructor(
    private authService: AuthService,
    private clientService: ClientService,
    private matDialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.clientService.findAll().subscribe((res) => {
      this.dataSource.data = res.clients;
      this.clients = res.clients;
    });
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    filterValue.trim().toLowerCase();
    this.dataSource.data = this.clients.filter((client) => {
      const toFind = `${client.name}${client.city}`.trim().toLowerCase();
      return toFind.includes(filterValue);
    });
  }

  openDialogCreateClient(client?: IClient) {
    if (client) {
      this.matDialog
        .open(ClientCreateDialogComponent, { data: client })
        .afterClosed()
        .subscribe((client) => {
          if (client) {
            const index = this.clients.findIndex((c) => c.id === client.id);
            this.clients[index] = client;
            this.dataSource.data = this.clients;
          }
        });
    } else {
      this.matDialog
        .open(ClientCreateDialogComponent)
        .afterClosed()
        .subscribe((client) => {
          if (client) {
            this.clients.push(client);
            this.dataSource.data = this.clients;
          }
        });
    }
  }

  toExcel() {
    this.clientService.toExcel(this.term ? this.term : '-').subscribe((res) => {
      console.log(res);
      const a = document.createElement('a');
      a.href = res;
      a.click();

    });
  }
}
