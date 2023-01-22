import { gsap } from 'gsap'
const tl = gsap.timeline()


export default {
  stepForward() {
    tl.to('.char', {
      duration: 1,
      left: '+=' + '100px',
      onComplete: () => this.hidePoints()
    })
  },
  twoStepsForward() {
    tl.to('.char', {
      duration: 1,
      left: '+=' + '200px',
      onComplete: () => this.hidePoints()
    })
  },
  jumpUp() {
    tl.to('.char', {
      duration: 1,
      bottom: '+=' + '58px',
      left: "+=" + "40px",
      onComplete: () => this.hidePoints()
    })
  },
  hidePoints() {
    const points = document.querySelectorAll('.points-wrapper img')
    const char = document.querySelector('.char')
    for (let point = 0; point < points.length; point++) {
      if (points[point].getBoundingClientRect().left <= char.getBoundingClientRect().left + 20) {
        points[point].classList.add("hide")
      }
    }

    this.charPos = char.getBoundingClientRect().bottom
    console.log(this.charPos)
  },
  charPos: 0
}
