import React , {useState} from "react"
import { useNavigate } from "react-router-dom"



const BackButton = () => {

    const navigate = useNavigate()

    const [hov, setHov] = useState(false)

    return (
        <button
            onClick={() => navigate(-1)}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            className="flex items-center gap-1.5 cursor-pointer text-[12px] uppercase"
            style={{ color: hov ? '#C9A96E' : "#C9A96E" }}
        >
            <span style={{ transform: hov ? 'translateX(-3px)' : 'translateX(0)' }}>←</span>
            Back
        </button>
    )
}

export default BackButton