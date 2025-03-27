import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackofficeItemComponent } from './backoffice-item.component';

describe('BackofficeItemComponent', () => {
  let component: BackofficeItemComponent;
  let fixture: ComponentFixture<BackofficeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackofficeItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BackofficeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
