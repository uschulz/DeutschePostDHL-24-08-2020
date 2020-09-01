import { Component, OnInit } from '@angular/core';
import { StatefulDemoService } from '../stateful-demo.service';

@Component({
  selector: 'app-second-consumer',
  templateUrl: './second-consumer.component.html',
  styleUrls: ['./second-consumer.component.scss'],
})
export class SecondConsumerComponent implements OnInit {
  constructor(private service: StatefulDemoService) {}

  demos$ = this.service.getDemos();

  ngOnInit(): void {}
}
