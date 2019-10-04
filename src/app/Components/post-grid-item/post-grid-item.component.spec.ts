import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostGridItemComponent } from './post-grid-item.component';

describe('PostGridItemComponent', () => {
  let component: PostGridItemComponent;
  let fixture: ComponentFixture<PostGridItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostGridItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
