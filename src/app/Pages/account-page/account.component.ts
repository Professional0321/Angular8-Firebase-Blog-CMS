import { Component, OnInit, OnDestroy } from "@angular/core";
import { DataService } from "src/app/Services/data.service";
import { AuthService, User } from "src/app/Services/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.scss"]
})
export class AccountComponent implements OnInit, OnDestroy {
  posts = [];
  sub: Subscription;
  currentUser: { name: string; id: string };
  constructor(private dataService: DataService, private auth: AuthService) {}

  ngOnInit() {
    // loading data from services
    this.loadUser();
    this.loadData(this.currentUser.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async loadUser() {
    this.sub = await this.auth.getCurrentUser().subscribe(data => {
      this.currentUser = { name: data.name, id: data.id };
    });
  }

  async loadData(id: string) {
    const allPosts = await this.dataService.getPosts();

    // console.log(allPosts);
    // console.log(id);

    this.posts = allPosts.filter(post => {
      return post.authorId === id;
    });
  }
}
