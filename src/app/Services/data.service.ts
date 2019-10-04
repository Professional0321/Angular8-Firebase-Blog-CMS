import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subscription } from "rxjs";
import { environment } from "src/environments/environment";

export class Post {
  id: string;
  title: string;
  author: string;
  body: string;
  image: string;
  date: any;
  category: string;
  authorId: string;

  constructor(
    id: string,
    title: string,
    author: string,
    body: string,
    image: string,
    date: any,
    category: string,
    authorId: string
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.body = body;
    this.image = image;
    this.date = date;
    this.category = category;
    this.authorId = authorId;
  }
}

@Injectable()
export class DataService implements OnInit, OnDestroy {
  // private baseUrl = `http://localhost:5000/blogcms-8cd5c/us-central1/api`;
  private baseUrl = `https://us-central1-blogcms-8cd5c.cloudfunctions.net/api`;

  private sub: Subscription;
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  async getPosts() {
    const url = `${this.baseUrl}/posts`;
    return await this.http.get<Post[]>(url).toPromise();
  }

  getPostById(id: string) {
    const url = `${this.baseUrl}/posts/${id}`;
    return this.http.get<Post>(url).toPromise();
  }

  publish(
    newPost: {
      author: string;
      author_id: string;
      title: string;
      category: string;
      body: string;
      image: string;
    },
    mode: string,
    id?: string
  ) {
    if (mode === "create") {
      const url = `${this.baseUrl}/posts`;
      return this.http.post(url, newPost, { responseType: "text" }).toPromise();
    } else {
      const url = `${this.baseUrl}/posts/${id}`;
      return this.http.put(url, newPost, { responseType: "text" }).toPromise();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getAuthorNameById(id: string) {
    const url = `${this.baseUrl}/users/${id}`;

    return this.http.get(url).toPromise();
  }

  getRandomPic() {
    const baseUrl =
      "https://api.unsplash.com/photos/random?orientation=landscape&count=1&";
    const accessKey = `client_id=${environment.unsplashKey}`;
    return this.http.get(`${baseUrl}${accessKey}`).toPromise();
  }

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/posts/${id}`).toPromise();
  }
}
