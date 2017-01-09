import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Angular2 Versus SharePointFramework</h1>

            <h2>UserID: {{userId}}</h2>
          
            {{title}}
            
         
            `
})

export class AppComponent {
  public title: string = "app that fetches all list from 0365";
  //public listsAsHtml: string = "loading...";
  //public lists: Array<any>;
  public currentUser: string = " ";
  public userId;
  public context: any;
  public permission: string = " ";

  public constructor() {

    this.context = window['context'];
    console.log("context", this.context);
    /*this._getListData().then(
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

      });*/

       this._getCurrentUser().then(
      (response) => {
               this.currentUser= response;
              this.userId = response.Id;
        console.log("Current User:" ,this.currentUser);
                  this._getPermission(this.userId).then(
      (response) => {
  this.permission=response;
        console.log("Current User:" ,this.currentUser);

      });

      });
 
  }

 /* private _getListData(): Promise<any> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`)
      .then((response: Response) => {
        return response.json();
      });
  }*/

    private _getCurrentUser(): Promise<any> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/currentUser`)
      .then((response: Response) => {
        return response.json();
      });
  }
private _getPermission(userId): Promise<any> {
  var listGuid = "99471df6-0ae8-46c8-9fa6-7bfb3e4bfd33";
  //var listName= "Tidsrapport";
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/SP.AppContextSite(@target)/Web/Lists(guid' `+listGuid+`')/roleassignments/GetByPrincipalId('`+userId+`')/RoleDefinitionBindings?@target='`+ this.context.pageContext.web.absoluteUrl +  `'`)
    //return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `_api/web/lists/GetByTitle('`+listName+`')/roleassignments/GetByPrincipalId('`+userId+`')/RoleDefinitionBindings`)
      .then((response: Response) => {
        return response.json();
      });
  }
}  