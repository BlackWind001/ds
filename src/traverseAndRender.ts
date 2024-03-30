import { BSTNode_Type } from './bst';
import two from './two';

export type CoordinateLimit_Type = {
  start: number;
  end: number
};

export const NODE_RADIUS = 40;
const CIRCLE_FILL_COLOR = '#64C4ED';
const ARROW_FILL_COLOR = '#FCFAFA';
const TEXT_COLOR = '#FCFAFA';

export default function traverseAndRender (node: BSTNode_Type | null, xLimits: CoordinateLimit_Type, y: number) {
  if (!node || Number.isNaN(node.value)) {
    return;
  }

  const currentX = (xLimits.start + xLimits.end) / 2;
  const leftChildXLimits: CoordinateLimit_Type = { start: xLimits.start, end: currentX };
  const rightChildXLimits: CoordinateLimit_Type = { start: currentX, end: xLimits.end };
  const childY = y + (3 * NODE_RADIUS);

  const circle = two.makeCircle(currentX, y, NODE_RADIUS);
  const text = two.makeText('' + node.value, currentX, y);

  circle.className = `level_${node.level}`;
  circle.noStroke();
  circle.fill = CIRCLE_FILL_COLOR;
  text.fill = TEXT_COLOR;

  if (node.left) {
    const leftLine = two.makeLine(
      currentX - (NODE_RADIUS),
      y,
      (leftChildXLimits.start + leftChildXLimits.end) / 2,
      childY - NODE_RADIUS
    );

    leftLine.stroke = ARROW_FILL_COLOR;
    leftLine.linewidth = 4;

    traverseAndRender(node.left, leftChildXLimits, childY);
  }
  if (node.right) {
    const rightLine = two.makeLine(
      currentX + (NODE_RADIUS),
      y,
      (rightChildXLimits.start + rightChildXLimits.end) / 2,
      childY - NODE_RADIUS
    );

    rightLine.stroke = ARROW_FILL_COLOR;
    rightLine.linewidth = 4;

    traverseAndRender(node.right, rightChildXLimits, childY);
  }
}