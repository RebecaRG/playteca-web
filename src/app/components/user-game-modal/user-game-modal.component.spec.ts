import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGameModalComponent } from './user-game-modal.component';

describe('UserGameModalComponent', () => {
  let component: UserGameModalComponent;
  let fixture: ComponentFixture<UserGameModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGameModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
