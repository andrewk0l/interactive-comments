import { Component, Input, OnInit } from '@angular/core';
import { CommentModel } from './comment';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-comment',
  standalone: false,
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent {
  @Input() comment!: CommentModel;
  @Input() canEdit: boolean = false;

  onDelete() {
    // Logic to delete comment
    console.log('Delete comment:', this.comment.id);
  }

  onEdit() {
    // Logic to edit comment
    console.log('Edit comment:', this.comment.id);
  }
}
