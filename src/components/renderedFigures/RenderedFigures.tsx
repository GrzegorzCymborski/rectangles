import { InitialStateProps, Item } from '../../redux/project';

const RenderedFigures: React.FC<InitialStateProps> = ({ fetchedData }: InitialStateProps) => {
  const setContrastColor = (hexcolor: string) => {
    const red = parseInt(hexcolor.slice(1, 3), 16) / 255;
    const green = parseInt(hexcolor.slice(3, 5), 16) / 255;
    const blue = parseInt(hexcolor.slice(5, 7), 16) / 255;
    const cmin = Math.min(red, green, blue);
    const cmax = Math.max(red, green, blue);
    const l = (cmax + cmin) / 2;
    return l < 0.6 ? '#FFF' : '#000';
  };

  return (
    <div style={{ flex: '1' }}>
      <svg
        style={{
          width: '100%',
          height: '100%',
          background: 'lightgray',
          padding: '10px',
        }}
      >
        <svg viewBox={`0 0 ${fetchedData!.width} ${fetchedData!.height}`}>
          <rect width={fetchedData!.width} height={fetchedData!.height} fill="#EEE" />
          {fetchedData?.items.map(({ color, x, y, width, height, rotation }: Item) => {
            const boundingBoxHeight =
              width * Math.abs(Math.sin((rotation * Math.PI) / 180)) +
              height * Math.abs(Math.cos((rotation * Math.PI) / 180));

            const boundingBoxWidth =
              width * Math.abs(Math.cos((rotation * Math.PI) / 180)) +
              height * Math.abs(Math.sin((rotation * Math.PI) / 180));

            return (
              <svg key={Math.random()}>
                <g transform={`rotate(${rotation} ${x} ${y})`}>
                  <rect
                    width={width}
                    height={height}
                    fill={color}
                    x={x - width / 2}
                    y={y - height / 2}
                  />

                  <circle cx={x} cy={y} r="3" fill="red" stroke="#000" />
                </g>
                <rect
                  height={boundingBoxHeight}
                  width={boundingBoxWidth}
                  fill="none"
                  stroke="indianred"
                  strokeWidth="1"
                  y={y - boundingBoxHeight * 0.5}
                  x={x - boundingBoxWidth * 0.5}
                />
                <text
                  fill={setContrastColor(color)}
                  x={x + 10}
                  y={y}
                  fontSize="16"
                  fontFamily="Verdana"
                >
                  {rotation}°
                </text>
              </svg>
            );
          })}
        </svg>
      </svg>
    </div>
  );
};

export default RenderedFigures;
