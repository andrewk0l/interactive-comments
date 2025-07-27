export interface CommentModel {
  id: number;
  content: string;           // matches JSON "content"
  createdAt: string;         // matches "createdAt"
  score: number;             // matches "score"
  replyingTo?: string;
  user: {
    image: {
      png: string;
      webp: string;
    };
     username: string;
  };
  replies?: CommentModel[];
}
