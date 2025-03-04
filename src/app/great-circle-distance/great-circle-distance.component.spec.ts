import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GreatCircleDistanceComponent } from './great-circle-distance.component';

describe('GreatCircleDistanceComponent', () => {
  let component: GreatCircleDistanceComponent;
  let fixture: ComponentFixture<GreatCircleDistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GreatCircleDistanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GreatCircleDistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
