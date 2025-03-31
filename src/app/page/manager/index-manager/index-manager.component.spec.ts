import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexManagerComponent } from './index-manager.component';

describe('IndexManagerComponent', () => {
  let component: IndexManagerComponent;
  let fixture: ComponentFixture<IndexManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
