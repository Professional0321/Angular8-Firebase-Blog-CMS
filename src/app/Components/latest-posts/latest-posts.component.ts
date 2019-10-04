import { Component, OnInit, Input } from "@angular/core";
import { Post } from "src/app/Services/data.service";

@Component({
  selector: "app-latest-posts",
  templateUrl: "./latest-posts.component.html",
  styleUrls: ["./latest-posts.component.scss"]
})
export class LatestPostsComponent implements OnInit {
  @Input() posts: Post[];

  constructor() {}

  ngOnInit() {}
}
