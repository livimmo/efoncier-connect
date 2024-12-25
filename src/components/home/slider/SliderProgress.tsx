interface SliderProgressProps {
  isPlaying: boolean;
}

export const SliderProgress = ({ isPlaying }: SliderProgressProps) => {
  return (
    <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
      <div
        className={`h-full bg-primary transition-transform duration-[5000ms] ease-linear ${
          isPlaying ? "w-full animate-[progress_5s_linear_infinite]" : ""
        }`}
        style={{
          transform: isPlaying ? "translateX(0%)" : "translateX(-100%)",
        }}
      />
    </div>
  );
};