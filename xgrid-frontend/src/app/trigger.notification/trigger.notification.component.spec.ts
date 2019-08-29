import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Trigger.NotificationComponent } from './trigger.notification.component';

describe('Trigger.NotificationComponent', () => {
  let component: Trigger.NotificationComponent;
  let fixture: ComponentFixture<Trigger.NotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Trigger.NotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Trigger.NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
