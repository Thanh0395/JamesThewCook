const { useState } = require("react")

const UseModal = () =>{
    const [isShow, setIsShow] = useState(false)
    console.log("re-render useModel function")
    function toggle(){
        setIsShow(!isShow)
        console.log("togle running....")
    }
    return {
        isShow,
        toggle
    }
}
export default UseModal;