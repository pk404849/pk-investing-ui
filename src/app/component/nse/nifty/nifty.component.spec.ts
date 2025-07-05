import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NiftyComponent } from './nifty.component';

describe('NiftyComponent', () => {
  let component: NiftyComponent;
  let fixture: ComponentFixture<NiftyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NiftyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
