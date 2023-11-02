import MyTodos from '../_PageSections/MyTodos';
import { GetTodosByUserId } from '@/lib/API/Database/todos/queries';

export default async function ListTodos() {
  const todos = await GetTodosByUserId();

  return (
    <div>
      <MyTodos todos={todos} />
    </div>
  );
}
