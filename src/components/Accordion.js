import React, { useEffect, useRef, useState } from "react";



function Accordion(props) {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    // console.log("Height for ", props.title, ": ", height);
  }, [height]);

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? "0px" : `${content.current.scrollHeight}px`);
  }

  return (


<div className={props.className}>
<a
   className={`accordion ${active ? "active" : ""}`}
   onClick={toggleAccordion}
   style={{ cursor: "pointer",   display: 'flex', justifyContent: 'space-between' }}
>
  <h2> {props.title} </h2>
  <span style={{fontSize: '26px', color: 'var(--main-color)'}}>{active ? "-" : "+"}</span>
</a>

  <div
    className="que_description"
    style={{ maxHeight: `${height}`, overflow: 'hidden',transition: 'max-height 0.5s ease' }}
    ref={content}
    dangerouslySetInnerHTML={{ __html: props.content }}>
  </div>
</div>

);
}

export default Accordion;
