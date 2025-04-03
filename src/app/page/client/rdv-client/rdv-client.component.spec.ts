import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdvClientComponent } from './rdv-client.component';

describe('RdvClientComponent', () => {
  let component: RdvClientComponent;
  let fixture: ComponentFixture<RdvClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RdvClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RdvClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
