import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { Skill } from '../skill.model';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.scss'],
})
export class SkillsListComponent implements OnInit, OnChanges {
  constructor() {}

  @Input() skills: Skill[];
  @Output() itemAdded: EventEmitter<Skill> = new EventEmitter();
  @Output() itemDeleted: EventEmitter<Skill> = new EventEmitter();
  @Output() toggleCompleted: EventEmitter<Skill> = new EventEmitter();

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges skills-list:', changes.skills.currentValue);
  }

  toggleShowAllItems(): void {}

  addItem(): void {
    this.itemAdded.emit({ name: 'Container', completed: false });
  }

  deleteItem(item: Skill): void {
    this.itemDeleted.emit(item);
  }

  toggleItemCompleted(item: Skill): void {
    this.toggleCompleted.emit(item);
  }
}
