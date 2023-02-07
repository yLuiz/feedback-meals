import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackRefeicaoComponent } from './feedback-refeicao.component';

describe('FeedbackRefeicaoComponent', () => {
  let component: FeedbackRefeicaoComponent;
  let fixture: ComponentFixture<FeedbackRefeicaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackRefeicaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackRefeicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
