import '@testing-library/jest-dom'

// jsdom doesn't implement pointer capture — stub it so swipe tests work
Element.prototype.setPointerCapture = () => { /* no-op in jsdom */ }
Element.prototype.releasePointerCapture = () => { /* no-op in jsdom */ }
