import '@testing-library/jest-dom'

// jsdom doesn't implement pointer capture — stub it so swipe tests work
Element.prototype.setPointerCapture = () => {}
Element.prototype.releasePointerCapture = () => {}
