import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Confirmmodal } from './confirmmodal';

describe('Confirmmodal', () => {
  let component: Confirmmodal;
  let fixture: ComponentFixture<Confirmmodal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Confirmmodal],
    }).compileComponents();

    fixture = TestBed.createComponent(Confirmmodal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
