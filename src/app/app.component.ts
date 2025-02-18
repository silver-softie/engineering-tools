import { Component, ViewChild, ViewContainerRef, ComponentRef, OnInit, ComponentFactoryResolver, TemplateRef, Renderer2 } from '@angular/core';
import { PasswordGeneratorComponent } from './password-generator/password-generator.component';
import { GuidGeneratorComponent } from './guid-generator/guid-generator.component';
import { UrlEncoderComponent } from './url-encoder/url-encoder.component';

interface DynamicComponent {
  component: any,
  headingId: string,
  collapse: string,
  heading: string
}

@Component({
  selector: 'app-root',
  imports: [
    GuidGeneratorComponent,
    PasswordGeneratorComponent,
    UrlEncoderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'engineering-tools';

  @ViewChild('viewContainerRef', { read: ViewContainerRef, static: true }) viewContainerRef!: ViewContainerRef;

  components: DynamicComponent[] = [
    { component: GuidGeneratorComponent, headingId: 'headingOne', collapse: 'collapseOne', heading: 'GUID Generator' },
    //{ component: PasswordGeneratorComponent, headingId: 'headingTwo', collapse: 'collapseTwo', heading: 'Password Generator' },
    //{ component: UrlEncoderComponent, headingId: 'headingThree', collapse: 'collapseThree', heading: 'URL Encoder' }
  ];

  beforeTemplate = `
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne"
          aria-expanded="true" aria-controls="collapseOne">
          GUID Generator
        </button>
      </h2>
      <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne"
        data-bs-parent="#toolAccordion">
        <div class="accordion-body">`;

  afterTemplate = `</div></div></div>`;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.viewContainerRef.clear();
    this.components.forEach(dynamicComponent => {

      // Add markup before the component
      const beforeElement = this.renderer.createElement('div');
      beforeElement.innerHTML = this.beforeTemplate;
      this.viewContainerRef.element.nativeElement.parentElement.appendChild(beforeElement);

      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(dynamicComponent.component);
      this.viewContainerRef.createComponent(componentFactory);

      //this.viewContainerRef.element.nativeElement.parentElement.appendChild(componentFactory.create(dynamicComponent.component));

      // Add markup after the component
      const afterElement = this.renderer.createElement('div');
      afterElement.innerHTML = this.afterTemplate;
      this.viewContainerRef.element.nativeElement.parentElement.appendChild(afterElement);
    });

  }


}

