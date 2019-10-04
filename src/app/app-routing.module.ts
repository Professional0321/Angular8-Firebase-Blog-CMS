import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomepageComponent } from "./Pages/homepage/homepage.component";
import { ArticleComponent } from "./Components/article/article.component";
import { AccountComponent } from "./Pages/account-page/account.component";
import { EditPageComponent } from "./Pages/edit-page/edit-page.component";
import { PostsPageComponent } from "./Pages/posts-page/posts-page.component";
import { AuthGuardService } from "./Services/auth-guard.service";
import { NotYetImplementedComponent } from "./Pages/not-yet-implemented/not-yet-implemented.component";

const routes: Routes = [
  { path: "", component: HomepageComponent },

  {
    path: "account",
    canActivate: [AuthGuardService],
    component: AccountComponent
  },

  { path: "posts", component: PostsPageComponent },
  { path: "posts/:id", component: ArticleComponent },

  {
    path: "create",
    canActivate: [AuthGuardService],
    component: EditPageComponent
  },

  {
    path: "edit/:id",
    canActivate: [AuthGuardService],
    component: EditPageComponent
  },

  { path: "not-implemented", component: NotYetImplementedComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled" })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
