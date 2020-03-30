import { useState, CSSProperties } from "react";

// This is Typescript only, this will not be present at runtime.
// We can export the types to reuse it in other files.
export type BarChartProps = { width: string; data: BarChartData };
export type BarChartData = { title: string; color: string; value: number }[];

export default ({ width, data }: BarChartProps) => {
  // The ES6 function "reduce" allows us to calculate in one line the sum of all the "value" in "data"
  const sumTotal = data.reduce((prev, current) => prev + current.value, 0 /* set the start value at 0 */);
  return (
    <div style={{ ...barChartStyle, width }}>
      {data.map((item, index) => (
        <Bar
          key={index}
          color={item.color}
          height="40px"
          width={(item.value / sumTotal) * 100 + "%"}
          value={item.value}
        >
          {/* This will be pass as a prop named "children" in the Bar component */}
          {item.title}
        </Bar>
      ))}
    </div>
  );
};

const Bar = ({ width, height, children, color, value }) => {
  // useState gives us two things:
  // 1. A state value which we named "showTooltip"
  // 2. A function that allows us to modify the state value
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  return (
    <div
      // When this div is clicked it will set the showTooltip to it's opposite value.
      onClick={() => setShowTooltip(prevState => !prevState)}
      style={{ ...barStyle, backgroundColor: color, width, height }}
    >
      {value}
      {/* Renders conditionally the tooltip */}
      {showTooltip && <div style={tooltipStyle}>{children}</div>}
    </div>
  );
};
const barChartStyle: CSSProperties = {
  backgroundColor: "red",
  display: "flex",
  flexDirection: "row",
  position: "relative"
};
const barStyle: CSSProperties = {
  userSelect: "none",
  position: "relative",
  display: "block"
};
const tooltipStyle: CSSProperties = {
  position: "absolute",
  top: "100%",
  border: "1px solid black",
  borderRadius: "2px"
};
