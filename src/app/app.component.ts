import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  objkey = Object.keys;
  jsondata: any;
  mapdata: any;
  control = {};
  settingFormGroup: FormGroup;
  json2: any;
  showForm = false;
  group: any = {};
  constructor(private http: HttpClient) {
    http.get("./assets/schema.json").subscribe(data => {
      this.jsondata = data;
      this.json2 = this.http.get('../assets/data.json')
        .subscribe((data) => {
          this.mapdata = data;
          this.getdata(this.jsondata, this.mapdata);
          this.showForm = true;
        });
    });

  }


  getdata(json, json2) {
    console.log("form_data", json)
    console.log("map_data", json2)

    for (let keys in json['components']) {
      console.log("form_keys", keys)
      let values = json['components'][keys];

      for (let i = 0; i < values['fields'].length; i++) {

        let field = values['fields'][i];
        this.group = field.name;
        this.control[keys + "--" + field.name] = new FormControl(json2['components'][keys][field.name]);
      }
      this.settingFormGroup = new FormGroup(this.control);
    }
    //  console.log("external",this.jsondata)
  }

  onSubmit() {
    let f_data = this.settingFormGroup.value;
    var temp = {};
    var temp1 = {};
    var result={};
    // console.log("submitted_val",this.settingFormGroup.value);
    for (let k in f_data) {
      let x = (k.split('--'));
     
       if((x[0] in temp1)){
            temp[x[1]] = f_data[k];
            // console.log(temp);
          }
        else{
            temp = {};
            temp[x[1]] = f_data[k];
            // console.log(temp);
        }
       temp1[x[0]] = temp;  
    }
    console.log(temp1);
    result['"components"']=temp1;
    console.log("res",result);
  }

}
