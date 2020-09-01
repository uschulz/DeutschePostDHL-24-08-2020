import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonService } from '../persons/person.service';
import { Person } from '../persons/person.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, OnDestroy {
  constructor(public ps: PersonService) {}

  persons: Person[];
  current: Person;
  personSubs: Subscription;

  ngOnInit() {
    console.log('ngOnInit');
    this.personSubs = this.ps.getPersons().subscribe((data) => {
      this.persons = data;
    });
  }

  ngOnDestroy() {
    this.personSubs = null;
  }

  onPersonSelected(p: Person) {
    // this.current = p;
    this.current = { ...p }; // shallow clone
    // this.current = Object.assign({},p)
  }

  onPersonSaved(p: Person) {
    console.log('saving to service:', p);
    const existing: Person = this.persons.find((i) => i.id == p.id);
    if (existing != null) {
      Object.assign(existing, p);
    } else {
      this.persons.push(p);
    }
    console.log('Persons array after save', this.persons);
  }
}
