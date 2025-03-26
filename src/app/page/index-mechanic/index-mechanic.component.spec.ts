import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexMechanicComponent } from './index-mechanic.component';

describe('IndexMechanicComponent', () => {
  let component: IndexMechanicComponent;
  let fixture: ComponentFixture<IndexMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexMechanicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
