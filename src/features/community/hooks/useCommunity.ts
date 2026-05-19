import { useState, useCallback, useMemo } from 'react';
import type { Post, Reply } from '../components/PostCard';

interface UseCommunityOptions {
  initialTab?: string;
  initialPosts?: Post[];
}

export function useCommunity(options: UseCommunityOptions = {}) {
  const [activeTab, setActiveTab] = useState(options.initialTab ?? 'popular');
  const [posts, setPosts] = useState<Post[]>(options.initialPosts ?? []);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = useCallback((postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  }, [likedPosts]);

  const addReply = useCallback((postId: number, reply: Reply) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: post.comments + 1,
              replies: [...(post.replies ?? []), reply],
            }
          : post
      )
    );
  }, []);

  const addPost = useCallback((post: Omit<Post, 'id'>) => {
    setPosts((prev) => [
      {
        ...post,
        id: prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1,
      },
      ...prev,
    ]);
  }, []);

  const filteredPosts = useMemo(() => {
    switch (activeTab) {
      case 'recent':
        return [...posts].sort((a, b) => {
          // Simple sort by timeAgo (would need actual dates for proper sorting)
          return a.timeAgo.localeCompare(b.timeAgo);
        });
      case 'question':
        return posts.filter((p) => p.category === 'Konsultasi');
      case 'achievement':
        return posts.filter((p) => p.category === 'Pencapaian');
      case 'popular':
      default:
        return [...posts].sort((a, b) => b.likes - a.likes);
    }
  }, [posts, activeTab]);

  return {
    activeTab,
    setActiveTab,
    posts,
    setPosts,
    filteredPosts,
    likedPosts,
    toggleLike,
    addReply,
    addPost,
  };
}

export default useCommunity;
