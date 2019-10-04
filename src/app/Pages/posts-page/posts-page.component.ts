import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { DataService, Post } from "src/app/Services/data.service";
import { RadioService } from "src/app/Services/radio.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-posts-page",
  templateUrl: "./posts-page.component.html",
  styleUrls: ["./posts-page.component.scss"]
})
export class PostsPageComponent implements OnInit {
  posts: Post[];
  sub: Subscription;
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPosts().then(posts => {
      this.posts = posts;
    });
  }

  removeItemById(id: string) {
    this.posts = this.posts.filter(e => {
      return e.id !== id;
    });
  }
}
