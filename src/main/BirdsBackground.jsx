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
      touchControls: false,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      colorMode: "variance",
      birdSize: 0.7,
      wingSpan: 40.0,
      speedLimit: 10.0,
      separation: 98.0,
      alignment: 100.0,
      cohesion: 100.0,
      quantity: 4.0,
      backgroundAlpha: 0,
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
          opactiy: "0.5",
        }}
      ></div>
    )
  }
}
