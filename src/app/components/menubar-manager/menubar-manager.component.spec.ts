import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubarManagerComponent } from './menubar-manager.component';

describe('MenubarManagerComponent', () => {
  let component: MenubarManagerComponent;
  let fixture: ComponentFixture<MenubarManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenubarManagerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenubarManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
