import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `<h1>Angular2 Versus SharePointFramework</h1>

            <h2>UserID: {{userId}}</h2>
            <div>
                <div [hidden]="isAdmin" class="displayInline">Admin</div>
                <div [hidden]="isKonsult" class="displayInline">Konsult</div>
            </div>
            {{title}},

<div class="dropdown-content">
  <div *ngFor='let term of terms' class="dropbtn">
    {{ term }} 
  </div>
</div>



<br/>
<br/>
<div class="dropdown">
  <button>Projects</button>
  <ul class="dropdown-content">
    <li *ngFor='let term of terms'>
      {{ term }} 
    </li>
  </ul>
</div>

      
    
     `,     
 styles:[`

ul, li {
  margin: 0px;
  padding: 0px;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 140px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  	list-style-type: none;
    z-index:10;
}
.dropdown-content li {
	padding:10px;
    border-bottom:solid 1px #b3cccc;
    position:relative;
    text-align: center;
}

.dropdown:hover .dropdown-content {
    display: block;
}
button {
	min-width: 140px;
    min-height:50px;
    font-size:15px;
}

`]
})

export class AppComponent {
  public title: string = "app that fetches all list from 0365";
  public currentUser: string = " ";
  public userId;
  public context: any;
  public permission;
  public isAdmin: boolean = true;
  public isKonsult: boolean = true;
  public terms: Array<any> =[];
  public constructor() {

    this.context = window['context'];
    console.log(this.context.terms);
 
    //var terms = [];
    var termsJSON = this.context.terms.Project;
    for (var key in termsJSON){
        var attrName = key;
         //term properties:
        var attrValue = termsJSON[key];
        if(termsJSON[key].isActive === true)
        {
          console.log("test");
        }
       this.terms.push(attrName);
    }
    console.log(this.terms);
    

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