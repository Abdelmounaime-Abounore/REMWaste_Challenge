import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Stack,
} from '@mui/material'

import WarningAmberIcon from '@mui/icons-material/WarningAmber'

import FourYarder from '../../../src/assets/4-yarder-skip.jpg'
import FiveYarder from '../../../src/assets/5-yarder-skip.jpg'
import SixteenYarder from '../../../src/assets/16-yarder-skip.jpg'
import TwentyYarder from '../../../src/assets/20-yarder-skip.jpg'

type CardData = {
  id: string
  size: string
  hire_period_days: number
  price_before_vat: number
  allowed_on_road: boolean
  allows_heavy_waste: boolean
  imageUrl?: string
}

type Props = {
  data: CardData
  isSelected: boolean
  onClick: () => void
}

const getImageBySize = (sizeStr: string) => {
  const size = Number(sizeStr)

  if (size <= 4) return FourYarder
  if (size >= 5 && size < 16) return FiveYarder
  if (size >= 16 && size < 20) return SixteenYarder
  if (size >= 20) return TwentyYarder

  return FourYarder // fallback
}

const CardComponent = ({ data, isSelected, onClick }: Props) => {
  const imageSrc = data.imageUrl || getImageBySize(data.size)

  return (
    <Card
      sx={{
        width: 320,
        border: isSelected ? '3px solid #1976d2' : '1px solid #ccc',
        cursor: 'pointer',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        ':hover': {
          borderColor: '#1976d2',
          boxShadow: '0 8px 16px rgba(25, 118, 210, 0.2)',
        },
        backgroundColor: '#F8F9FA',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
      raised={isSelected}
    >
      <CardActionArea onClick={onClick} sx={{ p: 2 }}>
        <CardMedia
          component="img"
          height="180"
          image={imageSrc}
          alt={`${data.size}-yarder skip`}
          sx={{ borderRadius: 1, objectFit: 'cover', mb: 2 }}
        />
        <CardContent sx={{ px: 1 }}>
          <Typography gutterBottom variant="h6" component="div" color="primary">
            {data.size} Yarder Skip
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hire period: {data.hire_period_days} days
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Price before VAT: £{data.price_before_vat.toFixed(2)}
          </Typography>

          {/* Warning Messages */}
          <Stack spacing={1}>
            {!data.allowed_on_road && (
              <Box display="flex" alignItems="center" color="error.main">
                <WarningAmberIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">Not allowed on road</Typography>
              </Box>
            )}
            {!data.allows_heavy_waste && (
              <Box display="flex" alignItems="center" color="warning.main">
                <WarningAmberIcon fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">Does not allow heavy waste</Typography>
              </Box>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>

      {/* Action Button */}
      <Box sx={{ p: 2, pt: 2, textAlign: 'center' }}>
        <Button
          variant={isSelected ? 'contained' : 'outlined'}
          color="primary"
          fullWidth
          onClick={onClick}
          sx={{ fontWeight: 'bold' }}
        >
          {isSelected ? 'Selected' : 'Select this Skip'}
        </Button>
      </Box>
    </Card>
  )
}

export default CardComponent
