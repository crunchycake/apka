import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VisitorDataService } from './services/visitor-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  visitorDataForm: FormGroup;
  allVisitorsDataArray: any = [];
  visitorDataFormEdit: any = [];

  constructor(
    private visitorDataService: VisitorDataService,
    private fb: FormBuilder
  ) {
    this.visitorDataForm = this.fb.group({
      visitorName: ['', Validators.required],
      visitorFamilyName: ['', Validators.required],
      visitorDate: ['', Validators.required],
      visitorHours: ['', Validators.required],
      visitorInstitution: [''],
      visitorComment: [''],
    });

    this.visitorDataFormEdit = this.fb.group({
      visitorNameEdit: ['', Validators.required],
      visitorFamilyNameEdit: ['', Validators.required],
      visitorDateEdit: ['', Validators.required],
      visitorHoursEdit: ['', Validators.required],
      visitorInstitutionEdit: [''],
      visitorCommentEdit: [''],
    });
  }

  ngOnInit() {
    this.getAllVisitorsData();
  }

  addVisitDetails() {
    const dataForm: any = {
      visitorName: this.visitorDataForm.get('visitorName')?.value,
      visitorFamilyName: this.visitorDataForm.get('visitorFamilyName')?.value,
      visitorDate: this.visitorDataForm.get('visitorDate')?.value,
      visitorHours: this.visitorDataForm.get('visitorHours')?.value,
      visitorInstitution: this.visitorDataForm.get('visitorInstitution')?.value,
      visitorComment: this.visitorDataForm.get('visitorComment')?.value,
    };
    console.log(dataForm);

    //wysyłanie do mongoDB

    this.visitorDataService.createVisit(dataForm).subscribe(
      (data: any) => {
        console.log(data);
        alert('dane zostały dodane');
        this.getAllVisitorsData();
      },
      (err) => {
        console.log('błąd wysyłania', err);
      }
    );
  }
//  odbieranie z mongoDB

  getAllVisitorsData() {
    this.visitorDataService.getAllVisitors().subscribe((data: any) => {
      this.allVisitorsDataArray = data;
      console.log(data);
    });
  }
dataFormEditedForm:any;

  editVisitorData(checkedVisitorData:any){
    console.log(checkedVisitorData)

this.dataFormEditedForm = checkedVisitorData

    this.visitorDataFormEdit.setValue({
      visitorNameEdit: checkedVisitorData.visitorName,
      visitorFamilyNameEdit: checkedVisitorData.visitorFamilyName,
      visitorDateEdit: checkedVisitorData.visitorDate,
      visitorHoursEdit: checkedVisitorData.visitorHours,
      visitorInstitutionEdit: checkedVisitorData.visitorInstitution,
      visitorCommentEdit: checkedVisitorData.visitorComment
    })
  }

addVisitDetailsEdit(){
  console.log(this.dataFormEditedForm)

  const noweDane = {
    _id: this.dataFormEditedForm._id,
    visitorName: this.visitorDataFormEdit.get('visitorNameEdit')?.value,
    visitorFamilyName: this.visitorDataFormEdit.get('visitorFamilyNameEdit')?.value,
    visitorDate: this.visitorDataFormEdit.get('visitorDateEdit')?.value,
    visitorHours: this.visitorDataFormEdit.get('visitorHoursEdit')?.value,
    visitorInstitution: this.visitorDataFormEdit.get('visitorInstitutionEdit')?.value,
    visitorComment: this.visitorDataFormEdit.get('visitorCommentEdit')?.value,
  }
  console.log("po edycji", noweDane);

  this.visitorDataService.editVisitorData(noweDane).subscribe( (data: any) => {
    this.getAllVisitorsData();
  })
  }

deleteVisitor(item: any) {
  this.visitorDataService.removeVisitorData(item).subscribe( () => {
    this.getAllVisitorsData()
  })
}

}
