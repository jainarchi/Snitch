import userModel from "../models/user.model.js";



const addAddress = async (req, res) => {
  const userId = req.user.id;
  const { label, addressLine, city, state, pincode } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      res.status(400).json({
        message: "Unauthorized",
      });
    }

    if (user.addresses.length >= 5) {
      return res.status(400).json({
        message: "Maximum 5 addresses allowed",
      });
    }

    user.addresses.push({ label, addressLine, city, state, pincode });
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address added successfully",
      addresses : user.addresses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


const deleteAddress = async (req, res) => {
  const { addressId } = req.params;

  try {
    const user = await userModel.findById(req.user.id);
    

    if(!user){
      return res.status(400).json({
        message : "user not found"
      })
    }


    const address = user.addresses.id(addressId);

    if(!address){
      return res.status(400).json({
        message : "Address not found"
      })
    }

    user.addresses.pull({_id: addressId});
    await user.save();


    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
      
    })

  

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}


const setPassword = async (req, res) => {
  const userId = req.user.id;
  const { password } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Check if user already has a password
    if (user.password) {
      return res.status(400).json({
        message: "Password already exists",
      });
    }

    user.password = password;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password set successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


const changePassword = async (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await userModel.findById(userId).select("+password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Check if user has a password set
    if (!user.password) {
      return res.status(400).json({
        message: "No password set. Please use set password instead.",
      });
    }

    // Verify current password
    const isPasswordValid = await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Current password is incorrect",
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



export {
  addAddress,
  deleteAddress,
  setPassword,
  changePassword,
}