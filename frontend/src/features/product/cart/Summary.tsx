import {useMemo} from 'react'
import Paper from '@mui/material/Paper'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {useAppSelector} from '../../../hooks/storeHooks'
import {selectShippmentAddress} from '../product.slice'
import {useNavigate} from 'react-router-dom'

export default function Summary() {
  const selectAddress = useMemo(selectShippmentAddress, [])
  const address = useAppSelector(selectAddress)

  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }
  return (
    <Paper
      elevation={3}
      sx={{
        height: '50%',
        width: '50%',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: 5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          direction: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CheckCircleIcon
          sx={{marginLeft: 1}}
          color="success"
          aria-label="success-icon"
        />
        <Typography
          variant="h4"
          sx={{marginLeft: 2, color: '#2e7d32'}}
          component="div"
        >
          Order placed successfully
        </Typography>
      </Box>

      {Object.keys(address).length ? (
        <Typography
          component="div"
          variant="h6"
          sx={{textAlign: 'center', marginTop: 5}}
        >
          Delivery address: {address}
        </Typography>
      ) : null}
      <Button
        onClick={handleClick}
        variant="contained"
        color="secondary"
        sx={{
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 5,
        }}
      >
        Back to home
      </Button>
    </Paper>
  )
}
