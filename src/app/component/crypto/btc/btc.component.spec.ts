import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtcComponent } from './btc.component';

describe('BtcComponent', () => {
  let component: BtcComponent;
  let fixture: ComponentFixture<BtcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtcComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
