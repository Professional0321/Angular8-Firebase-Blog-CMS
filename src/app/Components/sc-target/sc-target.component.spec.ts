import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScTargetComponent } from './sc-target.component';

describe('ScTargetComponent', () => {
  let component: ScTargetComponent;
  let fixture: ComponentFixture<ScTargetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScTargetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
