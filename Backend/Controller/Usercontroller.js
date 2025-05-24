import RegisterModel from "../Model/RegisterModel.js";
export const getAllUsers = async (req, res) => {
    try {
      const users = await RegisterModel.find(); 
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users", error: error.message });
    }
  };

  // bloke a user 

export const blokeUser = async (req,res) =>{
  try {
    const userId = req.params.id;
    const UpdateUser= await RegisterModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    )
    res.status(200).json({message:"User are bloked succefully "})

  } catch (error) {
    res.status(500).json({message :"User is not bloked succefully"})
  }
}

//unbloke user 
export const unblockUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await RegisterModel.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    );
    res.status(200).json({ message: 'User unblock succefully ', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'user unblock error ' });
  }
};

//. Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    await RegisterModel.findByIdAndDelete(userId);
    res.status(200).json({ message: 'User delete delete sucessfully ' });
  } catch (err) {
    res.status(500).json({ message: 'error ' });
  }
};

// Counting  users 

export const totalCount = async (req ,res ) =>{
  try {
    const count = await RegisterModel.countDocuments();
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get user count' });

  }
}
