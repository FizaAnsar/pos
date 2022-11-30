import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTablesComponent } from './reserve-tables.component';

describe('ReserveTablesComponent', () => {
  let component: ReserveTablesComponent;
  let fixture: ComponentFixture<ReserveTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReserveTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
