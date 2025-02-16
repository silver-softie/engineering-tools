import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidGeneratorComponent } from './guid-generator.component';

describe('GuidGeneratorComponent', () => {
  let component: GuidGeneratorComponent;
  let fixture: ComponentFixture<GuidGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuidGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
