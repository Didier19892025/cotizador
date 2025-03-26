// Get user initials (first letter of first name and first letter of last name if available)
export const getUserInitials = (fullName: string) => {
  if (!fullName) return "?";
  
  const nameParts = fullName.split(" ");
  if (nameParts.length === 1) {
    // If only one name, return its first letter
    return nameParts[0].charAt(0).toUpperCase();
  } else {
    // Return first letter of first name and first letter of second name/surname
    return (nameParts[0].charAt(0) + nameParts[1].charAt(0)).toUpperCase();
  }
};
