import {Component, OnDestroy, OnInit} from '@angular/core';

import { IProduct } from '../product';
import { ProductService } from '../product.service';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'pm-product-shell-list',
  templateUrl: './product-shell-list.component.html'
})
export class ProductShellListComponent implements OnInit, OnDestroy {
// export class ProductShellListComponent implements OnInit {
  pageTitle: string = 'Products';
  errorMessage: string;
  products: IProduct[];
    selectedProduct: IProduct | null;
    sub: Subscription;

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.sub = this.productService.selectedProductChanges$.subscribe(
            selectedProduct => this.selectedProduct = selectedProduct
        );

        this.productService.getProducts().subscribe(
          (products: IProduct[]) => {
            this.products = products;
          },
          (error: any) => this.errorMessage = <any>error
        );
    }

    onSelected(product: IProduct): void {
        // this.productService.currentProduct = product;
        this.productService.changeSelectedProduct(product);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
