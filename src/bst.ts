type SearchResult_Type = [BSTNode | null, 'left' | 'right' | null]
type XMostSearchResult_Type = [BSTNode | null, 'left' | 'right']
export type Operation_Type = {
  op: 'insert' | 'delete',
  value: number
}

class BSTNode {
  value: number;
  left: BSTNode | null;
  right: BSTNode | null;
  level: number;

  constructor (value: number) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.level = -1;
  }

  insert (value: number) {
    const isLesser = value < this.value;
    const directionToInsert = isLesser ? 'left' : 'right';

    if (this[directionToInsert] !== null) {
      this[directionToInsert]!.insert(value);
    } else {
      this[directionToInsert] = new BSTNode(value);
      this[directionToInsert]!.level = this.level + 1;
    }
  }

  /**
   * 
   * @param value 
   * @returns Parent of the searched node along with direction.
   * If direction is null, then searched node is root node.
   * If both values are null, then the value does not exist.
   */
  search (value: number): SearchResult_Type {
    if (this.value === value) {
      // Root node is the node which contains the value
      return [this, null];
    }

    const isLesser = value < this.value;
    const childToSearch = isLesser ? 'left' : 'right';
    
    if (this[childToSearch]?.value === value) {
      // Value found in left or right child.
      return [this, childToSearch];
    }
    else if (this[childToSearch] !== null) {
      // Value not found in left or right child. Search deeper.
      return this[childToSearch]!.search(value);
    }
    else {
      // Value not found.
      return [null, null];
    }
  }

  _getXMostNode (x: 'left' | 'right'): XMostSearchResult_Type {
    let current = this[x];
    if (current === null) {
      // Current node is x-most node.
      return [null, x];
    }

    if (current[x] === null) {
      // Current node's direct child is x-most node.
      return [this, x];
    }

    // Traverse current node to reach x-most node.
    while (current[x]![x] !== null) {
      current = current[x]!;
    }

    return [current, x];
  }

  delete (value: number) {
    const [searchNodeParent, searchNodeDirection] = this.search(value);

    if (searchNodeParent === null && searchNodeDirection === null) {
      // Element not found
      return null;
    }
    else {
      if (searchNodeDirection === null) {
        // Current node is the node to be deleted
        const [leftMostNode, leftMostNodeDirection] = this._getXMostNode('left');
        const [rightMostNode, rightMostNodeDirection] = this._getXMostNode('right');
        let parentOfReplaceNode, replaceNodeDirection;

        if (leftMostNode) {
          parentOfReplaceNode = leftMostNode;
          replaceNodeDirection = leftMostNodeDirection;
        }
        else {
          parentOfReplaceNode = rightMostNode;
          replaceNodeDirection = rightMostNodeDirection;
        }

        if (parentOfReplaceNode === null) {
          // Current node is leaf node.
          // Cannot delete current node. Need a hack to lose reference to `this`.
          // Probably a wrapper object or a reference to root.
          return false;
        }
        else {
          const replaceNode = <BSTNode>parentOfReplaceNode[replaceNodeDirection];

          parentOfReplaceNode[replaceNodeDirection] = null;

          replaceNode.level = this.level;
          replaceNode.left = this.left;
          replaceNode.right = this.right;

          // Returning the new root node.
          return replaceNode;
        }
      }
      else {

        const searchNode = <BSTNode>searchNodeParent![searchNodeDirection];

        // Get leftmost node in right subtree or rightmost in left subtree
        // If right child of searched node is null, delete directly.
        // If right subtree of searched node is not null, search leftmost node.
        // Remove leftmost node from its parent and put it in currently searched node's position.
        const [leftMostNode, leftMostNodeDirection] = searchNode._getXMostNode('left');
        const [rightMostNode, rightMostNodeDirection] = searchNode._getXMostNode('right');
        let parentOfReplaceNode, replaceNodeDirection;

        if (leftMostNode) {
          parentOfReplaceNode = leftMostNode;
          replaceNodeDirection = leftMostNodeDirection;
        }
        else {
          parentOfReplaceNode = rightMostNode;
          replaceNodeDirection = rightMostNodeDirection;
        }

        if (parentOfReplaceNode === null) {
          // Searched node is leaf node. Replace searched node with null.
          searchNodeParent![searchNodeDirection] = null;
        }
        else {
          const replaceNode = <BSTNode>parentOfReplaceNode[replaceNodeDirection];

          parentOfReplaceNode[replaceNodeDirection] = null;

          replaceNode.level = searchNode.level;
          replaceNode.left = searchNode.left;
          replaceNode.right = searchNode.right;

          searchNodeParent![searchNodeDirection] = replaceNode;
        }

        return true;

      }
    }

  }

  /**
   * ToDo: Use loop instead of recursion.
   */
  traverse (opCallback: (arg: BSTNode | null) => unknown) {
    opCallback(this);

    this.left && this.left.traverse(opCallback);
    this.right && this.right.traverse(opCallback);
  }
}

class BST {
  root: BSTNode | null;
  operations: Operation_Type[]

  constructor () {
    this.root = null;
    this.operations = [];
  }

  insert (value: number) {
    this.operations.push({
      op: 'insert',
      value
    });

    if (this.root === null) {
      this.root = new BSTNode(value);
      this.root.level = 0;
      return;
    }

    this.root.insert(value);
  }

  delete (value: number) {
    this.operations.push({
      op: 'delete', value
    });
    if (!this.root) {
      return;
    }


    const status = this.root!.delete(value);


    if (status === false) {
      this.root = null;
    }
    else if (status !== null && status !== true && status instanceof BSTNode) {
      this.root = status;
    }
  }

  traverse (opCallback: (arg: BSTNode | null) => unknown) {
    this.root?.traverse(opCallback);
  }
}

export default new BST();
export type BSTNode_Type = InstanceType<typeof BSTNode>;

