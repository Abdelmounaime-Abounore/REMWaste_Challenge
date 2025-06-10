import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import CardComponent from '../CardComponent/CardComponent'
import { useState } from 'react'
import { Box, CircularProgress } from '@mui/material'
import './StepContent.css'

type Props = {
  step: number
  onCardClick: (hasSelection: boolean) => void // pass boolean indicating if card selected
  isCardClicked: boolean // optional, you may not need it here if you control state only in parent
}

type CardData = {
  id: string
  size: string
  hire_period_days: number
  price_before_vat: number
  allowed_on_road: boolean
  allows_heavy_waste: boolean
  imageUrl?: string
}

const StepContent = ({ step, onCardClick }: Props) => {
  const isStep3 = step === 2
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null)

  const handleSelect = (id: string) => {
    let newSelectedId = id
    if (selectedCardId === id) {
      // Deselect if clicked again
      newSelectedId = ''
    }
    setSelectedCardId(newSelectedId)
    // Notify parent if any card is selected
    onCardClick(!!newSelectedId)
  }

  const { data, isLoading, error } = useQuery<CardData[]>({
    queryKey: ['cards'],
    queryFn: async () => {
      const res = await axios.get(
        'https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft'
      )
      return res.data
    },
    enabled: isStep3,
  })

  return (
    <div className='step-content'>
      <h1>Choose Your Skip Size</h1>
      <p>Select the skip size that best suits your needs</p>

      {isStep3 && (
        <div>
          {isLoading && (
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
              height={100}
            >
              <CircularProgress />
            </Box>
          )}{' '}
          {error && <p style={{ color: 'red' }}>Error loading cards</p>}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              gap: 20,
              flexWrap: 'wrap',
            }}
          >
            {data?.map((card) => (
              <CardComponent
                key={card.id}
                data={card}
                isSelected={selectedCardId === card.id}
                onClick={() => handleSelect(card.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default StepContent
