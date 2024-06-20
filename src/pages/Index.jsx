import React, { useState } from 'react';
import { Container, VStack, HStack, Input, Button, Checkbox, Text, Box } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [newTodo, setNewTodo] = useState("");
  const [selectedListIndex, setSelectedListIndex] = useState(null);

  const addList = () => {
    if (newListName.trim() === "") return;
    setLists([...lists, { name: newListName, todos: [] }]);
    setNewListName("");
  };

  const addTodo = () => {
    if (newTodo.trim() === "" || selectedListIndex === null) return;
    const updatedLists = [...lists];
    updatedLists[selectedListIndex].todos.push({ text: newTodo, completed: false });
    setLists(updatedLists);
    setNewTodo("");
  };

  const toggleTodo = (listIndex, todoIndex) => {
    const updatedLists = [...lists];
    updatedLists[listIndex].todos[todoIndex].completed = !updatedLists[listIndex].todos[todoIndex].completed;
    setLists(updatedLists);
  };

  const deleteList = (listIndex) => {
    const updatedLists = lists.filter((_, index) => index !== listIndex);
    setLists(updatedLists);
    setSelectedListIndex(null);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input
            placeholder="New List Name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addList}>
            Add List
          </Button>
        </HStack>
        <HStack width="100%">
          <Input
            placeholder="New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            isDisabled={selectedListIndex === null}
          />
          <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addTodo} isDisabled={selectedListIndex === null}>
            Add Todo
          </Button>
        </HStack>
        <VStack spacing={4} width="100%">
          {lists.map((list, listIndex) => (
            <Box key={listIndex} width="100%" p={4} borderWidth={1} borderRadius="md">
              <HStack justifyContent="space-between">
                <Text fontSize="xl" fontWeight="bold">{list.name}</Text>
                <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => deleteList(listIndex)}>
                  Delete List
                </Button>
              </HStack>
              <VStack spacing={2} mt={4}>
                {list.todos.map((todo, todoIndex) => (
                  <HStack key={todoIndex} width="100%">
                    <Checkbox isChecked={todo.completed} onChange={() => toggleTodo(listIndex, todoIndex)}>
                      {todo.text}
                    </Checkbox>
                  </HStack>
                ))}
              </VStack>
              <Button mt={4} colorScheme="blue" size="sm" onClick={() => setSelectedListIndex(listIndex)}>
                {selectedListIndex === listIndex ? "Selected" : "Select List"}
              </Button>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;