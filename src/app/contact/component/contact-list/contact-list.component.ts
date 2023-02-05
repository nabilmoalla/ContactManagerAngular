import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/reducers";
import {ContactService} from "../../services/contact.service";
import {Observable} from "rxjs";
import {Contact} from "../../model/contact.model";
import {getAllContacts} from "../../store/contact.selectors";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {contactActionTypes} from "../../store/contact.actions";
import {Update} from "@ngrx/entity";
import {DatePipe} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {ContactDetailsComponent} from "../contact-details/contact-details.component";
import {CreateUpdateDialogComponent} from "../create-update-dialog/create-update-dialog.component";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, AfterViewInit {

  contacts$: Observable<Contact[]> | undefined;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate', 'address', 'actions'];
  dataSource: MatTableDataSource<Contact>;

  contactToBeUpdated: Contact;

  isUpdateActivated = false;

  contactIdToDelete: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contactService: ContactService,
              private store: Store<AppState>,
              public datepipe: DatePipe,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.contacts$ = this.store.select(getAllContacts);
    this.contacts$.subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openUpdateDialog(event: MouseEvent, contact: Contact) {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(CreateUpdateDialogComponent, {
      width: '450px',
      data: contact
    });
  }

  updateContact(updateForm: any) {
    console.log(updateForm.value)
    updateForm.value.birthDate= this.datepipe.transform(updateForm.value.birthDate, 'yyyy-MM-dd')!
    const update: Update<Contact> = {
      id: this.contactToBeUpdated.id!.toString(),
      changes: {
        ...this.contactToBeUpdated,
        ...updateForm.value
      }
    };

    this.store.dispatch(contactActionTypes.updateContact({update}));

    this.isUpdateActivated = false;
  }

  deleteContact(contactId: number) {
    this.store.dispatch(contactActionTypes.deleteContact({contactId}));
  }

  openDeleteDialog(event: MouseEvent, contactId : number) {
    event.preventDefault();
    event.stopPropagation();
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '450px'
    });
    dialog.afterClosed().subscribe(confirmDelete => {
      if(confirmDelete){
        this.deleteContact(contactId);
      }
    })
  }

  getRecord(row: any) {
    console.log(row)
  }

  openContactDetails(row: any) {
    const dialog = this.dialog.open(ContactDetailsComponent, {
      width: '450px',
      data: row
    });
  }

  openCreateModal() {
    const dialog = this.dialog.open(CreateUpdateDialogComponent, {
      width: '450px'
    });
  }
}
