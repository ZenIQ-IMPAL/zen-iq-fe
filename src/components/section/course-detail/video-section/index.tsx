const extractYouTubeVideoId = (url: string): string | null => {
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/\s]+)/,
        /youtube\.com\/watch\?.*v=([^&\?\/\s]+)/,
    ];

    const match = patterns.map((pattern) => url.match(pattern)).find((m) => m);

    return match ? match[1] : null;
};

const isYouTubeUrl = (url: string): boolean => {
    return url.includes("youtube.com") || url.includes("youtu.be");
};

const buildYouTubeEmbedUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}`;
};

export function VideoSection({ videoUrl }: { videoUrl: string }) {
    const hasVideo = Boolean(videoUrl);

    const renderNoVideo = () => (
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-md bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">No video available</p>
        </div>
    );

    const renderYouTubeVideo = (embedUrl: string) => (
        <div className="w-full lg:w-2/3">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                <iframe
                    src={embedUrl}
                    className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
                    title="Course video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );

    const renderRegularVideo = (url: string) => (
        <div className="w-full lg:w-2/3">
            <video
                controls
                className="w-full rounded-lg shadow-md bg-black"
                style={{ maxHeight: "500px" }}
            >
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );

    const renderVideo = () => {
        const isYouTube = isYouTubeUrl(videoUrl);

        return isYouTube
            ? (() => {
                  const videoId = extractYouTubeVideoId(videoUrl);
                  const embedUrl = videoId
                      ? buildYouTubeEmbedUrl(videoId)
                      : videoUrl;
                  return renderYouTubeVideo(embedUrl);
              })()
            : renderRegularVideo(videoUrl);
    };

    return hasVideo ? renderVideo() : renderNoVideo();
}
