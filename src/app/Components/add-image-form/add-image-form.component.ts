import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgForm } from "@angular/forms";
import { DataService } from "src/app/Services/data.service";

@Component({
  selector: "app-add-image-form",
  templateUrl: "./add-image-form.component.html",
  styleUrls: ["./add-image-form.component.scss"]
})
export class AddImageFormComponent implements OnInit {
  @Output() dismiss = new EventEmitter<string>();
  @Output() imageUrl = new EventEmitter<string>();
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    // grab the url here
    const url = form.value["imageUrl"];
    this.imageUrl.emit(url);
    // set the image to the post data in the parent component

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

  async randomize() {
    // get random pic from unspash
    const data = await this.dataService.getRandomPic();
    // unwrap unsplash api json
    const url = data[0].urls.regular;
    this.imageUrl.emit(url);
    // ----- ------------ -----
    this.dismiss.emit("close");
  }
}
