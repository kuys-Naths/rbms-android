import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = 'usersDb';

// Function to add a new user
export const addUser = async (user) => {
  const users = await getAllUsers();

  // Check if the username or name already exists
  const existingUser = users.find(existing => existing.username === user.username);
  if (existingUser) {
    throw new Error("Username already exists. Please choose a different one.");
  }

  const existingName = users.find(existing => existing.name === user.name);
  if (existingName) {
    throw new Error("Name already exists. Please try a new name.");
  }

  users.push(user);
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

// Function to retrieve all users
export const getAllUsers = async () => {
  const usersString = await AsyncStorage.getItem(USER_STORAGE_KEY);
  return usersString ? JSON.parse(usersString) : [];
};

// Function to clear the database (optional)
export const clearUsers = async () => {
  await AsyncStorage.removeItem(USER_STORAGE_KEY);
};

// Function to find a user by username and password
export const getUser = async (username, password) => {
  const users = await getAllUsers();
  return users.find(user => user.username === username && user.password === password);
};

// Function to reserve a bike for a user
export const reserveBike = async (username, bikeId) => {
  const users = await getAllUsers();
  const user = users.find(existing => existing.username === username);

  if (!user) {
    throw new Error("User not found.");
  }

  user.reservations = user.reservations || []; // Ensure reservations array exists
  user.reservations.push(bikeId);
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

// Function to get reservations for a specific user
export const getUserReservations = async (username) => {
  const users = await getAllUsers();
  const user = users.find(existing => existing.username === username);
  return user ? user.reservations : [];
};

// Function to delete a user account
export const deleteUser = async (username) => {
  const users = await getAllUsers();
  console.log('Current users:', users); // Debug: log current users
  const updatedUsers = users.filter(existing => existing.username !== username);

  if (updatedUsers.length === users.length) {
    throw new Error("User not found."); // No user deleted
  }

  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUsers));
  console.log('Updated users:', updatedUsers); // Debug: log updated users
};

// Function to initiate password reset process
export const initiatePasswordReset = async (username, email) => {
  const users = await getAllUsers();
  const user = users.find(existing => existing.username === username && existing.email === email);

  if (!user) {
    throw new Error("User not found with this email.");
  }

  // Generate a random verification code
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = verificationCode; // Store the code for later verification

  // Simulate sending an email with the verification code
  await sendEmailWithCode(email, verificationCode);

  // Debug: Log the generated verification code
  console.log(`Generated verification code for ${username}: ${verificationCode}`);

  // **Ensure users array is updated in AsyncStorage**
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

// Function to verify the verification code
export const verifyCode = async (username, code) => {
  const users = await getAllUsers();
  const user = users.find(existing => existing.username === username);

  // Check if user is found
  if (!user) {
    throw new Error("User not found.");
  }

  // Log the user object to ensure the code exists
  console.log('User object:', user);
  console.log(`Stored code: ${user.verificationCode}, Provided code: ${code}`);

  if (!user.verificationCode || user.verificationCode !== code) {
    throw new Error("Verification code is invalid.");
  }

  // Code is valid, clear the verification code
  delete user.verificationCode;
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

// Function to reset the password
export const resetPassword = async (username, newPassword) => {
  const users = await getAllUsers();
  const user = users.find(existing => existing.username === username);

  if (!user) {
    throw new Error("User not found.");
  }

  user.password = newPassword; // Update the password
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(users));
};

// Email service mock function (you can replace this with a real service)
export const sendEmailWithCode = async (email, code) => {
  console.log(`Sending verification code ${code} to ${email}`);
  // Here, you would integrate with an email service (e.g., Nodemailer)
};

// You can remove this object if it's not used elsewhere in your code
const userDatabase = {
  reservations: [], // An array to store reservation data

  addReservation: function (reservation) {
    this.reservations.push(reservation);
    console.log('Reservation added:', reservation);
  },

  getReservations: function () {
    return this.reservations;
  },
};


export default userDatabase;
