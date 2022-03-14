export default class Spinner {
    #spinnerElement
    constructor(idSpinnerParent) {
        this.#spinnerElement = document.getElementById(idSpinnerParent);
    }

async awaitWithSpinner(promsise) {
    this.#startSpinner();
    const response = await promsise; 
    this.#stopSpinner();
    return response;
}

#startSpinner () {
    this.#spinnerElement.innerHTML = `<div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
}                                                                                                 

#stopSpinner () {
    this.#spinnerElement.innerHTML = ""
}

}