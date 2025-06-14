import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, SearchBarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event when input changes', fakeAsync(() => {
    spyOn(component.search, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input');
    
    inputElement.value = 'test';
    inputElement.dispatchEvent(new Event('input'));
    
    tick(300); // Wait for debounce time
    
    expect(component.search.emit).toHaveBeenCalledWith('test');
  }));

  it('should not emit search event for empty input', fakeAsync(() => {
    spyOn(component.search, 'emit');
    const inputElement = fixture.nativeElement.querySelector('input');
    
    inputElement.value = '';
    inputElement.dispatchEvent(new Event('input'));
    
    tick(300); // Wait for debounce time
    
    expect(component.search.emit).toHaveBeenCalledWith('');
  }));
});