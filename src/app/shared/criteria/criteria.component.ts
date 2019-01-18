import {
    AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
    ViewChild
} from '@angular/core';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, OnChanges, AfterViewInit {
    // listFilter: string;
    @Input() displayDetail: boolean;
    @Input() hitCount: number;
    hitMessage: string;
    @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('filterElement') filterElementRef: ElementRef;

    private _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.valueChange.emit(value);
    }

    constructor() { }

    ngAfterViewInit(): void {
        // Make it focus on the input field whenever the page is loaded.
        if (this.filterElementRef) {
            this.filterElementRef.nativeElement.focus();
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
        if (changes['hitCount'] && !changes['hitCount'].currentValue) {
            this.hitMessage = 'No matches found';
        } else {
            this.hitMessage = 'Hits:' + this.hitCount;
        }
    }

    ngOnInit() {
    }

}
