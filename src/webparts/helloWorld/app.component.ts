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
  public currentUser: string = " ";
  public userId;
  public context: any;
  public permission;
  public isAdmin:boolean= false;

  public constructor() {

    this.context = window['context'];
    console.log("context", this.context);
 

       this._getCurrentUser().then(
      (response) => {
               this.currentUser= response;
              this.userId = response.Id;
        console.log("Current User:" ,this.currentUser);
                  this._getPermission(this.userId).then(
      (response) => {
        this.permission=response.value["0"].RoleTypeKind;
 
        console.log("Current User Info:" ,this.permission);
        if(this.permission === 5){
          this.isAdmin = true;
          
        }
      });

      });
 
  }


    private _getCurrentUser(): Promise<any> {
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/currentUser`)
      .then((response: Response) => {
        return response.json();
      });
  }
private _getPermission(userId): Promise<any> {
 
  var listName= "Tidsrapport";
  return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('`+listName+`')/roleassignments/GetByPrincipalId('`+userId+`')/RoleDefinitionBindings/`)
      .then((response: Response) => {
        return response.json();
      });
  }
}  