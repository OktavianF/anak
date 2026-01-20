// Community feature types
export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  content: string;
  createdAt: string;
}

export interface Guide {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  ageRange: string;
  image: string;
}
