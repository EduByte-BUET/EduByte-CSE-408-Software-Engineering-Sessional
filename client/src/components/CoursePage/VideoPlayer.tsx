import React from 'react';

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  return (
    <div>
      <iframe 
        width="560" 
        height="315" 
        src={videoUrl} 
        title="YouTube video player" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen>
      </iframe>
    </div>
  );
};

export default VideoPlayer;