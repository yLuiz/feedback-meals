import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRefeicaoComponent } from './menu-refeicao.component';

describe('MenuRefeicaoComponent', () => {
  let component: MenuRefeicaoComponent;
  let fixture: ComponentFixture<MenuRefeicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuRefeicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuRefeicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
