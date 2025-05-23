import { Injectable, Type } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToolRegistryService {
  private componentsMap = new Map<string, () => Promise<Type<any>>>();

  constructor() {
    this.registerComponent('ColourPickerComponent', () =>
      import('../colour-picker/colour-picker.component').then(m => m.ColourPickerComponent));

    this.registerComponent('GuidGeneratorComponent', () =>
      import('../guid-generator/guid-generator.component').then(m => m.GuidGeneratorComponent));

    this.registerComponent('HtmlEncoderComponent', () =>
      import('../html-encoder/html-encoder.component').then(m => m.HtmlEncoderComponent));

    this.registerComponent('PasswordGeneratorComponent', () =>
      import('../password-generator/password-generator.component').then(m => m.PasswordGeneratorComponent));

    this.registerComponent('UrlEncoderComponent', () =>
      import('../url-encoder/url-encoder.component').then(m => m.UrlEncoderComponent));

    this.registerComponent('GreatCircleDistanceComponent', () =>
      import('../great-circle-distance/great-circle-distance.component').then(m => m.GreatCircleDistanceComponent));

    this.registerComponent('SimpleEstimateComponent', () =>
      import('../simple-estimate/simple-estimate.component').then(m => m.SimpleEstimateComponent));

    this.registerComponent('UsernameGeneratorComponent', () =>
      import('../username-generator/username-generator.component').then(m => m.UsernameGeneratorComponent));
  }

  async getComponentsFromConfig(config: any[]): Promise<Array<{ name: string, component: any }>> {
    const tools: Array<{ name: string, component: any }> = [];

    for (const tool of config) {
      const loadComponentFn = this.componentsMap.get(tool.component);
      if (loadComponentFn) {
        const component = await loadComponentFn();
        tools.push({
          name: tool.name,
          component: component
        });
      }
    }

    return tools;
  }

  registerComponent(name: string, loadComponent: () => Promise<Type<any>>) {
    this.componentsMap.set(name, loadComponent);
  }
}
