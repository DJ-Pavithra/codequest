import "./Code.css"
import { PythonCompiler } from "../Components/Code/PythonCompiler"
import { problems } from "../Components/Code/lib/Problems"
import Navbar1 from "../Components/Navbar"
export default function Code() {
  return (
    <main className="code-main dark">
      <div className="code-container">
        <Navbar1/>
        <p className="code-description dark">
          Write, run, and test your Python code with custom test cases.
        </p>
        <PythonCompiler defaultProblem={problems[0]} />
      </div>
    </main>
  )
}
