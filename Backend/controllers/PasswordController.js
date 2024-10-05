//@desc Get all the passwords
//@route Get
//@access public
import Password from '../models/PasswordModels.js';



export const getPasswords = async(req , res)=>{
    try {
        const passwords = await Password.find({user_id: req.user.id});
        res.json(passwords);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch passwords' });
    }
  };



  export const createPassword = async (req, res) => {
    try {
        const { websiteName, websiteUrl, password } = req.body;

        // Validate that required fields are present
        if (!websiteName || !websiteUrl || !password) {
            return res.status(400).json({ error: 'Website name, URL, and password are required.' });
        }
      // Ensure user_id is being pulled from req.user (if token-based auth is used)
      const userId = req.user.Id; // Assuming req.user is populated by authentication middleware
  
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      // Create a new password record
      const newPassword = new Password({
        ...req.body,
        user_id: req.user.id, // Ensure the user_id is added if you have it in the request
    });
      await newPassword.save();
      res.status(201).json(newPassword);
    } catch (err) {
      res.status(500).json({ error: 'Failed to save password' });
    }
  };
  

 export const deletePassword = async(req , res)=>{

    try {
        await Password.findByIdAndDelete(req.params.id);
        res.json({ message: 'Password deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete password' });
    }
}

