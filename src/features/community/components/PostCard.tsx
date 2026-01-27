import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Heart, Share2, MoreVertical, User, CheckCircle } from 'lucide-react';
import { Post } from '../constants/samplePosts';
import { getCategoryStyle } from '../utils/categoryUtils';

interface PostCardProps {
  post: Post;
  index: number;
}

export function PostCard({ post, index }: PostCardProps) {
  const categoryStyle = getCategoryStyle(post.category);
  const CategoryIcon = categoryStyle.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl shadow-slate-200/50 border border-slate-200/50 hover:shadow-2xl transition-all duration-300"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-indigo-200 bg-indigo-100">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div>
            <h3 className="text-slate-800 font-heading text-base font-medium">{post.author}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-slate-500 text-xs">{post.timeAgo}</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full" />
              <div
                className={`flex items-center space-x-1.5 px-2 py-1 rounded-lg border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
              >
                <CategoryIcon className="w-3 h-3" strokeWidth={2} />
                <span className="text-xs font-medium">{post.category}</span>
              </div>
            </div>
          </div>
        </div>
        <motion.button
          className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MoreVertical className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Post Content */}
      <p className="text-slate-700 text-sm leading-relaxed mb-5">{post.content}</p>

      {/* Replies Preview */}
      {post.replies && post.replies.length > 0 && (
        <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-2xl p-4 mb-5 space-y-3 border border-slate-200/50">
          {post.replies.slice(0, 2).map((reply, replyIndex) => (
            <div key={replyIndex} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-200 to-blue-200 rounded-xl flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" strokeWidth={2} />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-slate-800 font-medium text-sm">{reply.author}</span>
                  {reply.isExpert && (
                    <div className="flex items-center space-x-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg border border-emerald-200">
                      <CheckCircle className="w-3 h-3" strokeWidth={2} />
                      <span className="text-xs font-medium">Expert</span>
                    </div>
                  )}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{reply.content}</p>
              </div>
            </div>
          ))}
          {post.comments > 2 && (
            <motion.button
              className="text-indigo-600 text-sm font-medium hover:text-indigo-700 transition-colors"
              whileHover={{ x: 2 }}
            >
              Lihat {post.comments - 2} balasan lainnya →
            </motion.button>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200/50">
        <div className="flex items-center space-x-6">
          <motion.button
            className="flex items-center space-x-2 text-slate-500 hover:text-rose-500 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-1.5 rounded-lg group-hover:bg-rose-50 transition-colors">
              <Heart className="w-4 h-4" strokeWidth={2} />
            </div>
            <span className="text-sm font-medium">{post.likes}</span>
          </motion.button>

          <motion.button
            className="flex items-center space-x-2 text-slate-500 hover:text-blue-500 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="p-1.5 rounded-lg group-hover:bg-blue-50 transition-colors">
              <MessageSquare className="w-4 h-4" strokeWidth={2} />
            </div>
            <span className="text-sm font-medium">{post.comments}</span>
          </motion.button>
        </div>

        <motion.button
          className="flex items-center space-x-2 text-slate-500 hover:text-emerald-500 transition-colors group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="p-1.5 rounded-lg group-hover:bg-emerald-50 transition-colors">
            <Share2 className="w-4 h-4" strokeWidth={2} />
          </div>
          <span className="text-sm font-medium">Bagikan</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
