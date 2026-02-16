import { Application } from "@hotwired/stimulus"
import CalculatorController from "../../../app/javascript/controllers/calculator_controller"

describe("CalculatorController", () => {
  let application
  let controller

  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="calculator">
        <input type="number" data-calculator-target="num1" />
        <input type="number" data-calculator-target="num2" />
        <span data-calculator-target="result">0</span>
        <button data-action="click->calculator#add">Add</button>
        <button data-action="click->calculator#clear">Clear</button>
      </div>
    `

    application = Application.start()
    application.register("calculator", CalculatorController)
    controller = application.getControllerForElementAndIdentifier(
      document.querySelector('[data-controller="calculator"]'),
      "calculator"
    )
  })

  afterEach(() => {
    application.stop()
  })

  describe("#add", () => {
    it("adds two numbers correctly", () => {
      controller.num1Target.value = "5"
      controller.num2Target.value = "3"
      controller.add()
      expect(controller.resultTarget.textContent).toBe("8")
    })

    it("handles decimal numbers", () => {
      controller.num1Target.value = "5.5"
      controller.num2Target.value = "2.3"
      controller.add()
      expect(controller.resultTarget.textContent).toBe("7.8")
    })

    it("treats empty inputs as zero", () => {
      controller.num1Target.value = ""
      controller.num2Target.value = "5"
      controller.add()
      expect(controller.resultTarget.textContent).toBe("5")
    })
  })

  describe("#clear", () => {
    it("clears all inputs and resets result to 0", () => {
      controller.num1Target.value = "10"
      controller.num2Target.value = "5"
      controller.resultTarget.textContent = "15"
      
      controller.clear()
      
      expect(controller.num1Target.value).toBe("")
      expect(controller.num2Target.value).toBe("")
      expect(controller.resultTarget.textContent).toBe("0")
    })

    it("allows new calculation after clearing", () => {
      // First calculation
      controller.num1Target.value = "10"
      controller.num2Target.value = "5"
      controller.add()
      expect(controller.resultTarget.textContent).toBe("15")
      
      // Clear
      controller.clear()
      
      // New calculation
      controller.num1Target.value = "7"
      controller.num2Target.value = "3"
      controller.add()
      expect(controller.resultTarget.textContent).toBe("10")
    })
  })
})
