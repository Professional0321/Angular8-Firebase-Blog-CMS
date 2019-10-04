import { Component, OnInit, Output, OnDestroy } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { AuthService } from "src/app/Services/auth.service";
import { Subscription } from "rxjs";
import { RadioService } from "src/app/Services/radio.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Output() shouldPublish = new EventEmitter<boolean>();
  user: Subscription;
  enablePublish: Subscription;
  hideCreate: Subscription;

  isAuthenticated = false;
  shouldEnablePublish = false;
  shouldHideCreate = false;

  showLogin = false;
  showSignup = false;

  constructor(private auth: AuthService, private radio: RadioService) {}

  ngOnInit() {
    this.user = this.auth.user.subscribe(user => {
      if (user) {
        // logged in
        this.isAuthenticated = true;
      } else {
        // not logged in
        this.isAuthenticated = false;
      }
    });

    this.enablePublish = this.radio.shouldEnablePublish().subscribe(value => {
      this.shouldEnablePublish = value;
    });

    this.hideCreate = this.radio.shouldHideCreate().subscribe(value => {
      this.shouldHideCreate = value;
    });
  }

  signup = () => {
    this.showSignup = true;
    const body = document.querySelector("body");
    body.classList.add("modal-open");
  };

  login() {
    this.showLogin = true;
    const body = document.querySelector("body");
    body.classList.add("modal-open");
  }

  logout() {
    // call auth service to logout
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.user.unsubscribe();
    this.enablePublish.unsubscribe();
    this.hideCreate.unsubscribe();
  }

  showModal(event: string) {
    const body = document.querySelector("body");
    if (event === "close") {
      this.showLogin = false;
      this.showSignup = false;
      body.classList.remove("modal-open");
    }
  }

  publish() {
    this.shouldPublish.emit(true);
  }
}
