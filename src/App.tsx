import React from "react";
import "./App.css";
import BST, { Operation_Type } from "./bst";
import two from "./two";

function App() {
  const treeCanvasRef = React.useRef(null);
  const [inputString, setInputString] = React.useState<string>("");
  const [operations, setOperations] = React.useState<Operation_Type[]>([]);

  React.useEffect(() => {
    console.log(two.width);
  }, [operations]);

  React.useEffect(() => {
    if (treeCanvasRef.current) {
      two.appendTo(treeCanvasRef.current);
    } else {
      console.error("Fatal error. Ref was not initialized.");
    }
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
    setInputString("");
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
    setInputString("");
  };

  return (
    <>
      <section className="controls">
        <div className="control-input">
          <input value={inputString} onChange={handleChange} />
        </div>
        <div className="control-buttons">
          <button onClick={handleInsert}>Insert</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </section>
      <section className="tree-canvas" ref={treeCanvasRef}></section>
    </>
  );
}

export default App;
