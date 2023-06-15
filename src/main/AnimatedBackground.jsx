import React from "react"
import BIRDS from "vanta/dist/vanta.birds.min"

export class AnimatedBackground extends React.Component {
  constructor() {
    super()
    this.vantaRef = React.createRef()
  }
  componentDidMount() {
    this.vantaEffect = BIRDS({
      el: this.vantaRef.current,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color1: 0x6fff,
      color2: 0xff00aa,
      birdSize: 1.0,
      wingSpan: 22.0,
      separation: 100.0,
      alignment: 57.0,
      cohesion: 34.0,
      quantity: 3.0,
      backgroundAlpha: 0.0,
    })
  }
  componentWillUnmount() {
    if (this.vantaEffect) this.vantaEffect.destroy()
  }

  render() {
    return (
      <div
        ref={this.vantaRef}
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          zIndex: "999",
          pointerEvents: "none",
          backgroundColor: "transparent",
        }}
      ></div>
    )
  }
}
