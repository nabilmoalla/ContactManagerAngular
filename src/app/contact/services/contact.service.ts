import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Contact} from "../model/contact.model";

@Injectable()
export class ContactService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('/api/contacts');
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>('/api/contacts', contact);
  }

  deleteContact(contactId: number): Observable<any> {
    return this.http.delete('/api/contacts/' + contactId);
  }

  getOneContact(contactId: number): Observable<Contact> {
    return this.http.get<Contact>('/api/contacts/' + contactId);
  }

  updateContact(contactId: string | number, changes: Partial<Contact>): Observable<any> {
    return this.http.put('/api/contacts/' + contactId, changes);
  }
}
