import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit
} from "@angular/core";
import { Post } from "src/app/Services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-post-grid-item",
  templateUrl: "./post-grid-item.component.html",
  styleUrls: ["./post-grid-item.component.scss"]
})
export class PostGridItemComponent implements OnInit, AfterViewInit {
  @Input() post: Post;
  @ViewChild("thumbnail", { static: false }) thumbnail: ElementRef;

  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.thumbnail.nativeElement.style.backgroundImage = `url(${this.post.image})`;
  }

  truncateIftoolong(content: string, length: number, ending = "...") {
    if (content.length >= length) {
      content = content.substr(0, length);
    }
    return content + ending;
  }

  onClick(event: MouseEvent) {
    this.router.navigate(["/posts", `${this.post.id}`]);
  }

  formateDate(time: number) {
    const date = new Date(time * 1000);
    return date.toDateString();
  }
}
