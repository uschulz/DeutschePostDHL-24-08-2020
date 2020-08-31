import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleAuthFakeAsyncComponent } from './simple-auth-fake-async.component';

describe('Component - AsyncTest - FakeAsync', () => {
  let component: SimpleAuthFakeAsyncComponent;
  let fixture: ComponentFixture<SimpleAuthFakeAsyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleAuthFakeAsyncComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleAuthFakeAsyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
