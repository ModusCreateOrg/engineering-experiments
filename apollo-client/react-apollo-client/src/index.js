import React from 'react';
import ReactDOM from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { BrowserRouter,Route, Routes } from 'react-router-dom';

import './index.css';
import App from './App';
import NewTask from './task/newTask';
import EditTask from './task/editTask';
import ListTasks from './task/list';
import reportWebVitals from './reportWebVitals';


const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<ListTasks />} />
          <Route exact path="/list" element={<ListTasks />} />
          <Route path="/task" element={<NewTask />} />
          <Route exact path="/task/:taskId" element={<NewTask />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
