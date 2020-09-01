import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../demo.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-multi-interceptor',
  templateUrl: './multi-interceptor.component.html',
  styleUrls: ['./multi-interceptor.component.scss'],
})
export class MultiInterceptorComponent implements OnInit {
  data1;
  data2;

  constructor(private ds: DemoService, private http: HttpClient) {}

  ngOnInit(): void {}

  httpCall(): void {
    this.ds.getDemos().subscribe();
  }

  requestData() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe((body) => {
        console.log(body), (this.data1 = JSON.stringify(body));
      });
  }
  requestXMLData() {
    this.http
      .get(
        'https://api.openweathermap.org/data/2.5/weather?q=London&mode=xml&appid=25a0801691214cdec4c44e5b125b6396'
      )
      .subscribe((body) => {
        console.log(body), (this.data2 = JSON.stringify(body));
      });
  }
  request404Data() {
    this.http
      .get('https://jsonplaceholder.typicode.com/todos/7878')
      .subscribe((res) => console.log(res));
  }
}
