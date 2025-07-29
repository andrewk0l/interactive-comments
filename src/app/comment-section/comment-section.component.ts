import { Component, OnInit } from '@angular/core';
import { CommentModel } from '../comment/comment';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-comment-section',
  standalone: false,
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css'],
})
export class CommentSectionComponent implements OnInit {
  public comments: CommentModel[] = [];
  newCommentText = '';
  currentUser: any;
  currentUserImage: any;
  modalVisible = false;
  modalMessage = '';
  onConfirmCallback: () => void = () => {};
  showDeleteConfirmation(message: string, onConfirm: () => void) {
    this.modalMessage = message;
    this.modalVisible = true;
    this.onConfirmCallback = onConfirm;
  }

  confirmDelete() {
    this.onConfirmCallback();
    this.modalVisible = false;
  }

  cancelDelete() {
    this.modalVisible = false;
  }

  replyInputVisible: { [key: number]: boolean } = {};
  replyText: { [key: number]: string } = {};
  editInputVisible: { [commentId: number]: boolean } = {};
  editedContent: { [commentId: number]: string } = {};

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<any>('assets/data/comments.json').subscribe({
      next: (data) => {
        this.comments = data.comments;
        this.currentUser = data.currentUser;
        this.currentUserImage = data.currentUser.image;
        this.cdRef.detectChanges();
        console.log('Loaded comments:', this.comments);
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      },
    });
  }
  upvote(comment: any): void {
    comment.score++;
  }

  downvote(comment: any): void {
    if (comment.score > 0) {
      comment.score--;
    }
  }

  toggleReplyInput(commentId: number): void {
    this.replyInputVisible[commentId] = !this.replyInputVisible[commentId];
  }

  toggleEditInput(comment: CommentModel): void {
    const id = comment.id;
    this.editInputVisible[id] = !this.editInputVisible[id];

    // Only pre-fill content when toggling ON
    if (this.editInputVisible[id]) {
      this.editedContent[id] = comment.content;
    }
  }

  addComment() {
    if (this.newCommentText.trim()) {
      const newComment: CommentModel = {
        id: Date.now(),
        content: this.newCommentText,
        createdAt: new Date().toISOString(),
        score: 0,
        user: {
          username: this.currentUser.username,
          image: {
            png: this.currentUserImage.png,
            webp: this.currentUserImage.webp,
          },
        },
        replies: [],
      };
      this.comments.push(newComment);
      this.newCommentText = '';
    }
  }

  saveEditedComment(comment: CommentModel): void {
    const id = comment.id;
    comment.content = this.editedContent[id];
    this.editInputVisible[id] = false;
  }

  deleteComment(comment: CommentModel) {
    this.showDeleteConfirmation(
      'Are you sure you want to delete this comment?',
      () => {
        const index = this.comments.indexOf(comment);
        if (index > -1) {
          this.comments.splice(index, 1);
        }
      }
    );
  }

  deleteReply(commentId: number, replyId: number) {
    this.showDeleteConfirmation(
      "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
      () => {
        const parentComment = this.comments.find((c) => c.id === commentId);
        if (parentComment && parentComment.replies) {
          parentComment.replies = parentComment.replies.filter(
            (reply) => reply.id !== replyId
          );
        }
      }
    );
  }

  submitReply(parentCommentId: number): void {
    const text = this.replyText[parentCommentId]?.trim();
    if (!text) return;

    const parentComment = this.comments.find((c) => c.id === parentCommentId);
    if (parentComment) {
      const reply: CommentModel = {
        id: Date.now(),
        content: text,
        createdAt: new Date().toISOString(),
        score: 0,
        user: {
          username: this.currentUser.username,
          image: {
            png: this.currentUserImage.png,
            webp: this.currentUserImage.webp,
          },
        },
        replies: [],
      };

      parentComment.replies = parentComment.replies || [];
      parentComment.replies.push(reply);

      this.replyText[parentCommentId] = '';
      this.replyInputVisible[parentCommentId] = false;
    }
  }
  public getRelativeTime(timestamp: string): string {
    if (isNaN(Date.parse(timestamp))) {
      return timestamp;
    }

    const now = new Date();
    const created = new Date(timestamp);
    const diffMs = now.getTime() - created.getTime();

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(diffMs / 60_000);
    const hours = Math.floor(diffMs / 3_600_000);
    const days = Math.floor(diffMs / 86_400_000);

    if (seconds < 60) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    return `${days} day${days !== 1 ? 's' : ''} ago`;
  }
}
