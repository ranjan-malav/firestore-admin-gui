// Sample Schema of Firestore collection
// Step 3: Replace with your own schema
export const userProps = [
  "name", "country"
]

export const adminProps = [
  "role", "permissions"
]

export const collections = {
  'users': userProps, 
  'admins': adminProps
}