import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NpmDependencyComponent } from './npm-dependency.component';

describe('NpmDependencyComponent', () => {
  let component: NpmDependencyComponent;
  let fixture: ComponentFixture<NpmDependencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NpmDependencyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NpmDependencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
