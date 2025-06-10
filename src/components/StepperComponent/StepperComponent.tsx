import * as React from 'react'
import { styled } from '@mui/material/styles'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import LocationPinIcon from '@mui/icons-material/LocationPin'
import DeleteIcon from '@mui/icons-material/Delete'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import ShieldIcon from '@mui/icons-material/Shield'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PaymentIcon from '@mui/icons-material/Payment'
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector'
import type { StepIconProps } from '@mui/material/StepIcon'
import { Tooltip } from '@mui/material'

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.grey[800],
    }),
  },
}))

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean }
}>(({ theme }) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...theme.applyStyles('dark', {
    backgroundColor: theme.palette.grey[700],
  }),
  variants: [
    {
      props: ({ ownerState }) => ownerState.active,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
      },
    },
    {
      props: ({ ownerState }) => ownerState.completed,
      style: {
        backgroundImage:
          'linear-gradient( 136deg, rgb(131, 62, 19) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      },
    },
  ],
}))

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  const icons: { [index: string]: React.ReactElement<unknown> } = {
    1: <LocationPinIcon />,
    2: <DeleteIcon />,
    3: <LocalShippingIcon />,
    4: <ShieldIcon />,
    5: <CalendarTodayIcon />,
    6: <PaymentIcon />,
  }

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const steps = [
  'Postcode',
  'Waste Type',
  'Select Skip',
  'Permit Check',
  'Choose Date',
  'Payment',
]

const StepperComponent: React.FC<{
  activeStep: number
  setActiveStep: (step: number) => void
}> = ({ activeStep, setActiveStep }) => {
  return (
    <Stepper
      alternativeLabel
      activeStep={activeStep}
      connector={<ColorlibConnector />}
    >
      {steps.map((label, index) => {
        let tooltipTitle = ''
        if (index < activeStep) {
          tooltipTitle = 'Back'
        } else if (index > activeStep) {
          tooltipTitle = 'Upcoming step'
        }

        const stepLabel = (
          <StepLabel slots={{ stepIcon: ColorlibStepIcon }}>{label}</StepLabel>
        )

        const step = (
          <Step
            key={index}
            onClick={() => {
              if (index < activeStep) {
                setActiveStep(index)
              }
            }}
            style={{ cursor: index < activeStep ? 'pointer' : 'default' }}
          >
            {tooltipTitle ? (
              <Tooltip title={tooltipTitle}>{stepLabel}</Tooltip>
            ) : (
              stepLabel
            )}
          </Step>
        )

        return step
      })}
    </Stepper>
  )
}

export default StepperComponent
