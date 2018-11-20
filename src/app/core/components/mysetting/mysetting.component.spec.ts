import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MysettingComponent } from './mysetting.component';

describe('MysettingComponent', () => {
  let component: MysettingComponent;
  let fixture: ComponentFixture<MysettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MysettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MysettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
