import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Angular2 Versus SharePointFramework</h1>

            <h2>UserID: {{userId}}</h2>
            <div>
                <div [hidden]="isAdmin" class="displayInline">Admin</div>
                <div [hidden]="isKonsult" class="displayInline">Konsult</div>
            </div>
            {{title}}

            <ul>

  <li class="dropdown">
    <a href="javascript:void(0)" class="dropbtn">Dropdown</a>
    <div class="dropdown-content">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>
  </li>
</ul>
          
     `,     
 styles:[`
 
    .zippy {
      background: green;
    }
          
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #333;
}



li a, .dropbtn {
    display: inline-block;
    color: white;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
}

li a:hover, .dropdown:hover .dropbtn {
    background-color: gre;
       
}

li.dropdown {
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    text-align: left;
}

.dropdown-content a:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
    display: block;
  z-index: 10;
    
}
            
         
      `    ]
})

export class AppComponent {
  public title: string = "app that fetches all list from 0365";
  public currentUser: string = " ";
  public userId;
  public context: any;
  public permission;
  public isAdmin: boolean = true;
  public isKonsult: boolean = true;

  public constructor() {

    this.context = window['context'];
    console.log("context", this.context);


    this._getCurrentUser().then(
      (response) => {
        this.currentUser = response;
        this.userId = response.Id;
        console.log("Current User:", this.currentUser);
        this._getPermission(this.userId).then(
          (response) => {
            this.permission = response.value["0"].RoleTypeKind;

            console.log("Current User Info:", this.permission);
            if (this.permission === 5) {
              this.isAdmin = false;

            }
            else {
              this.isKonsult = false;
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

    var listName = "Tidsrapport";
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('` + listName + `')/roleassignments/GetByPrincipalId('` + userId + `')/RoleDefinitionBindings/`)
      .then((response: Response) => {
        return response.json();
      });
  }
}  