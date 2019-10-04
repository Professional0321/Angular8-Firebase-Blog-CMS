import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/Services/auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent implements OnInit {
  @Output() dismiss = new EventEmitter<string>();

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value["login-email"];
    const password = form.value["login-password"];

    this.auth.login(email, password);
    form.reset();
    this.closeModal();
  }

  onClick(event: any) {
    if (
      event.target.className === "container" ||
      event.target.className === "close"
    ) {
      this.closeModal();
    }
  }

  closeModal() {
    this.dismiss.emit("close");
  }

  loginAsBecca() {
    this.auth.loginAsBecca();
    this.closeModal();
  }
}
