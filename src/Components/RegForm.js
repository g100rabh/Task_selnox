import React, { useRef, useState } from "react";

import classes from "./RegForm.module.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

import axios from 'axios';
import { convertToHTML } from "draft-convert";


const RegForm = () => {
  const fNameInput = useRef();
  const lNameInput = useRef();
  const dobInput = useRef();
  const studyInput = useRef();
  const sDateInput = useRef();
  const eDateInput = useRef();
  const salaryInput = useRef();
  const formInput = useRef();

  const [editorState, updateEditorState] = useState(EditorState.createEmpty());

  const saveHandler = async (e) => {
      e.preventDefault();
    console.log({
        CurrentSalary: salaryInput.current.value,
      DOB: dobInput.current.value,
      Description: editorState.getCurrentContent(),
      EndDate: eDateInput.current.value,
      FirstName:fNameInput.current.value,
      LastName:lNameInput.current.value,
      StartDate: sDateInput.current.value,
      Study: studyInput.current.value, 
      id: Math.random().toString()})
        try {
            const res = await axios.post('https://sweede.app/DeliveryBoy/Add-Employee/', {
              CurrentSalary: salaryInput.current.value,
              DOB: dobInput.current.value,
              Description: convertToHTML(editorState.getCurrentContent()),
              EndDate: eDateInput.current.value,
              FirstName:fNameInput.current.value,
              LastName:lNameInput.current.value,
              StartDate: sDateInput.current.value,
              Study: studyInput.current.value, 
              id: Math.random().toString()})
              formInput.current.reset();
              updateEditorState(EditorState.createEmpty());
              alert('Successfully saved')
        } catch(err) {
            console.log(err);
        }

        
      
  }
  

  return (
    <div className={classes.regFormCon}>
      <form ref={formInput}>
        <div className={classes.nameCon}>
          <div>
            <label>First Name*</label>
            <input type="text" placeholder="Enter your name" ref={fNameInput} />
          </div>
          <div>
            <label>Last Name*</label>
            <input type="text" ref={lNameInput} placeholder="Enter your name" />
          </div>
        </div>
        <div className={classes.dobCon}>
          <div>
            <label>DOB</label>
            <input type="date" ref={dobInput} placeholder="Enter your dob" />
            <label>Study</label>
            <select ref={studyInput}>
              <option>BE</option>
              <option>Btech</option>
              <option>B.Sc</option>
              <option>BCA</option>
            </select>
          </div>
        </div>
        <div className={classes.dateCon}>
          <div>
            <label>Start Date</label>
            <input type="date" ref={sDateInput} placeholder="2-6-22" />
          </div>
          <div>
            <label>End Date</label>
            <input type="date" ref={eDateInput} placeholder="7-7-23" />
          </div>
        </div>
        <div className={classes.salaryCon}>
          <label>Current Salary</label>
          <input type="number" ref={salaryInput} placeholder="30000" />
          <label>Description</label>
          <div className={classes.editorCon}>
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={updateEditorState}
              // ref={contentInputRef}
            />
          </div>
        </div>
        <div className={classes.btnCon}>
          <button className={classes.cancel}>Cancel</button>
          <button className={classes.save} onClick={saveHandler}>Save</button>
        </div>
      </form>
    </div>
  );
};

export default RegForm;
