import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltaOptionChainComponent } from './delta-option-chain.component';

describe('DeltaOptionChainComponent', () => {
  let component: DeltaOptionChainComponent;
  let fixture: ComponentFixture<DeltaOptionChainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeltaOptionChainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeltaOptionChainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
