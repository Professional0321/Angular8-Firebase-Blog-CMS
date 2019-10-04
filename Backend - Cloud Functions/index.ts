import * as functions from "firebase-functions";
import * as express from "express";
import * as body_parser from "body-parser";
import * as admin from "firebase-admin";

class Post {
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

interface FirestoreResponseData {
  id: string;
  title: string;
  author: string;
  body: string;
  image: string;
  date: any;
  category: string;
  authorId: string;
}

const app = express();

admin.initializeApp({
  credential: admin.credential.applicationDefault()
});

const db = admin.firestore();

// Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});
app.use(body_parser.json());

//* Routes Handling
app.get("/", (req, res, next) => {
  res.send({
    message: "You have successfully reached API link."
  });
});

app.get("/posts", (req, res, next) => {
  const _empty = {
    message: "No post available"
  };

  db.collection("posts")
    .orderBy("date", "desc")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        res.status(200).send(_empty);
      } else {
        const result: any[] = [];
        snapshot.docs.map(doc => {
          const id = doc.id;
          const data: any | FirestoreResponseData = doc.data();
          const post = new Post(
            id,
            data.title,
            data.author,
            data.body,
            data.image,
            data.date,
            data.category,
            data.author_id
          );
          result.push(post);
        });
        res.json(result);
      }
    })
    .catch(error => console.log(error));
});

app.get("/posts/:id", (req, res, next) => {
  const id = req.params.id;
  db.doc(`/posts/${id}`)
    .get()
    .then(doc => {
      res.json(doc.data());
    })
    .catch(err => console.log(err));
});

app.post("/posts", (req, res, next) => {
  //* database并不认同你的class, class一般还是留给自己用的。
  const post = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    image: req.body.image,
    author_id: req.body.author_id,
    date: admin.firestore.Timestamp.now(), // posted_on firestore timestamp
    category: req.body.category
  };

  db.collection("posts")
    .add(post)
    .then(() => res.send("Post request - success"))
    .catch(err => console.log(err));
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;
  db.doc(`/posts/${id}`)
    .update({
      body: req.body.body,
      title: req.body.title,
      image: req.body.image,
      category: req.body.category
    })
    .then(() => {
      console.log("successfully updated");
      res.end();
    })
    .catch(err => console.log(err));
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;

  db.doc(`/posts/${id}`)
    .delete()
    .then(() => {
      console.log("post deleted");
      res.status(200).end();
    })
    .catch(err => console.log(err));
});

// * ----- User -----

app.get("/users/:id", (req, res, next) => {
  const _empty = {
    message: "No user is found"
  };
  const targetId = req.params.id;

  db.collection("users")
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        res.status(200).send(_empty);
      } else {
        snapshot.docs.map(doc => {
          const data:
            | any
            | {
                auth_id: string;
                name: string;
                username: string;
              } = doc.data();
          if (data.auth_id === targetId) {
            const user = {
              auth_id: data.auth_id,
              name: data.name,
              username: data.username
            };
            res.json(user);
          }
        });
      }
    })
    .catch(error => console.log(error));
});

export const api = functions.https.onRequest(app);

// * MyRoutes

// const apiUrl = "http://localhost:5000/blogcms-8cd5c/us-central1/api";

//Get all posts - type: GET
// Add new post - type: POST
// * `${apiUrl}/posts`

//Get single post - type: GET
//* `${apiUrl}/posts/${id}'

// Update single post - type: PUT
// Delete single post - type: DELETE

// Get single user with id - type: GET
// * ${apiUrl}/users/${:id}
