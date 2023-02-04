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

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, AfterViewInit {

  contacts$: Observable<Contact[]> | undefined;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birthDate', 'address', 'actions'];
  dataSource: MatTableDataSource<Contact>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private contactService: ContactService, private store: Store<AppState>) {

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

  showUpdateForm(row: Contact) {

  }

  deleteCourse(contactId: number) {
    this.store.dispatch(contactActionTypes.deleteContact({contactId}));
  }
}
