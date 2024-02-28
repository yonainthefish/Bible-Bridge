interface OverlayProps {
  opacity?: number;
  backgroundColor?: string;
}

const Overlay: React.FC<OverlayProps> = ({
  opacity = 50,
  backgroundColor = 'black',
}) => {
  const opacityValue = opacity / 100;
  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 z-1`}
      style={{
        backgroundColor,
        opacity: opacityValue,
      }}
    ></div>
  );
};

export default Overlay;
