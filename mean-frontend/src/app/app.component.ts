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

  


}
