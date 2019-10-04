import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SignupFormComponent } from "./Components/signup-form/signup-form.component";
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { FeaturesComponent } from "./Components/features/features.component";
import { LatestPostsComponent } from "./Components/latest-posts/latest-posts.component";
import { PostGridItemComponent } from "./Components/post-grid-item/post-grid-item.component";
import { HomepageComponent } from "./Pages/homepage/homepage.component";
import { SecondaryFeatureComponent } from "./Components/secondary-feature/secondary-feature.component";
import { SubscribeComponent } from "./Components/subscribe/subscribe.component";
import { FooterSectionComponent } from "./Components/footer-section/footer-section.component";
import { ScTargetComponent } from "./Components/sc-target/sc-target.component";
import { ArticleComponent } from "./Components/article/article.component";
import { AccountComponent } from "./Pages/account-page/account.component";
import { ListviewItemComponent } from "./Components/listview-item/listview-item.component";
import { EditPageComponent } from "./Pages/edit-page/edit-page.component";
import { LoginFormComponent } from "./Components/login-form/login-form.component";
import { HttpClientModule } from "@angular/common/http";
import { PostsPageComponent } from "./Pages/posts-page/posts-page.component";
import { DataService } from "./Services/data.service";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AddImageFormComponent } from './Components/add-image-form/add-image-form.component';
import { NotYetImplementedComponent } from './Pages/not-yet-implemented/not-yet-implemented.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    NavbarComponent,
    FeaturesComponent,
    LatestPostsComponent,
    PostGridItemComponent,
    HomepageComponent,
    SecondaryFeatureComponent,
    SubscribeComponent,
    FooterSectionComponent,
    ScTargetComponent,
    ArticleComponent,
    AccountComponent,
    ListviewItemComponent,
    EditPageComponent,
    LoginFormComponent,
    PostsPageComponent,
    AddImageFormComponent,
    NotYetImplementedComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
