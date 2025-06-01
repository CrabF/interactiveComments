export interface Data {
  comments: Comment[];
  currentUser: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
}

export type Reply = Comment & { replyingTo: string };

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  score: number;
  user: {
    image: {
      png: string;
      webp: string;
    };
    username: string;
  };
  replies: Reply[];
}
