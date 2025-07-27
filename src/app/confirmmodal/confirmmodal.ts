import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmmodal',
  standalone: false,
  templateUrl: './confirmmodal.html',
  styleUrl: './confirmmodal.css'
})
export class Confirmmodal {
  @Input() message: string = 'Are you sure?';
  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
  }

  onCancel(): void {
    this.cancelled.emit();
  }
}
