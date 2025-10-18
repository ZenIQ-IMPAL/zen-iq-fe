export function VideoSection() {
  return (
    <div className="flex-1">
      <video
        controls
        className="w-full h-[400px] rounded-lg shadow-md bg-black"
      >
        <source src="/sample-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
