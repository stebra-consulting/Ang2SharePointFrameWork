import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Angular2 Versus SharePointFramework</h1>
            {{title}}
            <div [innerHTML]="listsAsHtml"></div>
            
            `
})

export class AppComponent {
  public title: string = "app that fetches all list from 0365";
  public listsAsHtml: string = "loading...";
  public lists: Array<any>;

  public context: any;

  public constructor() {

    this.context = window['context'];
    console.log("context", this.context);
    this._getListData().then(
      (response) => {
        console.log(response.value);
        this.lists = response.value;

        this.listsAsHtml = "<h3>Lists:</h3>"
        for (let list of this.lists) {
          //console.log(entry); // 1, "string", false
          this.listsAsHtml += "</br>";
          this.listsAsHtml +="<b>" + list.Title + "</b></br>";
          this.listsAsHtml +="<p>" + list.Description + "</p></br>";
          this.listsAsHtml += "</br>";
        }

      });
  }

  private _getListData(): Promise<any> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`)
      .then((response: Response) => {
        return response.json();
      });
  }

}  