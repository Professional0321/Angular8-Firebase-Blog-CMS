import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryFeatureComponent } from './secondary-feature.component';

describe('SecondaryFeatureComponent', () => {
  let component: SecondaryFeatureComponent;
  let fixture: ComponentFixture<SecondaryFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
