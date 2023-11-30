import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import EmptyTasksList from "./components/EmptyTasksList";
import { useTasks } from "./hooks/useTasks";
import TaskItem from "./components/TaskItem";
import { PriorityLevel } from "./Task";
import TasksList from "./components/TasksList";

const TodoApp = () => {
  const { tasks } = useTasks();
  return (
    <Grid
      templateAreas={`"nav" 
                      "main"`}
    >
      <GridItem area="nav" padding="15px">
        <NavBar />
      </GridItem>
      <GridItem area="main" padding="20px">
        {tasks.length === 0 ? <EmptyTasksList /> : <TasksList />}
      </GridItem>
    </Grid>
  );
};

export default TodoApp;
