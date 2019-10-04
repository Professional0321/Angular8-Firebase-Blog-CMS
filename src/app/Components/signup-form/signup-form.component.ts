import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { AuthService } from "src/app/Services/auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-signup-form",
  templateUrl: "./signup-form.component.html",
  styleUrls: ["./signup-form.component.scss"]
})
export class SignupFormComponent implements OnInit {
  @Output() dismiss = new EventEmitter<string>();

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value["signup-email"];
    const password = form.value["signup-password"];

    this.auth.signup(email, password);

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
}
