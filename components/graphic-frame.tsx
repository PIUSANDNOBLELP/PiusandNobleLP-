// Shows a graphic that doesn't match the frame's shape. Instead of black bars,
// a blurred copy of the same graphic fills the background.
export default function GraphicFrame({
  src,
  className = "",
  imgClassName = "",
}: {
  src: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-paper ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-2xl"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" className={`relative h-full w-full object-contain ${imgClassName}`} />
    </div>
  );
}
