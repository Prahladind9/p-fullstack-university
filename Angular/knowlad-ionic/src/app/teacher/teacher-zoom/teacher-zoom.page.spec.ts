import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TeacherZoomPage } from './teacher-zoom.page';

describe('TeacherZoomPage', () => {
  let component: TeacherZoomPage;
  let fixture: ComponentFixture<TeacherZoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherZoomPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TeacherZoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
