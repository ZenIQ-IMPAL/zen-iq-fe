export function VideoSection({ videoUrl }: { videoUrl: string }) {
  if (!videoUrl) return <div>No video available</div>;

  const isYouTube =
    videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be");
  if (isYouTube) {
    const embedUrl = videoUrl.includes("/embed/")
      ? videoUrl
      : videoUrl.replace("watch?v=", "embed/");

    return (
      <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md bg-black">
        <iframe
          src={embedUrl}
          className="w-full h-full"
          title="Course video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <video controls className="w-full h-[400px] rounded-lg shadow-md bg-black">
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
