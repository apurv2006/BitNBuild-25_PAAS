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
    if (timer > 0 && currentStep < steps.length && !completedSteps.includes(currentStep)) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
    // Automatically move to the next step when the timer finishes
    if (timer === 0 && currentStep < steps.length - 1 && !completedSteps.includes(currentStep)) {
        handleNext();
    }
  }, [timer, currentStep, completedSteps, steps.length]); // Added dependencies for reliability

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
    // Note: The main background is handled in App.jsx now
    <section
      id="cooking-flow"
      className="min-h-screen flex flex-col items-center justify-start p-10 w-full"
    >
      <div className="w-full max-w-2xl flex flex-col gap-4 dark:text-gray-200">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);

          // Determine base styling for the step card
          let baseClasses = "p-6 rounded-xl shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.01]";
          let contentClasses = "text-gray-900 dark:text-gray-100";
          let descClasses = "text-gray-600 dark:text-gray-400";
          
          if (isActive) {
            // Active step - prominent, warm color
            baseClasses += " bg-yellow-400/90 dark:bg-yellow-600/90 border-2 border-yellow-500 shadow-yellow-500/50";
            contentClasses = "text-gray-900 dark:text-gray-900"; // Keep text dark for contrast
          } else if (isCompleted) {
            // Completed step - subtle green check, lower opacity
            baseClasses += " bg-green-100 dark:bg-gray-700/70 border-2 border-green-500/50 opacity-70";
          } else {
            // Inactive step - clean base color
            baseClasses += " bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700";
          }

          return (
            <div
              key={step.id}
              className={baseClasses}
              onClick={() => setCurrentStep(index)}
            >
              <div className="flex justify-between items-start mb-2">
                {/* Title */}
                <h3 className={`text-xl font-bold ${contentClasses}`}>
                  {step.title}
                  {isCompleted && <span className="ml-2 text-green-600 dark:text-green-400">✓</span>}
                </h3>
                {/* Checkbox for done status */}
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleDone(index)}
                  className="checkbox checkbox-primary w-5 h-5"
                  onClick={(e) => e.stopPropagation()} // Prevent setting currentStep when clicking checkbox
                />
              </div>
              {/* Description */}
              <p className={`text-base ${descClasses}`}>{step.description}</p>
              
              {/* Timer */}
              {step.time > 0 && isActive && (
                <p className="text-red-600 font-extrabold mt-3 text-2xl dark:text-red-400">
                  <span className="inline-block w-4 h-4 rounded-full bg-red-500 animate-pulse mr-2"></span>
                  Time Left: {formatTime(timer)}
                </p>
              )}
              {step.time > 0 && index < currentStep && ( // Show original time if step is skipped/passed
                <p className="text-gray-500 font-medium mt-1">Duration: {formatTime(step.time)}</p>
              )}
            </div>
          );
        })}

        {/* Navigation */}
        <div className="flex justify-between mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <button
            className="btn btn-outline text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          {currentStep < steps.length - 1 ? (
            <button className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleNext}>
              Next Step
            </button>
          ) : (
            <button
              className="btn btn-success bg-green-600 hover:bg-green-700 text-white"
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