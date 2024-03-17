import {Directive, EventEmitter, Input, Output} from '@angular/core';
import {WalletModel} from './wallet.model';

export type SortColumn = keyof WalletModel | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface walletSortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[walletsortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdWalletSortableHeader {

  @Input() walletsortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() walletsort = new EventEmitter<walletSortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.walletsort.emit({column: this.walletsortable, direction: this.direction});
  }
}
