import React, { useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [name, setName] = useState("");
  const [active, setActive] = useState(false)
  const [height, setHeight] = useState('0px')
  const [rotate, setRotate] = useState('transform duration-700 ease');
  const contentSpace = useRef(null);
  function toggleAccordion() {
    setActive(active === false ? true : false)
    // @ts-ignore
    setHeight(active ? '0px' : `${contentSpace.current.scrollHeight}px`)
    setRotate(active ? 'transform duration-700 ease' : 'transform duration-700 ease rotate-180')
  }
  return (
    <div className='flex justify-center'>
      <div className="App flex justify-center my-7 w-4/6 flex-col">
        <div className='flex flex-col h-14'>
          <p className='font-bold text-3xl font-mono'>Todo App</p>
        </div>
        <div className="flex flex-row h-14">
          <div className="flex-none w-8/12">
            <input
              type="text"
              className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={name}
              placeholder="What to do?"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex-initial w-4/12 px-2">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
              New List
            </button>
          </div>
        </div>

        <div className="accordion" id="accordionExample5">
          {[1, 2, 3].map((data,index) => (
            <div className="accordion-item bg-white border border-gray-200">
              <h2 className="accordion-header mb-0" id="headingOne5">
                <button className="
        accordion-button
        relative
        flex
        items-center
        w-full
        py-4
        px-5
        text-base text-gray-800 text-left
        bg-white
        border-0
        rounded-none
        transition
        focus:outline-none
      " type="button" data-bs-toggle="collapse" data-bs-target={"#collapseOne5"+index} aria-expanded="true"
                  aria-controls={"collapseOne5"+index}>
                  Accordion Item #1
                </button>
              </h2>
              <div id={"collapseOne5"+index}className="accordion-collapse collapse show" aria-labelledby="headingOne5">
                <div className="accordion-body py-4 px-5">
                  <strong>This is the first item's accordion body.</strong> It is shown by default,
                  until the collapse plugin adds the appropriate classes that we use to style each
                  element. These classes control the overall appearance, as well as the showing and
                  hiding via CSS transitions. You can modify any of this with custom CSS or overriding
                  our default variables. It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </div>

  );
}

export default App;
