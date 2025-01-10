import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import {TodoData} from './src/types/todo';

const App = (): React.JSX.Element => {
  const [todo, setTodo] = useState<TodoData[]>([]);
  const [text, setText] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [updatingId, setUpdatingId] = useState<number | null>(null); // Tracks the ID of the item being updated

  // Add a new todo
  const handleAddTodo = () => {
    if (text.trim()) {
      setTodo([...todo, {id: Date.now(), title: text}]);
      setText('');
    }
  };

  // Enable update mode for a specific todo
  const handleUpdateTodo = (id: number) => {
    const itemToUpdate = todo.find(item => item.id === id);
    if (itemToUpdate) {
      setUpdatingId(id);
      setUpdateText(itemToUpdate.title); // Populate the input with the current title
    }
  };

  // Update the text of the specific todo
  const handleUpdateText = () => {
    if (updatingId !== null && updateText.trim()) {
      setTodo(
        todo.map(item =>
          item.id === updatingId ? {...item, title: updateText} : item,
        ),
      );
      setUpdatingId(null); // Exit update mode
      setUpdateText('');
    }
  };

  // Delete a todo
  const handleDeleteTodo = (id: number) => {
    setTodo(todo.filter(item => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo App</Text>
      <TextInput
        style={styles.text_header}
        placeholder="Enter your todo"
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleAddTodo}
      />
      <Button title="Add Todo" onPress={handleAddTodo} />
      <View style={styles.content_container}>
        {todo.map(item => (
          <View key={item.id} style={styles.content}>
            {updatingId === item.id ? (
              <View style={styles.action_container}>
                <TextInput
                  style={[styles.input]}
                  value={updateText}
                  placeholder="Update todo"
                  onChangeText={setUpdateText}
                />
                <View style={styles.ok_button}>
                  <Button title="OK" onPress={handleUpdateText} />
                </View>
              </View>
            ) : (
              <>
                <Text style={{flex: 1}}>{item.title}</Text>
                <View style={styles.ok_button}>
                  <Button
                    title="Update"
                    onPress={() => handleUpdateTodo(item.id)}
                  />
                </View>
              </>
            )}
            <View>
              <Button
                title="Delete"
                onPress={() => handleDeleteTodo(item.id)}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 4,
    marginBottom: 8,
  },
  text_header: {backgroundColor: 'white', padding: 4, marginVertical: 10},
  content_container: {marginVertical: 20},
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  action_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ok_button: {marginRight: 10},
});
