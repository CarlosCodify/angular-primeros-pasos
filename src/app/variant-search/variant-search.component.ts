import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'app-variant-search',
  templateUrl: './variant-search.component.html',
  styleUrls: ['./variant-search.component.css']
})
export class VariantSearchComponent {
  searchControl = new FormControl();
  products: any[] = [];

  constructor(private http: HttpClient) {
    this.setupSearch();
  }

  setupSearch() {
    this.searchControl.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap(searchTerm => this.searchVariants(searchTerm))
    ).subscribe(variants => {
      this.products = variants;
    });
  }

  searchVariants(searchTerm: string) {
    const apiUrl = 'http://localhost:3000/api/v1/companies/23/products/search'; // Replace with your API endpoint URL
    const params = { q: searchTerm };

    return this.http.get<any[]>(apiUrl, { params });
  }

  selectVariant(variant: any) {
    // Implement your logic to handle the selected variant
    console.log(variant);
  }
}
