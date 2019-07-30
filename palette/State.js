export default class State {
  constructor(figures) {
    this.figures = figures;
    // load state from localstorage
    this.state = JSON.parse(localStorage.getItem('key'));
  }

  saveState(colors) {
    if (!this.state) {
      this.state = this.initialState();
    }
    // save state of colors  
    this.state.currСolor = colors[0];
    this.state.prevСolor = colors[1];
    // save state of figures  
    this.figures.map((figure, i) => {
      this.state.location[i].left = figure.offsetLeft;
      this.state.location[i].top = figure.offsetTop;
      this.state.transform[i] = figure.classList.contains("transform-to-circle");
      this.state.color[i] = figure.style.backgroundColor;
    })

    localStorage.setItem('key', JSON.stringify(this.state));
  }

  loadState() {
    if (!this.state) {
      this.state = this.initialState(this.figures, this.state);
    } else {
      this.applySaveState();
    }
  }

  initialState(figures, state) {
    state = {
      currСolor: "",
      prevСolor: "",
    }
    state.location = [];
    state.transform = [];
    state.color = [];

    figures.map(() => {
      state.location.push({
        left: 0,
        top: 0
      });
      state.transform.push(false);
      state.color.push("");
    });
    return state;
  }

  applySaveState() {
    this.figures.map((figure, i) => {

      figure.style.left = this.state.location[i].left + "px";
      figure.style.top = this.state.location[i].top + "px";

      if (this.state.transform[i]) {
        figure.classList.add("transform-to-circle");
      }
      figure.style.backgroundColor = this.state.color[i];
    })
  }
}