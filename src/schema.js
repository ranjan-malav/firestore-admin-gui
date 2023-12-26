// Sample Schema of Firestore collection
// Step 3: Replace with your own schema
export const userProps = [
  "name", "phone"
]

export const adminProps = [
  "name"
]

export const foodItemsProps = [
  "name"
]

export const collections = [
  {
    "path": "users",
    "label": "Users",
    "props": userProps
  },
  {
    "path": "admins",
    "label": "Admins",
    "props": adminProps
  },
  // Sample schema for nested collection, in this path value should be kept "custom"
  // key is used for storing the data in state, change as per your needs
  // For nested collections, you have to enter full path in the input, e.g. "users/xyz/roles/123"
  {
    "path": "custom",
    "key": "food_items",
    "label": "FoodItems",
    "props": foodItemsProps
  }
]