import { Component, OnInit } from "@angular/core";
import { DataService, Post } from "src/app/Services/data.service";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.scss"]
})
export class HomepageComponent implements OnInit {
  private posts: Post[];
  isLoading = true;

  postsOne: Post[];
  postsTwo: Post[];
  postsThree: Post[];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getPosts().then(posts => {
      this.posts = posts;

      this.postsOne = this.posts.filter((value, index) => {
        return index <= 2;
      });

      this.postsThree = this.posts.filter((value, index) => {
        return index > 10 || index === this.posts.length - 1;
      });

      this.postsTwo = this.posts.filter((value, index) => {
        return index >= 3 && index <= 10;
      });

      this.isLoading = false;
    });
  }
}
