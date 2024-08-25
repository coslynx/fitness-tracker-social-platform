import { useState } from 'react';
import { Share } from 'react-native';
import { useStore } from '../utils/store';

const SocialShareButton = () => {
  const [isSharing, setIsSharing] = useState(false);
  const { user, progress } = useStore();

  const handleShare = async () => {
    if (!user) {
      alert('You need to log in to share your progress.');
      return;
    }

    setIsSharing(true);

    try {
      const message = `Hey! Check out my progress on my fitness goals! I've achieved ${progress.milestones} milestones!`;
      await Share.share({
        message,
        title: 'My Fitness Progress',
      });
    } catch (error) {
      console.error('Error sharing progress:', error);
      alert('Failed to share progress. Please try again.');
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isSharing}
      className="p-2 bg-primary text-white rounded"
    >
      {isSharing ? 'Sharing...' : 'Share My Progress'}
    </button>
  );
};

export default SocialShareButton;