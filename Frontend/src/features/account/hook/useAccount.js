import {deleteUserAddress , setUserAddresses , setPassword , changePassword , getStates , getCities } from '../services/account.api.js'
import { useDispatch } from 'react-redux'
import { setAddresses , deleteAddress} from '../../auth/state/auth.slice.js'



export const useAccount = () => {

    const dispatch = useDispatch()


  const handleAddAddress = async ({ label, addressLine, city, state, pincode }) => {

    try {
      const data = await setUserAddresses({ label, addressLine, city, state, pincode })
      dispatch(setAddresses(data.addresses))
      return {
        success: true,
        message: "Address added successfully"
      }

    } catch (err) {
      console.log(err)
      return {
        success: false,
        message: "Something went wrong"
      }
    }
  }
  


  const handleDeleteAddress = async (addressId) => {
    try{
     await deleteUserAddress(addressId)
     dispatch(deleteAddress(addressId))
     return {
       success : true,
       message : "Address deleted successfully"
     }
     
    }
    catch(err){
      console.log(err)
      return {
        success : false,
        message : "Something went wrong"
      }
    }
  }

  const handleSetPassword = async ( password) =>{
      try{
        await setPassword(password)
        return {
          success : true,
          message : "Password set successfully"
        }
      }catch(err){
        console.log(err.response.data.message || err.message)
        return {
          success : false,
          message : "Something went wrong"
        }
      }

  }


  const handleChangePassword = async ({currentPassword, newPassword}) =>{

    try{
      await changePassword({currentPassword, newPassword})
      return {
        success : true,
        message : "Password changed successfully"
      }
    }catch(err){
      console.log(err)
      return {
        success : false,
        message : "Something went wrong"
      }
    }

  }

  const handleGetStates = async () => {
    try {
      const data = await getStates()
        return {
          success : true,
          states : data.states
        }
    } catch (err) {
      console.log(err)
      return {
        success : false,
        message : "Something went wrong"
      }
    }
  }


  const handleGetCities = async (state) => {
    try {
      const data = await getCities(state)
        return {
            success : true,
            cities : data.cities
          }
     } catch (err) {
        console.log(err)
        return {
            success : false,
            message : "Something went wrong"
          }
        }
    
    }



      
  return {
    handleAddAddress,
    handleDeleteAddress,
    handleSetPassword,
    handleChangePassword,
    handleGetStates,
    handleGetCities
  }


}