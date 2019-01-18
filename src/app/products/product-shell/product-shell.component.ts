///<reference path="../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from "../product.service";
import {Subscription} from "rxjs/Subscription";

@Component({
    templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit, OnDestroy {
// export class ProductShellComponent implements OnInit {
    pageTitle: string = 'Products';
    monthCount: number;
    sub: Subscription;


    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.sub = this.productService.selectedProductChanges$.subscribe(selectedProduct => {
            if (selectedProduct) {
                const start = new Date(selectedProduct.releaseDate);
                const now = new Date();
                this.monthCount = now.getMonth() - start.getMonth()
                    + (12 * (now.getFullYear() - start.getFullYear()));
            } else {
                this.monthCount = 0;
            }

        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
