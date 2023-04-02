import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SelectType = () => {
    const navigator = useNavigate();
    function changeRouter(route) {
        navigator(route);
    }
    return (
        <div>
            <Button onClick={() => changeRouter('ai')}>AI Quiz generator</Button>
            <Button onClick={() => changeRouter('simple')}>Simple Quiz</Button>
        </div>
    )
}

export default SelectType