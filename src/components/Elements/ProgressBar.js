import { useState, useEffect } from "react";

// let progressInterval = null;

export default function ProgressBar({ whichSlide, nextSlide }) {
  const [progressBar, setProgressBar] = useState(0);
  console.log(progressBar)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgressBar((oldValue) => {
        const newValue = oldValue + 1;
        if(newValue > 100) {
          clearInterval(progressInterval);
          return 0;
        }
        return newValue;
      })
    }, 100);
  }, [whichSlide]);
  // useEffect(() => {
  //   // if ((maxSlides + 1).length < 2) return;
  //   const progressInterval = setInterval(() => {
  //     setProgressBar((oldValue) => {
  //       const newValue = oldValue + 0.5;
  //       if(newValue > 100) {
  //         clearInterval(progressInterval);
  //         setProgressBar(0);
  //       }
  //       return newValue;
  //     })
  //   }, 100);
  // }, [whichSlide]);

  return (
    <div
      className="title-home--slide-progress"
      style={{ width: `${progressBar}%` }}
    ></div>
  )
}

// setInterval(() => this.setState(prevState => ({...prevState, this.state.completed: this.state.completed + 1}) ), 60000);