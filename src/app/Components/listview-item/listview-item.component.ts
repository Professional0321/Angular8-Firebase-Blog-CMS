import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from "@angular/core";
import { Post, DataService } from "src/app/Services/data.service";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Services/auth.service";
import { Subscription } from "rxjs";
import { RadioService } from "src/app/Services/radio.service";

@Component({
  selector: "app-listview-item",
  templateUrl: "./listview-item.component.html",
  styleUrls: ["./listview-item.component.scss"]
})
export class ListviewItemComponent implements OnInit, OnDestroy {
  @Input() post: Post;
  @Output() itemToRemove = new EventEmitter<string>();
  isAuthenticated = false;
  owned = false;
  user: Subscription;

  constructor(
    private router: Router,
    private auth: AuthService,
    private radio: RadioService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.user = this.auth.user.subscribe(user => {
      this.isAuthenticated = user ? true : false;

      if (user) {
        this.owned = user.id === this.post.authorId;
      }
    });
  }

  truncate(str: string, length = 100, ending = "...") {
    if (str.length > length) {
      return str.substr(0, length) + ending;
    }
  }

  onClick(event: any) {
    const target = event.target;

    switch (target.className) {
      case "edit":
        this.edit();
        break;

      case "delete":
        this.delete();
        break;

      default:
        this.router.navigate(["/posts", this.post.id]);
        break;
    }
  }

  formateDate(time: number) {
    const date = new Date(time * 1000);
    return date.toDateString();
  }

  edit() {
    console.log("edit");
    this.router.navigate(["/edit", this.post.id]);
    //trigger editing event

    this.radio.startEditing(this.post);
  }

  delete() {
    if (window.confirm("Are you sure want to delete this?")) {
      //delete item
      // Redirect to posts page
      this.dataService.delete(this.post.id).then(() => {
        this.itemToRemove.emit(this.post.id);
      });
    }
  }

  ngOnDestroy() {
    this.user.unsubscribe();
  }
}
