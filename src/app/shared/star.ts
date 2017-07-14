import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core'

@Component({
    selector: 'ai-star', //ai for acme inc, since whole application shares it, not using pm or mh prefix
    templateUrl: 'star.html',
})

export class StarComponent implements OnChanges {
    //rating pass by Container (in this case, OrderListComponent)
    @Input() rating: number;
    starWidth: number; //calculated based on the rating
    @Output() ratingClicked: EventEmitter<string> = 
        new EventEmitter<string>();

    //for partial stars
    ngOnChanges(): void {
        this.starWidth = this.rating * 86/5;
    }
}