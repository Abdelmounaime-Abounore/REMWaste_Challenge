import { Box, Button } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import './Footer.css'

type FooterProps = {
  step: number
  onBack: () => void
  onNext: () => void
  isCardClicked: boolean
}

const Footer = ({ step, onBack, onNext, isCardClicked }: FooterProps) => {
  const isFirstStep = step === 0
  const isLastStep = step === 5
  const isStep3 = step === 2

  const isNextDisabled = isLastStep || (isStep3 && !isCardClicked)

  return (
    <Box className='footer-buttons'>
      <Button
        onClick={onBack}
        disabled={isFirstStep}
        variant='outlined'
        color='error'
        sx={{ textTransform: 'none', marginRight: 1 }}
      >
        Back
      </Button>

      <Button
        onClick={onNext}
        disabled={isNextDisabled}
        variant='contained'
        endIcon={<SendIcon />}
        sx={{ textTransform: 'none' }}
      >
        {isLastStep ? 'Finish' : 'Next'}
      </Button>
    </Box>
  )
}

export default Footer
