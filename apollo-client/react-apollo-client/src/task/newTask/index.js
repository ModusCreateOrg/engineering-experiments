import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Loading from '../../components/loading';

const GET_TASK_BY_ID = gql`
  query taskById($id: Int) {
    taskById(id: $id) {
      id
      title
      description
      taskStatus
      targetDate
    }
  }
`;

const CREATE_TASK = gql`
  mutation insert_task($id: Int, $title: String!, $description: String!, $targetDate: Date, $taskStatus: String!) {
    insert_task( id: $id, title: $title, description: $description, targetDate: $targetDate, taskStatus: $taskStatus) {
        title
        description
        targetDate
        taskStatus
      }
  }
`;

function NewTask() {
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetDate, setTargetDate] = useState(new Date());
  const [taskStatus, setTaskStatus] = useState("Not Started");
  const [createTask, { loading, error }] = useMutation(CREATE_TASK);
  const navigate = useNavigate();
  const params = useParams();
  
  
  const { taskId } = params;
  const { data, loading: queryLoading, error: queryError } = useQuery(GET_TASK_BY_ID, { variables: { id: parseInt(taskId) , skip: !taskId } });

  useEffect(() => {
    // do some checking here to ensure data exist
    if (data && data.taskById) {
      const task = data.taskById;
      // mutate data if you need to
      setTitle(task.title);
      setTaskStatus(task.taskStatus);
      setDescription(task.description);
      setId(task.id);
      setTargetDate(task.targetDate);
    }
  }, [data]);
  
  if(queryLoading) return <Loading />;
  if(queryError) return <p>Error</p>;
  // if(!data.taskById) return <p>Not Found</p>;


  if (loading) return <Loading />;
  if (error) return <p>ERROR</p>;
  if (!data) return <p>Not found</p>;
  

  const handleCreateTask = async(event) => {
    event.preventDefault();
    // the mutate function also doesn't return a promise
    const result = await createTask({ variables: { title, description, targetDate, taskStatus, id } });
    const tasks = result.data.insert_task;
    if(tasks.length > 0) {
      navigate('/');
    } 
  }

  return (
    <div>
      <h1>New Task</h1>
      <form onSubmit={handleCreateTask}>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Title" variant="outlined" value={title} onChange={(event) => setTitle(event.target.value)} />
          <TextField id="outlined-basic" label="Description" variant="outlined" value={description} onChange={(event) => setDescription(event.target.value)} />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                  label="Target Date"
                  value={targetDate}
                  onChange={(date) => {
                    setTargetDate(date);
                  }}
                  renderInput={(params) => <TextField {...params} />}
              />
          </LocalizationProvider>
          <InputLabel id="task-status-select-label">Status</InputLabel>
          <Select
            labelId="task-status-select-label"
            id="task-status-select"
            value={taskStatus}
            label="Status"
            onChange={(event) => {
              setTaskStatus(event.target.value);
            }}
          >
            <MenuItem value="Not Started">Not Started</MenuItem>
            <MenuItem value="In-Progress">In-Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
          <Button disabled={loading} variant="contained" size="large" type="submit">
            Submit
          </Button>
          { error && <p>{error.message}</p> }
        </Box>
      </form>
    </div>
  );
}

export default NewTask;

