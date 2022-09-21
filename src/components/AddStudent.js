import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { LOCAL_SERVER } from '../constants';
// properties addCoure is required, function called when Add clicked.
class AddStudent extends Component {
      constructor(props) {
      super(props);
      this.state = {open: true,  
        student_email : "",
        student_name : ""};
    };
    
    handleClickOpen = () => {
        this.setState( {open:true} );
      };
    
      handleClose = () => {
        this.setState( {open:false} );
      };
    
      handleEmailChange = (event) => {
        this.setState({student_email: event.target.value});
      }
    
      handleNameChange = (event) => {
        this.setState({student_name: event.target.value});
      }
    
      handleAdd = () => {
        const token = Cookies.get('XSRF-TOKEN');
        console.log("Email " + this.state.student_email);
        console.log(this.state.student_name);
        console.log({ email: this.state.student_email,
          name: this.state.student_name });
        console.log(token)
        fetch(`${LOCAL_SERVER}/addStudent`, // This line will need to change depending on the backend
          {
            method: 'POST',
            headers: {  'X-XSRF-TOKEN' : token, 'Content-Type': 'application/json'},
            body: JSON.stringify({ email: this.state.student_email,
                    name: this.state.student_name })
          }
        )
        .then(res => {
          if(res.ok) {
            toast.success(`${this.state.student_name} added`, {position: toast.POSITION.TOP_CENTER});
          }
          else {
            toast.error("Failed adding student", {position: toast.POSITION.TOP_CENTER});
            console.error('POST HTTP status =' + res.status);
          }
        })   
        .catch(err => {
          toast.error("Failed adding student", {position: toast.POSITION.TOP_CENTER});
          console.error(err); 
        })
         //this.props.addStudent(this.state.student_email);
         this.handleClose();
      }
    

    render()  { 
      return (
          <div>
            <Button variant="outlined" color="primary" style={{margin: 10}} onClick={this.handleClickOpen}>
              Add Student
            </Button>
            
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Student</DialogTitle>
                <DialogContent  style={{paddingTop: 20}} >
                  <TextField autoFocus fullWidth label="Student Name" name="student_name" onChange={this.handleNameChange}  /> 
                  <TextField autoFocus fullWidth label="Student Email" name="student_email" onChange={this.handleEmailChange}  /> 
                </DialogContent>
                <DialogActions>
                  <Button color="secondary" onClick={this.handleClose}>Cancel</Button>
                  
                  <Button id="Add" color="primary" onClick={this.handleAdd} 
                  >Add
                  </Button>
                </DialogActions>
              </Dialog>      
              <br/>
              <Button component={Link} to={{pathname:'/'}}>
                Back
              </Button>
          </div>
      ); 
    }
}

// AddStudent.propTypes = {
//   addStudent : PropTypes.func.isRequired
// }

export default AddStudent;