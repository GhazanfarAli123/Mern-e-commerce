import bcrypt from "bcrypt"

export const passwordHashing = async (password) => {
    try {
      if (!password) {
        throw new Error("Password is required.");
      }
  
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      return hashedPassword;
    } catch (err) {
      console.log(err);
      throw new Error("Error occurred while hashing the password.");
    }
  };
export const comparePassword = async(password,hashedPassword) => {
    return await bcrypt.compare(password,hashedPassword)
}