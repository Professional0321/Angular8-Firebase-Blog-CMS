import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImageFormComponent } from './add-image-form.component';

describe('AddImageFormComponent', () => {
  let component: AddImageFormComponent;
  let fixture: ComponentFixture<AddImageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
