import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlEncoderComponent } from './html-encoder.component';

describe('HtmlEncoderComponent', () => {
  let component: HtmlEncoderComponent;
  let fixture: ComponentFixture<HtmlEncoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlEncoderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HtmlEncoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
