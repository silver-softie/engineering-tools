import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ColourPickerComponent } from './colour-picker.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ColourPickerComponent', () => {
  let component: ColourPickerComponent;
  let fixture: ComponentFixture<ColourPickerComponent>;
  let mockClipboard: { copy: jest.Mock };
  let debugElement: DebugElement;

  beforeEach(async () => {
    mockClipboard = {
      copy: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ColourPickerComponent],
      providers: [
        { provide: Clipboard, useValue: mockClipboard } // This is the critical line
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColourPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default hex value', () => {
    expect(component.colour).toBe('#000000');
  });

  it('should display the current hex value', () => {
    const paragraph = fixture.debugElement.query(By.css('.card-body p')).nativeElement;
    expect(paragraph.textContent).toContain('#000000');
    component.colour = '#FF5733';
    fixture.detectChanges();
    expect(paragraph.textContent).toContain('#FF5733');
  });

  it('should update the model when the color input changes', () => {
    const colorInput = fixture.debugElement.query(By.css('input[type="color"]')).nativeElement;
    colorInput.value = '#FF5733';
    colorInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    // hex value is lower case
    expect(component.colour).toBe('#ff5733');
  });

  it('should copy the hex value without # to clipboard when button is clicked', () => {
    component.colour = '#FF5733';
    fixture.detectChanges();
    const buttonDE = fixture.debugElement.query(By.css('button'));
    buttonDE.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(mockClipboard.copy).toHaveBeenCalledWith('FF5733');
  });

});