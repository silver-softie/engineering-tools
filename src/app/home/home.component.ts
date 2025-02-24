import { Component, ComponentFactoryResolver, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { HtmlEncoderComponent } from "../html-encoder/html-encoder.component";
import { GuidGeneratorComponent } from "../guid-generator/guid-generator.component";
import { PasswordGeneratorComponent } from "../password-generator/password-generator.component";
import { UrlEncoderComponent } from "../url-encoder/url-encoder.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatExpansionModule, HtmlEncoderComponent, GuidGeneratorComponent, PasswordGeneratorComponent, UrlEncoderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tools = [
    { name: 'GUID Generator', component: GuidGeneratorComponent },
    { name: 'HTML Encoder', component: HtmlEncoderComponent },
    { name: 'Password Generator', component: PasswordGeneratorComponent },
    { name: 'URL Encoder', component: UrlEncoderComponent },
  ];

  @ViewChildren('viewContainer', { read: ViewContainerRef }) viewContainers!: QueryList<ViewContainerRef>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  insertTool(tool: any, viewContainer: ViewContainerRef): boolean {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(tool.component);
    viewContainer.clear();
    viewContainer.createComponent(componentFactory);
    return true;
  }

  ngAfterViewInit() {
    this.viewContainers.forEach((viewContainer, index) => {
      this.insertTool(this.tools[index], viewContainer);
    });
  }
}
