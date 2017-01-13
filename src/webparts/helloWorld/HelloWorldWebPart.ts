import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-client-base';


// init Angular 2
import 'reflect-metadata';
require('zone.js');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
//

import terms from './terms/terms';

import styles from './HelloWorld.module.scss';
import * as strings from 'helloWorldStrings';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';

//import * as terms from './terms/terms.txt';

import MockHttpClient from './MockHttpClient';

export interface ISPLists {
    value: ISPList[];
}

export interface ISPList {
    Title: string;
    Id: string;
}


export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public spContext:IWebPartContext;
  public constructor(context: IWebPartContext) {
    super(context);
    this.spContext = context;


    window["_spPageContextInfoNew"] = this.context.pageContext;
    window["context"] = this.context;
    window["context"].terms = terms;

    console.log("in HelloWorldWebPart,  context", context);



  }
    
 

  public render(): void {
    /*<div id="spListContainer" />*/
    this.domElement.innerHTML = `
      
      <my-app></my-app>

      `;

      platformBrowserDynamic().bootstrapModule(AppModule);

      //this._renderListAsync();
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
