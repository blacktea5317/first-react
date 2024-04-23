import { grey } from '@mui/material/colors';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';

import Img from '../assets/work_shigoto_osame_man.png';
import { useState } from 'react';

function Todo() {
  const [tasks, setTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks((t) => [...t, newTask]);
      setNewTask('');
    }
  }

  function deleteTask(index: number) {
    const undatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(undatedTasks);
  }

  return (
    <Container className="to-do-list" maxWidth="xl">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: grey[50],
        }}
      >
        <Typography variant="h3" sx={{ m: 5 }}>
          🔥🔥🔥
        </Typography>
        <TextField
          sx={{ width: '80%' }}
          label="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <Button
          className="add-btn"
          variant="contained"
          sx={{ m: 3 }}
          onClick={addTask}
        >
          Create
        </Button>
      </Box>

      <Box
        sx={{
          m: 3,
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: `url(${Img})`,
          backgroundPosition: 'right bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'auto 100%',
        }}
      >
        <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {tasks.map((task, index) => (
            <Grid xs={12} sm={6} md={4} lg={3}>
              <Card key={index}>
                <CardContent>
                  <Typography className="text" variant="h5" component="div">
                    {task}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    className="delete-btn"
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => deleteTask(index)}
                  >
                    <DeleteIcon />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Todo;
