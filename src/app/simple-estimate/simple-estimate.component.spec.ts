import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleEstimateComponent } from './simple-estimate.component';

describe('SimpleEstimateComponent', () => {
  let component: SimpleEstimateComponent;
  let fixture: ComponentFixture<SimpleEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleEstimateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
