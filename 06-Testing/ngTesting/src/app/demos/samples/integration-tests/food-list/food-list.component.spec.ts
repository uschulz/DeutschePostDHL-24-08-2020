import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FoodService } from '../../food/food.service';
import { RatingPipe } from '../../pipe/rating.pipe';
import { FoodRowComponent } from '../food-row/food-row.component';
import { FoodListComponent } from './food-list.component';

describe('Component - Integration Test', () => {
  let fs;
  const foodData = [
    { name: 'Pad Thai', rating: 5 },
    { name: 'Butter Chicken', rating: 5 },
    { name: 'Cannelloni', rating: 4 },
    { name: 'Cordon Bleu', rating: 2 },
  ];
  const serviceResult = [
    { name: 'Pad Thai', rating: 5 },
    { name: 'Butter Chicken', rating: 5 },
    { name: 'Cannelloni', rating: 4 },
  ];

  const deleteItem = { name: 'Cordon Bleu', rating: 2 };

  let fixture: ComponentFixture<FoodListComponent>;
  let comp: FoodListComponent;
  let de: DebugElement;

  beforeEach(() => {
    fs = jasmine.createSpyObj(['getItems', 'deleteItem']);

    const module = {
      declarations: [FoodListComponent, FoodRowComponent, RatingPipe],
      providers: [{ provide: FoodService, useValue: fs }],
      schemas: [NO_ERRORS_SCHEMA],
    };

    TestBed.configureTestingModule(module);
    fixture = TestBed.createComponent(FoodListComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
  });

  it('should render each FoodItem as FoodItemRow', () => {
    fs.getItems.and.returnValue(of(foodData));
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.directive(FoodRowComponent));
    expect(rows.length).toEqual(4);
    expect(rows[0].componentInstance.food.name).toEqual('Pad Thai');
  });

  it('should execute delete when emitted by child item', () => {
    fs.getItems.and.returnValue(of(foodData));
    fixture.detectChanges();

    spyOn(comp, 'deleteFood');
    const deRow = de.query(By.directive(FoodRowComponent));
    const row = deRow.componentInstance;
    row.delete.emit(deleteItem);

    expect(comp.deleteFood).toHaveBeenCalledWith(deleteItem);

    // Think why this does not give three
    fixture.detectChanges();
    const rows = de.queryAll(By.directive(FoodRowComponent));
    expect(rows.length).toEqual(4);
  });
});
