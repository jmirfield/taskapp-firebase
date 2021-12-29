import React from 'react'
import useRequest from '../../hooks/useRequest';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const { isLoading, error, sendRequest } = useRequest()
  const enterTaskHandler = async (taskText) => {
    sendRequest((data) => { // data is firebase unique name
      // console.log(data)
      props.onAddTask({
        id: data.name,
        text: taskText
      })
    }, {
      method: 'POST',
      body: JSON.stringify({ text: taskText }),
      headers: { 'Content-Type': 'application/json' }
    })
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
