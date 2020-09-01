import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-intro-e2e",
  templateUrl: "./intro-e2e.component.html",
  styleUrls: ["./intro-e2e.component.scss"]
})
export class IntroE2eComponent implements OnInit {
  constructor() {}

  mdpath = environment.markdownPath + "introe2e.md";

  ngOnInit() {}
}
