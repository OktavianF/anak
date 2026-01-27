import React, { useState } from 'react';

// Local components
import { CommunityHeader } from '../components/CommunityHeader';
import { TopicTabs } from '../components/TopicTabs';
import { PostCard } from '../components/PostCard';
import { CreatePostButton } from '../components/CreatePostButton';
import { BottomNavigation } from '../components/BottomNavigation';

// Constants
import { samplePosts } from '../constants/samplePosts';

interface CommunityScreenProps {
  navigateTo: (screen: string) => void;
  childName: string;
  isParentMode?: boolean;
}

export default function CommunityScreen({
  navigateTo,
  childName,
}: CommunityScreenProps) {
  const [activeTab, setActiveTab] = useState('popular');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      <CommunityHeader childName={childName} onBack={() => navigateTo('home')} />

      <div className="px-6 -mt-3 pb-24">
        <TopicTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Posts */}
        <div className="space-y-5">
          {samplePosts.map((post, index) => (
            <PostCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <CreatePostButton />
      </div>

      <BottomNavigation navigateTo={navigateTo} activeScreen="community" />
    </div>
  );
}
