import {
  Component,
  OnInit,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef
} from "@angular/core";
import { Post } from "src/app/Services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-secondary-feature",
  templateUrl: "./secondary-feature.component.html",
  styleUrls: ["./secondary-feature.component.scss"]
})
export class SecondaryFeatureComponent implements OnInit, AfterViewInit {
  @Input() posts: Post[];
  @ViewChild("image", { static: false }) image: ElementRef;
  constructor(private router: Router) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.image.nativeElement.style.backgroundImage = `url(${this.posts[0].image})`;
  }

  onClick(event: MouseEvent) {
    this.router.navigate(["/posts", `${this.posts[0].id}`]);
  }

  formateDate(time: number) {
    const date = new Date(time * 1000);
    return date.toDateString();
  }
}
