import { Component, ComponentFactoryResolver, QueryList, ViewChildren, ViewContainerRef, ViewChild, AfterViewInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ToolRegistryService } from '../services/tool-registry.service';
@Component({
  selector: 'app-home',
  imports: [CommonModule, MatExpansionModule, HttpClientModule, MatSidenavModule, MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  firstToolSelected: boolean = false;
  tools: Array<{ name: string, component: any }> = [];
  selectedTool: { name: string, component: any } | null = null;
  
  @ViewChild('toolContainer', { read: ViewContainerRef, static: true }) toolContainer!: ViewContainerRef;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private http: HttpClient,
    private toolRegistry: ToolRegistryService
  ) { }

  ngOnInit() {
    this.http.get<{ tools: any[] }>('config/all-tools.json').subscribe(config => {
      this.toolRegistry.getComponentsFromConfig(config.tools).then(toolComponents => {
        this.tools = toolComponents;
      });
    });
    this.selectTool(this.tools[0]);
  }

  ngAfterViewInit(): void {
    this.loadSelectedTool();
  }

  selectTool(tool: { name: string, component: any }) {
    this.selectedTool = tool;
    this.loadSelectedTool();
  }

  loadSelectedTool() {
    if (this.selectedTool && this.toolContainer) {
      setTimeout(() => {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.selectedTool!.component);
        this.toolContainer.clear();
        this.toolContainer.createComponent(componentFactory);
      });
    }
  }
}