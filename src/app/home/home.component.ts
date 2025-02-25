import { Component, ComponentFactoryResolver, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToolRegistryService } from '../services/tool-registry.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, MatExpansionModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  tools: Array<{ name: string, component: any }> = [];

  @ViewChildren('viewContainer', { read: ViewContainerRef }) viewContainers!: QueryList<ViewContainerRef>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient,
    private toolRegistry: ToolRegistryService
  ) {
  }

  ngOnInit() {
    this.http.get<{ tools: any[] }>('config/all-tools.json').subscribe(config => {
      this.toolRegistry.getComponentsFromConfig(config.tools).then(toolComponents => {
          this.tools = toolComponents;
          this.viewContainers.forEach((viewContainer, index) => {
            this.insertTool(this.tools[index], viewContainer);
          });
        });
    });
  }

  insertTool(tool: any, viewContainer: ViewContainerRef): boolean {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(tool.component);
    viewContainer.clear();
    viewContainer.createComponent(componentFactory);
    return true;
  }

  ngAfterViewInit() {
    this.viewContainers.changes.subscribe(() => {
      this.viewContainers.forEach((viewContainer, index) => {
          this.insertTool(this.tools[index], viewContainer);
      });
    });
  }
}