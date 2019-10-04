import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService, Post } from "src/app/Services/data.service";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"]
})
export class ArticleComponent implements OnInit {
  post: Post;
  @ViewChild("image", { static: false }) image: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params["id"];
    // pass in the id to dataService
    // find the post in the posts
    // return it back in here

    this.dataService
      .getPostById(id)
      .then(post => {
        this.post = new Post(
          post.id,
          post.title,
          post.author,
          post.body,
          post.image,
          post.date,
          post.category,
          post.authorId
        );
        this.image.nativeElement.style.backgroundImage = `url(${this.post.image})`;
      })
      .catch(err => {
        console.log("Error: ", err.message);
      });
  }

  formateDate(time: number) {
    const date = new Date(time * 1000);
    return date.toDateString();
  }
}
