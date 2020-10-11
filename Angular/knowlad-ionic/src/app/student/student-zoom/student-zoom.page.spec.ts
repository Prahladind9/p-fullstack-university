import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentZoomPage } from './student-zoom.page';

describe('StudentZoomPage', () => {
  let component: StudentZoomPage;
  let fixture: ComponentFixture<StudentZoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentZoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentZoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
