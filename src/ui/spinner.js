export default class Spinner {
    #spinnerElement
    constructor(idSpinnerParent) {
        this.#spinnerElement = document.getElementById(idSpinnerParent);
    }

async awaitWithSpinner(fn) {
    this.#startSpinner();
    const response = await fn; 
    this.#stopSpinner();
    return response;
}

#startSpinner () {
    this.#spinnerElement.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
}                                                                                                    // reminder question to Daniel

#stopSpinner () {
    this.#spinnerElement.innerHTML = ""
}

}