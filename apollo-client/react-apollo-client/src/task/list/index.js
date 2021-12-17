import { useQuery } from '@apollo/client';
import { gql } from "@apollo/client";
import Loading from '../../components/loading';

import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

const columns = [
   // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'title',
      headerName: 'Title',
      width: 400,
      editable: false,
    },
    {
      field: 'taskStatus',
      headerName: 'Status',
      width: 400,
      editable: false,
    },
    {
      field: 'targetDate',
      headerName: 'Target Date',
      // type: 'number',
      width: 400,
      editable: false,
      valueGetter: (params) => {
        const targetDate = new Date(parseInt(params.row.targetDate));
        return `${targetDate.getMonth()+1}-${targetDate.getDate()}-${targetDate.getFullYear()}`;
      }
    },
    {
      field: 'description',
      headerName: 'Description',
      description: 'This column has a value getter and is not sortable.',
      editable: false,
      width: 500,
    },
  ];
  


const GET_TASKS = gql`
  query getAllTasks($pageSize:Int, $after: String) {
    tasks(pageSize: $pageSize, after: $after) {
      id
      title
      description
      taskStatus
      targetDate
    }
  }
`;

const preventDefault = (event) => event.preventDefault();

export default function TaskDataGrid() {
  const[tasks, setTasks] = useState([]);
    const { data, loading, error } =  useQuery(GET_TASKS);
    useEffect(() => {
      // do some checking here to ensure data exist
      if (data && data.tasks) {
        console.log(data);
        const { tasks } = data;
        setTasks(tasks);
      }
    }, [data]);
    const navigate = useNavigate();
    if (loading) return <Loading />;
    if (error) return <p>ERROR</p>;
    if (!data) return <p>Not found</p>;
    
    
    
    const handleClickOpenFmConfigForm = (rowData) => {
        navigate(`/task/${rowData.id}`);        
    }


    return (
        <div style={{ height: 700, width: 1700 }}>
        <Box sx={{
          typography: 'body1',
          '& > :not(style) + :not(style)': {
            ml: 2,
          },
          }}
          onClick={preventDefault}
        >
          <Link href="/task" underline="none">
            New Task
          </Link>
        </Box>
          <DataGrid
            rows={tasks}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableSelectionOnClick
            onRowClick={(rowData) => handleClickOpenFmConfigForm(rowData.row)}
          />
        </div>
      
      
    );
  }