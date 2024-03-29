import { BSTNode_Type } from './bst';
import two from './two';

const NODE_RADIUS = 30;
const CIRCLE_FILL_COLOR = '#64C4ED';
const ARROW_FILL_COLOR = '#FCFAFA';
const TEXT_COLOR = '#FCFAFA';

export default function traverseAndRender (node: BSTNode_Type | null, x: number, y: number) {
  if (!node || Number.isNaN(node.value)) {
    return;
  }

  let lineStartX, lineStartY, lineEndX, lineEndY;
  let leftArrow, rightArrow;

  const circle = two.makeCircle(x, y, NODE_RADIUS);
  const text = two.makeText('' + node.value, x, y);

  if (node.left) {
    lineStartX = x - NODE_RADIUS;
    lineStartY = y;
    lineEndX = x - NODE_RADIUS * 2;
    lineEndY = y + NODE_RADIUS * 2;

    leftArrow = two.makeArrow(lineStartX, lineStartY, lineEndX, lineEndY, 10);
    leftArrow.stroke = ARROW_FILL_COLOR;
    leftArrow.linewidth = 4;
  }
  if (node.right) {
    lineStartX = x + NODE_RADIUS;
    lineStartY = y;
    lineEndX = x + NODE_RADIUS * 2;
    lineEndY = y + NODE_RADIUS * 2;

    rightArrow = two.makeArrow(lineStartX, lineStartY, lineEndX, lineEndY, 10);
    rightArrow.stroke = ARROW_FILL_COLOR;
    rightArrow.linewidth = 4;
  }

  circle.noStroke();
  circle.fill = CIRCLE_FILL_COLOR;
  text.fill = TEXT_COLOR;

  traverseAndRender(node.left, x - NODE_RADIUS * 2, y + NODE_RADIUS * 2);
  traverseAndRender(node.right, x + NODE_RADIUS * 2, y + NODE_RADIUS * 2);
}