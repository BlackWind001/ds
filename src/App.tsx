import React from 'react';
import './App.css';
import BST, { Operation_Type } from './bst';
import two from './two';
import traverseAndRender from './traverseAndRender';

function App() {
  const inputRef = React.useRef<null | HTMLInputElement>(null);
  const randomInsertInputRef = React.useRef<null | HTMLInputElement>(null);
  const treeCanvasRef = React.useRef<null | HTMLElement>(null);
  const deleteButtonRef = React.useRef<null | HTMLButtonElement>(null);
  const [inputString, setInputString] = React.useState<string>('');
  const [operations, setOperations] = React.useState<Operation_Type[]>([]);

  React.useEffect(() => {
    const rootX = two.width / 2;
    const rootY = 40;

    two.clear();
    traverseAndRender(BST.root, rootX, rootY);
    two.render();
  }, [operations]);

  React.useEffect(() => {
    if (!treeCanvasRef.current) {
      console.error('Fatal error. Ref was not initialized.');
      return;
    }
    two.appendTo(treeCanvasRef.current);
  }, []);

  React.useEffect(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.focus();
  }, []);

  React.useEffect(() => {
    if (!deleteButtonRef.current) {
      console.error('Error: Delete button ref not initialized');
      return;
    }

    deleteButtonRef.current.addEventListener('keydown', (e) => {
      if (!inputRef.current) {
        return;
      }

      e.preventDefault();
      inputRef.current.focus();
    });
  }, []);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;

    setInputString(value);
  };
  const handleInsert: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!inputString) {
      return;
    }

    const value = Number.parseInt(inputString);

    if (Number.isNaN(value)) {
      return;
    }

    BST.insert(value);

    // The setOperations function must be possed a new Array every time.
    // This is because, if you just push a value to the previous array,
    // any useEffects depending on `operations` will not fire.
    // useEffects fire when the Object.is comparison is false.
    // This is why, we need to return a new array every time
    setOperations([...BST.operations]);
    setInputString('');
  };
  const handleDelete: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!inputString) {
      return;
    }

    const value = Number.parseInt(inputString);

    if (Number.isNaN(value)) {
      return;
    }

    BST.delete(value);

    // Read the Parameters section on this page to better understand
    // why we are creating a new array every time.
    // https://react.dev/reference/react/useEffect#parameters
    setOperations([...BST.operations]);
    setInputString('');
  };
  const handleRandomInsert: React.MouseEventHandler<HTMLButtonElement> = () => {
    const inputElem = randomInsertInputRef.current;
    const value = inputElem?.value;
    const numberOfInsertions = Number.isNaN(value)
      ? 0
      : Number.parseInt(value!);

    if (!inputElem || !value) {
      return;
    }

    for (let i = 0; i < numberOfInsertions; i++) {
      BST.insert(Math.floor(Math.random() * 100));
    }

    setOperations([...BST.operations]);
  };

  return (
    <>
      <section className='main-controls'>
        <div className='control-input'>
          <input value={inputString} onChange={handleChange} ref={inputRef} />
        </div>
        <div className='control-buttons'>
          <button onClick={handleInsert}>Insert</button>
          <button onClick={handleDelete} ref={deleteButtonRef}>
            Delete
          </button>
        </div>
      </section>
      <section className='other-controls-container'>
        <span className='random-numbers-inserter'>
          Insert <input placeholder='0' ref={randomInsertInputRef} /> random
          numbers <button onClick={handleRandomInsert}>Insert</button>
        </span>
      </section>
      <section className='tree-canvas' ref={treeCanvasRef}></section>
    </>
  );
}

export default App;
