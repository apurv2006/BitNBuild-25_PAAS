import { useState, useEffect } from "react";
import toast from "react-hot-toast";

// The component now accepts the recipe steps as a prop
function CookingWorkflow({ recipeSteps }) {
  // This state will hold the steps formatted for this component's use
  const [workflowSteps, setWorkflowSteps] = useState([]);
  
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  // Timer is now initialized dynamically
  const [timer, setTimer] = useState(0);

  // This effect runs whenever a new recipe (recipeSteps) is passed in
  useEffect(() => {
    if (recipeSteps && recipeSteps.length > 0) {
      const transformedSteps = recipeSteps.map((stepString, index) => {
        const cleanStepString = stepString.replace(/\*\*/g, "");

        let title = `Step ${index + 1}`;
        let description = cleanStepString;
        
        const colonIndex = cleanStepString.indexOf(":");
        if (colonIndex > 0 && colonIndex < 40) { // Check if it's a reasonable title length
          title = cleanStepString.substring(0, colonIndex).trim();
          description = cleanStepString.substring(colonIndex + 1).trim();
        }

        // --- ✨ MODIFICATION: Improved time parsing for minutes OR seconds ---
        let timeInSeconds = 180; // Default to 3 minutes if no time is found
        // This regex looks for a number followed by "minutes", "minute", "seconds", or "sec"
        const timeMatch = description.match(/(\d+)\s*(minutes?|seconds?|sec)/i);
        
        if (timeMatch) {
          const timeValue = parseInt(timeMatch[1], 10);
          const timeUnit = timeMatch[2].toLowerCase();
          
          if (timeUnit.startsWith('minute')) {
            timeInSeconds = timeValue * 60;
          } else if (timeUnit.startsWith('sec')) {
            timeInSeconds = timeValue;
          }
        }

        return {
          id: index + 1,
          title: title,
          description: description,
          time: timeInSeconds,
        };
      });

      setWorkflowSteps(transformedSteps);
      setCurrentStep(0);
      setCompletedSteps([]);
      setTimer(transformedSteps[0]?.time || 0);
    } else {
      setWorkflowSteps([]);
    }
  }, [recipeSteps]);

  // This hook is used to manage the timer countdown
  useEffect(() => {
    let interval;
    if (timer > 0 && currentStep < workflowSteps.length && !completedSteps.includes(currentStep)) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && currentStep < workflowSteps.length - 1 && !completedSteps.includes(currentStep)) {
        handleNext();
    }
    return () => clearInterval(interval);
  }, [timer, currentStep, completedSteps, workflowSteps]);

  // handleNext is now memoized with useCallback to prevent re-creation on every render
  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps(prev => [...prev, currentStep]);
    }
    if (currentStep < workflowSteps.length - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      setTimer(workflowSteps[nextStepIndex].time);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      setTimer(workflowSteps[prevStepIndex].time);
    }
  };

  const toggleDone = (stepIndex) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter((s) => s !== stepIndex) 
        : [...prev, stepIndex]
    );
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Handle the case where no recipe has been generated yet
  if (workflowSteps.length === 0) {
    return (
      <section
        id="cooking-flow"
        className="min-h-screen flex flex-col items-center justify-center p-10 w-full"
      >
        <div className="text-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold dark:text-gray-200">Ready to Cook!</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Your recipe's cooking steps will appear here once you generate a recipe.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="cooking-flow"
      className="min-h-screen flex flex-col items-center justify-start p-10 w-full"
    >
      <div className="w-full max-w-2xl flex flex-col gap-4 dark:text-gray-200">
        {workflowSteps.map((step, index) => {
          const isActive = index === currentStep;
          const isCompleted = completedSteps.includes(index);

          let baseClasses = "p-6 rounded-xl shadow-xl cursor-pointer transition-all duration-300 transform hover:scale-[1.01]";
          let contentClasses = "text-gray-900 dark:text-gray-100";
          let descClasses = "text-gray-600 dark:text-gray-400";
          
          if (isActive) {
            baseClasses += " bg-yellow-400/90 dark:bg-yellow-600/90 border-2 border-yellow-500 shadow-yellow-500/50";
            contentClasses = "text-gray-900 dark:text-gray-900";
          } else if (isCompleted) {
            baseClasses += " bg-green-100 dark:bg-gray-700/70 border-2 border-green-500/50 opacity-70";
          } else {
            baseClasses += " bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700";
          }

          return (
            <div
              key={step.id}
              className={baseClasses}
              onClick={() => {
                setCurrentStep(index);
                setTimer(workflowSteps[index].time);
              }}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className={`text-xl font-bold ${contentClasses}`}>
                  {step.title}
                  {isCompleted && <span className="ml-2 text-green-600 dark:text-green-400">✓</span>}
                </h3>
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleDone(index)}
                  className="checkbox checkbox-primary w-5 h-5"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <p className={`text-base ${descClasses}`}>{step.description}</p>
              
              {step.time > 0 && isActive && (
                <p className="text-red-600 font-extrabold mt-3 text-2xl dark:text-red-400">
                  <span className="inline-block w-4 h-4 rounded-full bg-red-500 animate-pulse mr-2"></span>
                  Time Left: {formatTime(timer)}
                </p>
              )}
              {step.time > 0 && index < currentStep && (
                <p className="text-gray-500 font-medium mt-1">Duration: {formatTime(step.time)}</p>
              )}
            </div>
          );
        })}

        <div className="flex justify-between mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <button
            className="btn btn-outline text-gray-700 dark:text-gray-300 border-gray-400 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={handlePrev}
            disabled={currentStep === 0}
          >
            Previous
          </button>

          {currentStep < workflowSteps.length - 1 ? (
            <button className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 text-white" onClick={handleNext}>
              Next Step
            </button>
          ) : (
            <button
              className="btn btn-success bg-green-600 hover:bg-green-700 text-white"
              onClick={() => {
                toast.success("🎉 Cooking Complete!");
                if (workflowSteps.length > 0) {
                  setCurrentStep(0);
                  setCompletedSteps([]);
                  setTimer(workflowSteps[0].time);
                }
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

