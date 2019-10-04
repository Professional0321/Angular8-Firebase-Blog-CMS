import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-sc-target",
  templateUrl: "./sc-target.component.html",
  styleUrls: ["./sc-target.component.scss"]
})
export class ScTargetComponent implements OnInit {
  @Input("target") imageUrl: string;

  constructor() {}

  ngOnInit() {}
}
