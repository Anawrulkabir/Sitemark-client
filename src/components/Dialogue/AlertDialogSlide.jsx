import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { AuthContext } from '../../provider/AuthProvider'
import UpdateBioDialog from './UpdateBioDialog'
import { Link } from 'react-router-dom'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(true)

  const { user } = React.useContext(AuthContext)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const [openDialogue, setOpenDialogue] = React.useState(false)

  const toggleDialog = () => {
    setOpenDialogue(!openDialogue)
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
            className="rounded-full mt-5 border-2 border-green-700 p-1  object-cover h-32 w-32 "
          />
        </DialogTitle>
        <DialogContent className="text-center">
          <DialogContentText id="alert-dialog-slide-description" className="">
            <p className="text-2xl font-bold">{user.displayName}</p>
          </DialogContentText>
          <DialogContentText
            id="alert-dialog-slide-description"
            className="border-b pb-2"
          >
            <p className="text-xs text-blue-600 mt-0 mb-1">{user.email}</p>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            <p className="text-xs text-zinc-400 mt-3">
              User Created: {user.metadata.creationTime}
            </p>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
            <p className="text-xs text-zinc-400">
              Last Login: {user.metadata.lastSignInTime}
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex  border mx-auto">
          {/* <Button onClick={toggleDialog}>Update Bio</Button> */}
          <Link to="/wishlist">
            <Button onClick={handleClose}>Wishlist</Button>
          </Link>

          <Button>Update Bio</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {openDialogue && <UpdateBioDialog />}
    </React.Fragment>
  )
}
