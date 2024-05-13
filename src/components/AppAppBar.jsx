import * as React from 'react'
import PropTypes from 'prop-types'

import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Drawer from '@mui/material/Drawer'
import MenuIcon from '@mui/icons-material/Menu'
import ToggleColorMode from './ToggleColorMode'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'

import AlertDialogSlide from './Dialogue/AlertDialogSlide'

const logoStyle = {
  width: '140px',
  height: 'auto',
  cursor: 'pointer',
}

function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false)
  const { user, logOut } = React.useContext(AuthContext)
  // const { displayName, photoURL, email, metadata } = user
  const [openDialogue, setOpenDialogue] = React.useState(false)

  const location = useLocation()
  console.log(location.pathname)

  const toggleDialog = () => {
    setOpenDialogue(!openDialogue)
  }

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId)
    const offset = 128
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset
      sectionElement.scrollIntoView({ behavior: 'smooth' })
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      })
      setOpen(false)
    }
  }

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              borderRadius: '999px',
              bgcolor:
                theme.palette.mode === 'light'
                  ? 'rgba(255, 255, 255, 0.4)'
                  : 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(24px)',
              maxHeight: 40,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow:
                theme.palette.mode === 'light'
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                ml: '-18px',
                px: 0,
              }}
            >
              <Link to={'/'}>
                <img
                  src={
                    'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                  }
                  style={logoStyle}
                  alt="logo of sitemark"
                />
              </Link>

              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <MenuItem
                  onClick={() => scrollToSection('hero')}
                  sx={{ py: '6px', px: '12px' }}
                  // href="/"
                >
                  <Typography variant="body2" color="text.primary">
                    <Link to={'/'}>Home</Link>
                  </Typography>
                </MenuItem>
                {location.pathname == '/' && (
                  <MenuItem
                    onClick={() => scrollToSection('features')}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Features
                    </Typography>
                  </MenuItem>
                )}

                {location.pathname == '/' && (
                  <MenuItem
                    onClick={() => scrollToSection('testimonials')}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Testimonials
                    </Typography>
                  </MenuItem>
                )}

                {location.pathname == '/' && (
                  <MenuItem
                    onClick={() => scrollToSection('highlights')}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Highlights
                    </Typography>
                  </MenuItem>
                )}
                {location.pathname == '/' && (
                  <MenuItem
                    onClick={() => scrollToSection('pricing')}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      Pricing
                    </Typography>
                  </MenuItem>
                )}

                <MenuItem
                  // onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    <Link to={'/all-blogs'}>All blogs</Link>
                  </Typography>
                </MenuItem>
                {location.pathname == '/' && (
                  <MenuItem
                    onClick={() => scrollToSection('featured-blogs')}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      {/* <Link to={'/featured-blogs'}> Featured Blogs </Link> */}
                      Featured Blogs
                    </Typography>
                  </MenuItem>
                )}

                <MenuItem
                  // onClick={() => scrollToSection('faq')}
                  sx={{ py: '6px', px: '12px' }}
                >
                  <Typography variant="body2" color="text.primary">
                    <Link to="/addBlogs"> Add Blogs </Link>
                  </Typography>
                </MenuItem>

                {location.pathname == '/' && (
                  <MenuItem
                    onClick={() => scrollToSection('faq')}
                    sx={{ py: '6px', px: '12px' }}
                  >
                    <Typography variant="body2" color="text.primary">
                      FAQ
                    </Typography>
                  </MenuItem>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 0.5,
                alignItems: 'center',
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {user ? (
                <Button
                  color="primary"
                  variant="text"
                  size="small"
                  component="a"
                  onClick={toggleDialog}
                  // href="/material-ui/getting-started/templates/sign-in/"
                  // target="_blank"
                >
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-6 w-6 rounded-full"
                  />
                </Button>
              ) : (
                <Link to={'/signin'}>
                  {' '}
                  <Button
                    color="primary"
                    variant="text"
                    size="small"
                    component="a"
                    // href="/material-ui/getting-started/templates/sign-in/"
                    // target="_blank"
                  >
                    Sign in
                  </Button>
                </Link>
              )}

              {user ? (
                <Button
                  onClick={() => logOut()}
                  color="primary"
                  variant="contained"
                  size="small"
                  component="a"
                  // href="/material-ui/getting-started/templates/sign-up/"
                  // target="_blank"
                >
                  Sign Out
                </Button>
              ) : (
                <Link to={'/signup'}>
                  {' '}
                  <Button
                    color="primary"
                    variant="contained"
                    size="small"
                    component="a"
                    // href="/material-ui/getting-started/templates/sign-up/"
                    // target="_blank"
                  >
                    Sign up
                  </Button>
                </Link>
              )}
            </Box>
            <Box sx={{ display: { sm: '', md: 'none' } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: '60dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem>
                    <Link to={'/'}>Home</Link>
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('features')}>
                    Features
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('testimonials')}>
                    Testimonials
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('highlights')}>
                    Highlights
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('pricing')}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>
                    <Link to={'/all-blogs'}> All Blogs </Link>
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>
                    <Link to={'/featured-blogs'}> Featured Blogs </Link>
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>
                    <Link to={'/addBlogs'}> Add Blogs </Link>
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('faq')}>
                    FAQ
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={() => {
                        toggleDialog()
                        toggleDrawer(false)
                      }}
                    >
                      My Profile
                    </button>
                  </MenuItem>
                  <Divider />
                  {!user && (
                    <MenuItem>
                      <Link to={'/signup'} className="w-full">
                        <Button
                          color="primary"
                          variant="contained"
                          component="a"
                          // href="/material-ui/getting-started/templates/sign-up/"
                          // target="_blank"
                          sx={{ width: '100%' }}
                        >
                          Sign up
                        </Button>
                      </Link>
                    </MenuItem>
                  )}

                  {user ? (
                    <MenuItem>
                      <Button
                        color="primary"
                        variant="contained"
                        component="a"
                        onClick={() => logOut()}
                        // href="/material-ui/getting-started/templates/sign-in/"
                        // target="_blank"
                        sx={{ width: '100%' }}
                      >
                        Log Out
                      </Button>
                    </MenuItem>
                  ) : (
                    <MenuItem>
                      <Link to={'/signin'} className="w-full">
                        {' '}
                        <Button
                          color="primary"
                          variant="outlined"
                          component="a"
                          // href="/material-ui/getting-started/templates/sign-in/"
                          // target="_blank"
                          sx={{ width: '100%' }}
                        >
                          Sign in
                        </Button>
                      </Link>
                    </MenuItem>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {openDialogue && <AlertDialogSlide />}
    </div>
  )
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(['dark', 'light']).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
}

export default AppAppBar
