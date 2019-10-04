import { Injectable } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { Post } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class RadioService {
  private shoudEnablePublish = new BehaviorSubject<boolean>(false);
  private create = new BehaviorSubject<boolean>(false);
  private post = new BehaviorSubject<Post>(null);
  private idOfPostToRemove = new BehaviorSubject<string>("");
  constructor() {}

  shouldEnablePublish() {
    return this.shoudEnablePublish.asObservable();
  }

  shouldHideCreate() {
    return this.create.asObservable();
  }

  enablePublish(bool: boolean) {
    this.shoudEnablePublish.next(bool);
  }

  hideCreate(bool: boolean) {
    this.create.next(bool);
  }

  // * ----- editing a post event -----

  startEditing(post: Post) {
    this.post.next(post);
  }

  getPostToEdit() {
    return this.post.asObservable();
  }
}
