import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { FoodListComponent } from './food-list.component';
import { FoodRowComponent } from '../food-row/food-row.component';
import { RatingPipe } from '../../pipe/rating.pipe';
import { FoodService } from '../../food/food.service';

describe('Component - Integration Test', () => {
  let mockFS;
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
  let fixture: ComponentFixture<FoodListComponent>;

  beforeEach(() => {
    mockFS = jasmine.createSpyObj(['getItems', 'deleteItem']);

    const module = {
      declarations: [FoodListComponent, FoodRowComponent, RatingPipe],
      providers: [{ provide: FoodService, useValue: mockFS }],
      schemas: [NO_ERRORS_SCHEMA],
    };

    TestBed.configureTestingModule(module);
    fixture = TestBed.createComponent(FoodListComponent);
  });

  it('should render each FoodItem as FoodItemRow', () => {
    mockFS.getItems.and.returnValue(of(foodData));
    mockFS.deleteItem.and.returnValue(of(serviceResult));
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.directive(FoodRowComponent));
    expect(rows.length).toEqual(4);
    expect(rows[0].componentInstance.food.name).toEqual('Pad Thai');
  });
});
