import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarMechanicComponent } from './menubar-mechanic.component';

describe('MenubarMechanicComponent', () => {
  let component: MenubarMechanicComponent;
  let fixture: ComponentFixture<MenubarMechanicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenubarMechanicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenubarMechanicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
