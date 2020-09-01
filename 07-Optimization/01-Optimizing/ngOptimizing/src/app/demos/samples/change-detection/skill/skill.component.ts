import { Component, OnInit, Input } from '@angular/core';
import { Skill } from 'src/app/model/skills/skills';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit {
  @Input() skill: Skill;

  constructor() {}

  ngOnInit() {}

  check() {
    console.log('check SkillComponent');
  }
}
