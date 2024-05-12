import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { AuthContext } from '../../provider/AuthProvider'
import { Box, TextField } from '@mui/material'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function UpdateBioDialog() {
  const [open, setOpen] = React.useState(true)

  const { user } = React.useContext(AuthContext)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="flex justify-center ">
          <img
            src={user.photoURL}
            alt=""
            className="rounded-full mt-5 border-2 border-green-700 p-1"
          />
        </DialogTitle>
        <DialogContent className="text-center">
          <form>
            <input type="text" defaultValue={user.email} />
            <input type="text" defaultValue={user.photoURL} />
            <input type="button" value={'Update'} />
          </form>
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-controlled"
              label="Controlled"
              //   value={name}
              //   onChange={(event) => {
              //     setName(event.target.value)
              //   }}
              defaultValue={user.email}
            />
            <TextField
              id="outlined-uncontrolled"
              label="Uncontrolled"
              defaultValue={user.photoURL}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Update Bio</Button> */}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
