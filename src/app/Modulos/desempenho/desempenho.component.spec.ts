import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesempenhoComponent } from './desempenho.component';

describe('DesempenhoComponent', () => {
  let component: DesempenhoComponent;
  let fixture: ComponentFixture<DesempenhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesempenhoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesempenhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
