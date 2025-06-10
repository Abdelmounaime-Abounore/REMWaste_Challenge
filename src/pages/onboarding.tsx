import { useState } from 'react'
import StepperComponent from '../components/StepperComponent/StepperComponent'
import Footer from '../components/Footer/Footer'
import StepContent from '../components/StepContent/StepContent'

export default function Onboarding() {
  const [activeStep, setActiveStep] = useState(0)
  const [cardClicked, setCardClicked] = useState(false)

  const handleCardClick = (hasSelection: boolean) => {
    setCardClicked(hasSelection) // true if a card selected, false otherwise
  }

  const goToNextStep = () => {
    if (activeStep === 2 && !cardClicked) return
    if (activeStep < 5) {
      setActiveStep((prev) => prev + 1)
    }
  }

  const goToPreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1)
    }
  }

  return (
    <div className='onboarding'>
      <div className='stepper-container'>
        <StepperComponent
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>

      <div className='step-content-container'>
        <StepContent
          step={activeStep}
          onCardClick={handleCardClick}
          isCardClicked={cardClicked} // optional, if you want to pass it down
        />
      </div>

      <div className='footer-container'>
        <Footer
          step={activeStep}
          onNext={goToNextStep}
          onBack={goToPreviousStep}
          isCardClicked={cardClicked}
        />
      </div>
    </div>
  )
}
