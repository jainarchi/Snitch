import axios from "axios";



const getStates = async (req, res) => {
  try {
    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        country: "India",
      }
    );

    const states = response.data.data.states.map((s) =>  s.name)

    res.status(200).json({
      success: true,
      states
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



const getStateCities = async (req , res) =>{

 try{
    let { stateName } = req.params;

    if (!stateName) {
      return res.status(400).json({
        success: false,
        message: "State name is required",
      });
    }

    
    stateName = decodeURIComponent(stateName);
    console.log(stateName)

    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        country: "India",
        state: stateName,
      }
    );

    const cities = response.data.data || [];

    return res.status(200).json({
      success: true,
      count: cities.length,
      cities,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        error.response?.data?.msg ||
        "Failed to fetch cities",
    });
  }

}


export {
    getStates,
    getStateCities
}