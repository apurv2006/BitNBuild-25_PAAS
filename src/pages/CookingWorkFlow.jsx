import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function CookingWorkflow() {
  const steps = [
    { id: 1, title: "Prepare Ingredients", description: "Chop vegetables, measure spices, and gather utensils.", time: 60 },
    { id: 2, title: "Preheat Oven", description: "Set the oven to 180°C (350°F).", time: 0 },
    { id: 3, title: "Cook Base", description: "Sauté onions and garlic until golden brown.", time: 120 },
    { id: 4, title: "Add Main Ingredients", description: "Add vegetables, meat or tofu, and spices.", time: 300 },
    { id: 5, title: "Simmer & Finish", description: "Cook until ingredients are tender and flavors are combined.", time: 600 },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [timer, setTimer] = useState(steps[0].time);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, currentStep]);

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setTimer(steps[currentStep + 1].time);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimer(steps[currentStep - 1].time);
    }
  };

  const toggleDone = (stepIndex) => {
    if (completedSteps.includes(stepIndex)) {
      setCompletedSteps(completedSteps.filter((s) => s !== stepIndex));
    } else {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <section
      id="cooking-flow"
      className="min-h-screen flex flex-col items-center justify-start bg-white p-10"
    >
      <div className="w-full max-w-2xl flex flex-col gap-6 text-gray-900">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`p-4 rounded shadow ${
              index === currentStep ? "bg-yellow-100 border-2 border-yellow-400" : "bg-gray-100"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-2xl font-bold">{step.title}</h3>
              <input
                type="checkbox"
                checked={completedSteps.includes(index)}
                onChange={() => toggleDone(index)}
              />
            </div>
            <p className="text-lg">{step.description}</p>
            {step.time > 0 && index === currentStep && (
              <p className="text-red-500 font-bold mt-2 text-xl">Timer: {formatTime(timer)}</p>
            )}
          </div>
        ))}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            className="btn btn-outline"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button className="btn btn-primary" onClick={handleNext}>
              Next Step
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => {
                toast.success("🎉 Cooking Complete!");
                setCurrentStep(0);
                setCompletedSteps([]);
                setTimer(steps[0].time);
              }}
            >
              Finish
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default CookingWorkflow;
