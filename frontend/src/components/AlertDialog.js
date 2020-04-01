import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import {tripDelete} from '../api'

export default function AlertDialog({openDialog, setOpenDialog}) {

  const handleClose = () => {
    setOpenDialog(false)
  }

  const confirmDelete = () => {
    tripDelete(openDialog.id)
      .then(res => {
        if (res.status === 204) {
          window.location.reload()
        } else {
          handleClose()
        }
      })
  }

  return (
    <Dialog
      open={!!openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{`Are you sure you want to delete this trip?`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`${openDialog.name} from ${openDialog.origin_city}, ${openDialog.origin_state} to ${openDialog.destination_city}, ${openDialog.destination_state}.`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={confirmDelete} color="secondary" autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  )
}