import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'filter'
})

export class FilterPipe implements PipeTransform {

    transform(value: any[], filterBy: string): any[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase(): null; //handles case if no filterBy string defined, if so, converts to lowercase to have case insensitive comparison
        return filterBy ? value.filter((product: any) =>
            product.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
     }

}
