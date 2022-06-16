import * as React from 'react'
import {useNavigate} from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import ListItemIcon from '@mui/material/ListItemIcon'
import DeleteIcon from '@mui/icons-material/Delete'
import LogoutIcon from '@mui/icons-material/Logout'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import AccountCircle from '@mui/icons-material/AccountCircle'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import MoreIcon from '@mui/icons-material/MoreVert'
import {useAuth} from '../hooks/useAuth'
import {useAppDispatch, useAppSelector} from '../hooks/storeHooks'
import {selectCartItems} from '../features/product/product.slice'
import {logOut} from 'features/authentication/authentication.slice'
import {ListItemText, TextField, Typography} from '@mui/material'
import {useDeleteUserMutation} from 'app/api'
import FormDialog from 'components/FormDialog'
import {updateOpenDialog, selectOpenDialog} from 'features/ui/ui.slice'
import {RootState} from 'app/store'

export default function WrapperAppBar() {
  const {user} = useAuth()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [value, setValue] = React.useState('')
  const {cartItems, open} = useAppSelector((state: RootState) => ({
    cartItems: selectCartItems(state),
    open: selectOpenDialog(state),
  }))
  const [deleteUser] = useDeleteUserMutation()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const handeFavoritesClick = () => {
    navigate('/favorites')
    setAnchorEl(null)
  }

  const handleLogout = () => {
    dispatch(logOut())
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleDeleteSubmit = async () => {
    const deletedUserId = await deleteUser(user.id).unwrap()
    if (deletedUserId) {
      dispatch(logOut())
      setAnchorEl(null)
      handleMobileMenuClose()
    }
  }

  const handleDeleteClick = () => {
    dispatch(updateOpenDialog(true))
  }

  const handleClose = () => {
    dispatch(updateOpenDialog(false))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handeFavoritesClick}>
        <ListItemIcon>
          <FavoriteBorderIcon />
        </ListItemIcon>
        <ListItemText>Favorites</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleDeleteClick}>
        <ListItemIcon>
          <DeleteIcon style={{color: 'red'}} />
        </ListItemIcon>
        <ListItemText style={{color: 'red'}}>Delete Account</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show cart items" color="inherit">
          <Badge badgeContent={cartItems.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>My Cart</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )

  if (!Object.keys(user).length) {
    return null
  }
  return (
    <>
      <FormDialog
        title="Are you sure?"
        open={open}
        handleSubmit={handleDeleteSubmit}
        handleClose={handleClose}
        disabledSubmitButton={!(value === 'delete')}
      >
        <Typography variant="body1" gutterBottom>
          This action cannot be undone. This will permanently delete your
          account. Please type <strong>delete</strong> to confirm.
        </Typography>
        <TextField onChange={handleChange} size="small" fullWidth />
      </FormDialog>
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <Button
              variant="text"
              sx={{color: 'white'}}
              onClick={() => navigate('/')}
            >
              BUY-IT
            </Button>
            <Box sx={{flexGrow: 1}} />
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
              <IconButton
                size="large"
                aria-label="show cart items"
                color="inherit"
                onClick={() => navigate('/cart')}
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </>
  )
}
