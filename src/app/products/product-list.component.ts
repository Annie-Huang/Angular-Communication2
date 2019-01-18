import {
    AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild,
    ViewChildren
} from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';
import {NgModel} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {CriteriaComponent} from "../shared/criteria/criteria.component";
import {ProductParameterService} from "./product-parameter.service";

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
    pageTitle: string = 'Product List';
    // listFilter: string;
    // showImage: boolean;
    includeDetail: boolean = true;
    // @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
    // parentListFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    // @ViewChild('filterElement') filterElementRef: ElementRef;
    // // This doesn't have give access to the native element:
    // @ViewChild(NgModel) filterInput: NgModel;

    // // // This whole set of code is just to deal with *ngIf="products"
    // // private _sub: Subscription;
    // // private _filterInput: NgModel;
    // // get filterInput(): NgModel {
    // //     return this._filterInput;
    // // }
    // // // // This will set the subscribing every time use click show/hide image. you want to do it only once.
    // // // @ViewChild(NgModel)
    // // // set filterInput(value: NgModel) {
    // // //     this._filterInput = value;
    // // //     console.log(this.filterInput);
    // // //     if (this.filterInput) {
    // // //         console.log('Subscribing');
    // // //         this.filterInput.valueChanges.subscribe(
    // // //             () => {
    // // //                 this.performFilter(this.listFilter);
    // // //                 console.log('Performed the filter');
    // // //             }
    // // //         );
    // // //     }
    // // //     if (this.filterElementRef) {
    // // //         this.filterElementRef.nativeElement.focus();
    // // //     }
    // // // }
    // // @ViewChild(NgModel)
    // // set filterInput(value: NgModel) {
    // //     this._filterInput = value;
    // //     console.log(this.filterInput);
    // //     if (this.filterInput && !this._sub) {
    // //         console.log('Subscribing');
    // //         this._sub = this.filterInput.valueChanges.subscribe(
    // //             () => {
    // //                 this.performFilter(this.listFilter);
    // //                 console.log('Performed the filter');
    // //             }
    // //         );
    // //     }
    // //     if (this.filterElementRef) {
    // //         this.filterElementRef.nativeElement.focus();
    // //     }
    // // }

    // @ViewChildren('filterElement, nameElement') inputElementRefs: QueryList<ElementRef>;
    // @ViewChildren(NgModel) inputElementRefs: QueryList<NgModel>;

    // // Method 2.
    // private _listFilter: string;
    // get listFilter(): string {
    //     return this._listFilter;
    // }
    // set listFilter(value: string) {
    //     this._listFilter = value;
    //     this.performFilter(this.listFilter);
    // }

    filteredProducts: IProduct[];
    products: IProduct[];
    @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;

    get showImage(): boolean {
        return this.productParameterService.showImage;
    }
    set showImage(value: boolean) {
        this.productParameterService.showImage = value;
    }
    constructor(private productService: ProductService,
                private productParameterService: ProductParameterService) {
    }

    // ngAfterViewInit(): void {
    //     this.parentListFilter = this.filterComponent.listFilter;
    // }

    // ngAfterViewInit(): void {
    //     // console.log(this.filterElementRef);
    //
    //     // Make it focus on the input field whenever the page is loaded.
    //     if (this.filterElementRef) {
    //         this.filterElementRef.nativeElement.focus();
    //     }
    //
    //     // console.log(this.inputElementRefs);
    //
    //     // console.log(this.filterInput);
    //
    //     // Method 3.
    //     this.filterInput.valueChanges.subscribe(
    //         () => this.performFilter(this.listFilter)
    //     );
    // }

    // No way the parents can detect the child component changes value, so the performFilter coudldn't be triggered.
    // The child needs to pass the notification of the value change to parent.
    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.filterComponent.listFilter = this.productParameterService.filterBy;
                // this.performFilter(this.listFilter);
                // this.performFilter(this.parentListFilter);
                // this.performFilter();
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    onValueChange(value: string): void {
        this.productParameterService.filterBy = value;
        this.performFilter(value);
    }

    // // Method 1.
    // onFilterChange (filter: string): void {
    //     this.listFilter = filter;
    //     this.performFilter(this.listFilter);
    // }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
