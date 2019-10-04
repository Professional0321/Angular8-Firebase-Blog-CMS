import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy
} from "@angular/core";
import { DataService, Post } from "src/app/Services/data.service";
import { AuthService, User } from "src/app/Services/auth.service";
import { Router } from "@angular/router";
import { RadioService } from "src/app/Services/radio.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"]
})
export class EditPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("image", { static: false }) image: ElementRef;
  @ViewChild("form", { static: false }) form: ElementRef;

  sub: Subscription;
  postToEdit: Post;

  showModal = false;
  url: string;
  currentUser: User;

  mode = "create";

  constructor(
    private dataService: DataService,
    private auth: AuthService,
    private router: Router,
    private radio: RadioService
  ) {}

  ngOnInit() {
    // Let navbar know time to enable - shouldEnablePublish
    this.radio.enablePublish(true);
    this.radio.hideCreate(true);

    // get the post to edit
    // if no post load an empty page

    this.sub = this.radio.getPostToEdit().subscribe(post => {
      this.postToEdit = post;
    });
  }

  loadPost() {
    if (this.postToEdit) {
      // image
      this.setImage(this.postToEdit.image);
      // title
      this.form.nativeElement["title"].value = this.postToEdit.title;
      // category
      this.form.nativeElement["category"].value = this.postToEdit.category;
      // body
      this.form.nativeElement["body"].value = this.postToEdit.body;

      //TODO: change 'publish' to 'update'
      // whenever there is a change in the above fields , trigger changeButton()
    }
  }

  async grabName(id: string) {
    let result = await this.dataService.getAuthorNameById(id);

    const name = result["name"];

    return name;
  }

  addCoverImage(event: any) {
    this.showModal = true;
  }

  closeModal(event: string) {
    if (event === "close") {
      this.showModal = false;
    }
  }

  async publish(event: boolean) {
    const _title = this.form.nativeElement[0].value;
    const _category = this.form.nativeElement[1].value;
    const _body = this.form.nativeElement[2].value;
    const _id = this.currentUser.id;
    const _name = await this.grabName(this.currentUser.id);

    const newPost = {
      author: _name,
      author_id: _id,
      title: _title,
      category: _category,
      body: _body,
      image: this.url
    };

    // * ----- send the post request -----
    let id = this.postToEdit ? this.postToEdit.id : "";

    this.dataService
      .publish(newPost, this.mode, id)
      .then(() => {
        console.log("Post successfully published");

        // * ----- Redirect -----
        //to all posts page
        console.log("Redirect to page - posts");
        this.router.navigate(["/posts"]);
      })
      .catch(err => {
        console.log(`Error: ${err.message}`);
      });
  }

  setImage(url: string) {
    this.image.nativeElement.style.backgroundImage = `url(${url})`;
    this.url = url;
  }

  ngAfterViewInit() {
    this.url = this.image.nativeElement.style.backgroundImage;
    this.currentUser = this.auth.getCurrentUser().value;

    // load the post to the page, if there is a post to load
    if (this.postToEdit) {
      this.mode = "edit";
      this.loadPost();
    } else {
      this.mode = "create";
    }
  }

  ngOnDestroy(): void {
    this.radio.enablePublish(false);
    this.radio.hideCreate(false);
    this.sub.unsubscribe();
  }
}
