import { Component, OnInit } from "@angular/core";
import { AuthService } from "./Services/auth.service";
import { Title } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "Wanderer";

  constructor(private authService: AuthService, private titleService: Title) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.titleService.setTitle(this.title);
  }
}
