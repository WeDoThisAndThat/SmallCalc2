import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["num1", "num2", "result"]

  add() {
    const num1 = parseFloat(this.num1Target.value) || 0
    const num2 = parseFloat(this.num2Target.value) || 0
    const result = num1 + num2
    this.resultTarget.textContent = result
  }

  clear() {
    this.num1Target.value = ""
    this.num2Target.value = ""
    this.resultTarget.textContent = "0"
  }
}
