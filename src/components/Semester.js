import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {DataGrid} from '@mui/x-data-grid';
import {SEMESTER_LIST, LOCAL_SERVER} from '../constants.js'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
// user selects from a list of  (year, semester) values
class Semester extends Component {
    constructor(props) {
      super(props);
      this.state = {selected: SEMESTER_LIST.length-1,
                  student_email : "",
                  student_name : ""
                };
    }
 
   onRadioClick = (event) => {
    console.log("Semester.onRadioClick "+JSON.stringify(event.target.value));
    this.setState({selected: event.target.value});
  }
  
  // handleClickOpen = () => {
  //   this.setState( {open:true} );
  // };

  // handleClose = () => {
  //   this.setState( {open:false} );
  // };

  // handleEmailChange = (event) => {
  //   this.setState({student_email: event.target.value});
  // }

  // handleNameChange = (event) => {
  //   this.setState({student_name: event.target.value});
  // }

  // handleAdd = () => {
  //   const token = Cookies.get('XSRF-TOKEN');
  //   console.log("Email " + this.state.student_email);
  //   console.log(this.state.student_name);
  //   console.log({ email: this.state.student_email,
  //     name: this.state.student_name });
  //   console.log(token)
  //   fetch(`http://localhost:8080/addStudent`, // This line will need to change depending on the backend
  //     {
  //       method: 'POST',
  //       headers: {  'X-XSRF-TOKEN' : token, 'Content-Type': 'application/json'},
  //       body: JSON.stringify({ email: this.state.student_email,
  //               name: this.state.student_name }),
  //       params: JSON.stringify({ email: this.state.student_email,
  //         name: this.state.student_name })
  //     }
  //   )
  //   .then(res => {
  //     if(res.ok) {
  //       toast.success(`${this.state.student_name} added`, {position: toast.POSITION.TOP_CENTER});
  //     }
  //     else {
  //       toast.error("Failed adding student", {position: toast.POSITION.TOP_CENTER});
  //     }
  //   })   
  //   .catch(err => {
  //     toast.error("Failed adding student", {position: toast.POSITION.TOP_CENTER});
  //   })
  //    //this.props.addStudent(this.state.student);
  //    this.handleClose();
  // }


  render() {    
      const icolumns = [
      {
        field: 'id',
        headerName: 'Year',
        width: 200,
        renderCell: (params) => (
          <div>
            <Radio
              checked={params.row.id == this.state.selected}
              onChange={this.onRadioClick}
              value={params.row.id}
              color="default"
              size="small"
            />
            { SEMESTER_LIST[params.row.id].year }
          </div>
        )
      },
      { field: 'name', headerName: 'Semester', width: 200 }
      ];       
       
    return (
       <div>
         <AppBar position="static" color="default">
            <Toolbar>
               <Typography variant="h6" color="inherit">
                  Schedule - select a term
               </Typography>
            </Toolbar>
         </AppBar>
         <div align="left" >
              <div style={{ height: 400, width: '100%', align:"left"   }}>
                <DataGrid   rows={SEMESTER_LIST} columns={icolumns} />
              </div>                
              <Button component={Link} 
                      to={{pathname:'/schedule' , 
                      year:SEMESTER_LIST[this.state.selected].year, 
                      semester:SEMESTER_LIST[this.state.selected].name}} 
                variant="outlined" color="primary" style={{margin: 10}}>
                Get Schedule
              </Button>
              <Button
              component={Link}
              to={{pathname:'/addStudent'}}
              variant="outlined" color="primary" style={{margin: 10}}>
              Add Student
            </Button>
            
            {/* <Dialog open={this.state.open} onClose={this.handleClose}>
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
              </Dialog>       */}

          </div>
      </div>
    )
  }
}
export default Semester;