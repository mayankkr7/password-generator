import React, { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [addNumbers, setAddNumbers] = useState(false);
  const [addSplChars, setAddSplChars] = useState(false);
  const [password, setPassword] = useState("");
  const [refresh, setRefresh] = useState(false);

  const passwordRef = useRef(null);
  const year = new Date().getFullYear();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (addNumbers) str += "0123456789";
    if (addSplChars) str += "!#$%&'()*+,-./:;<=>?@[\]^_`{|}~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    if (refresh) {
      setPassword(pass);
      setRefresh(false);
    }
    setPassword(pass);
  }, [length, addNumbers, addSplChars, refresh, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, addNumbers, addSplChars, refresh, passwordGenerator]);

  return (
    <div className="flex flex-col min-h-screen bg-[#2C3333]">
      <header className="bg-[#2E4F4F] text-white py-4 text-center">
        <h1 className='text-xl font-bold'>Password Generator</h1>
      </header>

      <main className="flex-1 flex items-center justify-center">
        <div className="bg-zinc-700 shadow-slate-800 p-6 rounded-lg shadow-md w-auto sm:w-96 mx-auto">
          <div className="flex flex-col mb-4">
            <input
              type="text"
              value={password}
              className="border border-gray-300 px-3 py-2 mb-1 rounded-md outline-none bg-slate-700"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <div className="flex mt-2">
              <button
                onClick={copyPasswordToClipboard}
                className='bg-[#0E8388] hover:bg-[#0b5d61] text-white px-4 py-2 rounded-md mr-2'
              >Copy</button>
              <button
                onClick={() => setRefresh(true)}
                className='bg-[#0E8388] hover:bg-[#0b5d61] text-white px-4 py-2 rounded-md'
              >Refresh</button>
            </div>
          </div>

          <div className='mb-4'>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className='w-full'
              onChange={(e) => { setLength(e.target.value) }}
            />
            <label className='text-sm'>Length: {length}</label>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              defaultChecked={addNumbers}
              id="numberInput"
              onChange={() => {
                setAddNumbers((prevValue) => !prevValue);
              }}
            />
            <label className="ml-2">Numbers</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              defaultChecked={addSplChars}
              id="characterInput"
              onChange={() => {
                setAddSplChars((prevValue) => !prevValue);
              }}
            />
            <label className="ml-2">Special Characters</label>
          </div>
        </div>
      </main>

      <footer className='bg-[#2E4F4F] text-white py-2 text-center font-light text-xs'>
        <p>&copy; Copyright {year}. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;

