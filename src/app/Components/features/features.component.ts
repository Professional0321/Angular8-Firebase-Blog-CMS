import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit
} from "@angular/core";
import { Post } from "src/app/Services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-features",
  templateUrl: "./features.component.html",
  styleUrls: ["./features.component.scss"]
})
export class FeaturesComponent implements OnInit, AfterViewInit {
  @Input() posts: Post[];

  @ViewChild("main", { static: false }) main: ElementRef;
  @ViewChild("top", { static: false }) top: ElementRef;
  @ViewChild("bottom", { static: false }) bottom: ElementRef;

  constructor(private router: Router) {}

  ngOnInit() {}

  onClick(event: PointerEvent) {
    const target = event.srcElement["className"];

    if (target === "main") {
      this.router.navigate(["/posts", `${this.posts[0].id}`]);
    }

    if (target === "secondary top") {
      this.router.navigate(["/posts", `${this.posts[1].id}`]);
    }

    if (target === "secondary bottom") {
      this.router.navigate(["/posts", `${this.posts[2].id}`]);
    }
  }

  formateDate(time: number) {
    const date = new Date(time * 1000);
    return date.toDateString();
  }

  ngAfterViewInit(): void {
    this.main.nativeElement.style.backgroundImage = `url(${this.posts[0].image})`;
    this.top.nativeElement.style.backgroundImage = `url(${this.posts[1].image})`;
    this.bottom.nativeElement.style.backgroundImage = `url(${this.posts[2].image})`;
  }
}
