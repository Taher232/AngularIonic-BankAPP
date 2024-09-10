import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss'],
})
export class DeleteComponent {
  @Input() item: any; // This receives the item to be deleted from the parent component
  @Output() deleteEvent = new EventEmitter<any>(); // Emits the item to the parent when deletion is confirmed
  @Output() cancelEvent = new EventEmitter<void>(); // Emits when the action is canceled

  constructor() {}

  // Function to trigger the delete event
  delete(): void {
    this.deleteEvent.emit(this.item); // Emit the item to the parent component
  }

  // Function to trigger the cancel event
  cancel(): void {
    this.cancelEvent.emit(); // Emit cancel event to the parent component
  }
}
