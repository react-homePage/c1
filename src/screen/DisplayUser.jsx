/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import UserCard from '../component/UserCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormModal from '../component/FormModal';
import EditModal from '../component/EditModal';
import {deleteCheckItem, deleteDisplayUser} from '../store/reducer/slice';

const DisplayUser = ({navigation}) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [selectAllCheckbox, setSelectAllCheckbox] = useState(false);

  const [selectedUser, setSelectedUser] = useState([]);

  const userData = useSelector(state => state?.userData?.displayUser);
  const dispatch = useDispatch();
  console.log('userData', userData);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'All user List to  display',
      headerRight: () => (
        <View style={{paddingRight: 20}}>
          <TouchableOpacity onPress={() => handleAddUsers()}>
            <Ionicons name="add-outline" size={30} color="red" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const handleAddUsers = value => {
    setShowFormModal(prev => !prev);
  };

  const handleEdit = value => {
    console.log('edit button pressed');
    console.log('value', value);
    setShowEditModal(prev => !prev);
    setEditItem(value);
  };

  const handleDelete = item => {
    console.log('delete it');
    const filterArray = userData.filter(data => data.email !== item.email);
    Alert.alert('do you want to delete this user', 'please conform', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => dispatch(deleteDisplayUser(filterArray))},
    ]);
  };

  const showCheck = () => {
    setShowCheckbox(prev => !prev);
  };

  const selectAllCheck = () => {
    if (selectAllCheckbox) {
      setSelectedUser([]);
    } else {
      const data = userData.map(item => item.email);
      setSelectedUser(data);
    }
    console.log(selectedUser);
    setSelectAllCheckbox(prev => !prev);
  };

  const handleCheckClick = val => {
    if (!selectedUser.includes(val)) {
      setSelectedUser([...selectedUser, val]);
    } else {
      const filter = selectedUser.filter(values => values !== val);
      setSelectedUser(filter);
    }
  };

  // Handles "Select All" or "Deselect All" logic
  // const selectAllCheck = () => {
  //   if (selectAllCheckbox) {
  //     If `selectAllCheckbox` is true, all users are currently selected.
  //     Clicking again should deselect all, so we empty the selectedUser array.
  //     setSelectedUser([]);
  //   } else {
  //     If `selectAllCheckbox` is false, not all users are selected.
  //     Clicking should select all, so we populate the selectedUser array.
  //     const data = userData.map(item => item.email);
  //     setSelectedUser(data);
  //   }

  //   Toggle the selectAllCheckbox state to its opposite
  //   setSelectAllCheckbox(prev => !prev);
  // };

  // Function to handle selecting/deselecting a single user
  // const handleUserCheck = (email) => {
  //   if (selectedUser.includes(email)) {
  //     // If user is already selected, remove them from the selectedUser array
  //     setSelectedUser(prevSelected => prevSelected.filter(userEmail => userEmail !== email));
  //   } else {
  //     // If user is not selected, add them to the selectedUser array
  //     setSelectedUser(prevSelected => [...prevSelected, email]);
  //   }
  // };

  const deleteCheckUser = () => {
    console.log('user data array', userData);
    const filteredArray = userData.filter(
      value => !selectedUser.includes(value.email),
    );
    console.log('filter check array', filteredArray);
    dispatch(deleteCheckItem(filteredArray));
  };
  console.log('selected user List ', selectedUser);
  return (
    <View>
      <View style={{flexDirection: 'row', columnGap: 15}}>
        <TouchableOpacity
          onPress={() => deleteCheckUser()}
          style={{backgroundColor: 'red', width: 70, padding: 5}}>
          <Text style={{color: 'white', fontSize: 16}}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => showCheck()}
          style={{backgroundColor: 'red', width: 70, padding: 5}}>
          <Text style={{color: 'white', fontSize: 16}}>Select</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectAllCheck()}
          style={{backgroundColor: 'red', width: 100, padding: 5}}>
          <Text style={{color: 'white', fontSize: 16}}>
            {selectAllCheckbox ? 'deSelect' : 'selectAll'}
          </Text>
        </TouchableOpacity>
      </View>
      {userData && Array.isArray(userData) && userData.length > 0 ? (
        <>
          <FlatList
            data={userData}
            keyExtractor={item => item.email}
            renderItem={({item}) => (
              <View style={{margin: 5}}>
                <UserCard
                  item={item}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  showCheckbox={showCheckbox}
                  selectAllCheckbox={selectAllCheckbox}
                  checked={selectedUser.includes(item.email) ? true : false}
                  handleCheckClick={handleCheckClick}
                />
              </View>
            )}
          />
        </>
      ) : (
        <>
          <Text style={{color: 'black'}}>No Data</Text>
        </>
      )}
      {showFormModal && (
        <FormModal
          showFormModal={showFormModal}
          setShowFormModal={setShowFormModal}
        />
      )}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          showEditModal={showEditModal}
          editItem={editItem}
        />
      )}
    </View>
  );
};

export default DisplayUser;

const styles = StyleSheet.create({});

//notes
// Problems with This Approach
// State Lag: React state updates are asynchronous. So, if you toggle selectAllCheckbox at the beginning of the function, selectAllCheckbox might not reflect the new value immediately within the same function call. This leads to potential inconsistencies, as you might still be working with the old value of selectAllCheckbox.

// Logic Breaks: In the modified code above, the logic still depends on the previous state of selectAllCheckbox, because selectAllCheckbox hasn’t officially updated yet during the decision-making process. This can make it behave unpredictably.

// Why the Original Order Is Correct
// In the original code:

// You use the current value of selectAllCheckbox to decide what to do.
// Once the decision is made, you toggle selectAllCheckbox to reflect the new state.
// By updating selectAllCheckbox at the end:

// You avoid potential confusion that comes from state updates not being immediately reflected within the same render cycle.
// You keep the code behavior predictable.
// Key Takeaways
// State updates in React are asynchronous: Changing the state and then trying to use the updated state immediately can lead to unexpected results.
// Order matters when dealing with state logic. It’s best to decide based on the current state first, then update the state to its new value.
// Correct Workflow
// Check the current state of selectAllCheckbox.
// Take action (empty or fill selectedUser) based on that current state.
// Update selectAllCheckbox to its new value to reflect what the state should now represent.
// Best Practice
// Keeping the state update (setSelectAllCheckbox) at the end helps ensure that your logic flows predictably and reacts to the current state rather than attempting to work with a potentially stale or asynchronous update.

// Let me know if you want a different solution or if this clarifies the importance of the current approach!
