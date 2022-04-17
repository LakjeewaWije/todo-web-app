import React from 'react';
import { act, fireEvent, prettyDOM, render, screen, waitFor } from '@testing-library/react';
import TodoComponent from './App';
jest.setTimeout(30000);
describe('Todo component functionalities', function () {

  test('renders todo component', () => {
    render(<TodoComponent />);
    const linkElement = screen.getByText(/Todo App/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('create a todo', async () => {

    const dom: any = await act(async () => { render(<TodoComponent />) });

    const input: any = screen.getByLabelText('todo-input');

    fireEvent.change(input, { target: { value: 'sample test todo' } })
    expect(input.value).toBe('sample test todo');

    const newListBtn = screen.getByText(/New List/i);
    expect(newListBtn).toBeInTheDocument();

    act(() => { fireEvent.click(newListBtn); });

    await new Promise((r) => setTimeout(r, 2000));

    fireEvent.change(input, { target: { value: '' } });
    expect(input.value).toBe('');

    // console.log(prettyDOM(dom));

    const sampleTestTitle = screen.getByText(/sample test todo/i);
    expect(sampleTestTitle).toBeInTheDocument();

  });

  test('add subtask', async () => {

    const dom: any = await act(async () => { render(<TodoComponent />) });

    await new Promise((r) => setTimeout(r, 2000));

    const sampleTestTitle = screen.getByText(/sample test todo/i);
    expect(sampleTestTitle).toBeInTheDocument();

    const id = sampleTestTitle.id;
    const subTaskInput = "subtask-input" + id;
    const subTaskBtn = "subtask-btn" + id;
    const subTaskInputElement: any = screen.getByTestId(subTaskInput);
    expect(subTaskInputElement).toBeInTheDocument();

    const subTaskBtnElement = screen.getByTestId(subTaskBtn);
    expect(subTaskBtnElement).toBeInTheDocument();

    fireEvent.change(subTaskInputElement, { target: { value: 'sample test sub task' } });
    expect(subTaskInputElement.value).toBe('sample test sub task');

    act(() => { fireEvent.click(subTaskBtnElement); });

    await new Promise((r) => setTimeout(r, 2000));

    const sampleSubTaskTestTitle = screen.getByText(/sample test sub task/i);
    expect(sampleSubTaskTestTitle).toBeInTheDocument();

  });

  test('complete sub task', async () => {

    const dom: any = await act(async () => { render(<TodoComponent />) });

    await new Promise((r) => setTimeout(r, 2000));

    const sampleTestTitle = screen.getByText(/sample test todo/i);
    expect(sampleTestTitle).toBeInTheDocument();

    const id = sampleTestTitle.id;

    const mainTodoCheckBox = "todo-task" + id;
    const subTaskCheckBox = "todo-sub-task" + id;

    const subTaskCheckBoxElement: any = screen.getByTestId(subTaskCheckBox);
    expect(subTaskCheckBoxElement).toBeInTheDocument();

    act(() => { fireEvent.click(subTaskCheckBoxElement); });

    await new Promise((r) => setTimeout(r, 2000));

    const mainTodoCheckBoxElement = screen.getByTestId(mainTodoCheckBox);
    expect(mainTodoCheckBoxElement).toBeInTheDocument();
    expect(mainTodoCheckBoxElement).toBeChecked();


  });

  test('change complete sub task to incomplete state', async () => {

    const dom: any = await act(async () => { render(<TodoComponent />) });

    await new Promise((r) => setTimeout(r, 2000));

    const sampleTestTitle = screen.getByText(/sample test todo/i);
    expect(sampleTestTitle).toBeInTheDocument();

    const id = sampleTestTitle.id;

    const mainTodoCheckBox = "todo-task" + id;
    const subTaskCheckBox = "todo-sub-task" + id;

    const subTaskCheckBoxElement: any = screen.getByTestId(subTaskCheckBox);
    expect(subTaskCheckBoxElement).toBeInTheDocument();

    act(() => { fireEvent.click(subTaskCheckBoxElement); });

    await new Promise((r) => setTimeout(r, 2000));

    const mainTodoCheckBoxElement = screen.getByTestId(mainTodoCheckBox);
    expect(mainTodoCheckBoxElement).toBeInTheDocument();
    expect(mainTodoCheckBoxElement).not.toBeChecked();


  });

  test('complete main todo', async () => {

    const dom: any = await act(async () => { render(<TodoComponent />) });

    await new Promise((r) => setTimeout(r, 2000));

    const sampleTestTitle = screen.getByText(/sample test todo/i);
    expect(sampleTestTitle).toBeInTheDocument();

    const id = sampleTestTitle.id;

    const mainTodoCheckBox = "todo-task" + id;
    const subTaskCheckBox = "todo-sub-task" + id;

    const mainTodoCheckBoxElement: any = screen.getByTestId(mainTodoCheckBox);
    expect(mainTodoCheckBoxElement).toBeInTheDocument();

    act(() => { fireEvent.click(mainTodoCheckBoxElement); });

    await new Promise((r) => setTimeout(r, 2000));

    const subTaskCheckBoxElement = screen.getByTestId(subTaskCheckBox);
    expect(subTaskCheckBoxElement).toBeInTheDocument();
    expect(subTaskCheckBoxElement).toBeChecked();
  });

  test('delete the todo', async () => {

    const dom: any = await act(async () => { render(<TodoComponent />) });

    await new Promise((r) => setTimeout(r, 2000));

    const sampleTestTitle = screen.getByText(/sample test todo/i);
    expect(sampleTestTitle).toBeInTheDocument();

    const id = sampleTestTitle.id;

    const mainTodoDleteBtn = "todo-task-delete" + id;

    const mainTodoDleteBtnElement: any = screen.getByTestId(mainTodoDleteBtn);
    expect(mainTodoDleteBtnElement).toBeInTheDocument();

    act(() => { fireEvent.click(mainTodoDleteBtnElement); });

    await new Promise((r) => setTimeout(r, 2000));

    expect(sampleTestTitle).not.toBeInTheDocument();


  });

});
