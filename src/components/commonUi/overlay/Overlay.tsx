interface OverlayProps {
  opacity?: number;
  backgroundColor?: string;
  zIndex?: number;
}

const Overlay: React.FC<OverlayProps> = ({
  opacity = 50,
  backgroundColor = 'black',
  zIndex = 30,
}) => {
  const opacityValue = opacity / 100;
  return (
    <div
      className={`absolute top-0 left-0 right-0 bottom-0 `}
      style={{
        backgroundColor,
        opacity: opacityValue,
        zIndex,
      }}
    ></div>
  );
};

export default Overlay;
