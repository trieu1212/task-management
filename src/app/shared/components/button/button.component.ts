import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() label = 'Click'
  @Input() type = 'primary'

  @Output() onClick = new EventEmitter<void>()

  handleClick() {
    this.onClick.emit()
  }
}
