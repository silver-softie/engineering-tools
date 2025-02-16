import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UrlEncoderComponent } from './url-encoder.component';

describe('UrlEncoderComponent', () => {
  let component: UrlEncoderComponent;
  let fixture: ComponentFixture<UrlEncoderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UrlEncoderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UrlEncoderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
