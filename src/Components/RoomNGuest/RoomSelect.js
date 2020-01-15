import React, { Fragment, useState, useEffect } from 'react';
import './RoomSelect.css';
import {windowClick,removeWindowClick} from '../../Utils/utils'


const RoomSelect =props=>{

    // const [rmCount,setRmCount] = useState(1);
    // const []

    const {setComponent =()=>{},onChange=()=>{}} = props;
    const [rooms,setRooms] = useState([
        2
    ]);

    const [open ,setOpen] = useState(false);

    useEffect(()=>{
       
    },[])

    useEffect(()=>{
        const {value=[]}= props;
        setRooms([...value]);
    },[props.value]);

    useEffect(()=>{

        const {open:op=false} = props;
        setOpen(op);
    },[props.open])
    
    
    
    const getGuestCount =()=>{
        let count = 0;

        rooms.forEach(guest=>{
                count+=guest
        })

        
        return count
    }

    const addaRoom =()=>{
        setRooms([...rooms,1]);
        onChange([...rooms,1],"rooms");

    }

    const handeChange=(index,value)=>{

        let temp_room = rooms;
        temp_room[index] = value;
        setRooms([...temp_room]);
        onChange([...temp_room],"rooms");

    }

    const deleteRoom = index =>{
        // console.log("the deleteroom called");
        if(index!== undefined)
        {
            let temp_room = rooms;
        temp_room.splice(index,1)
        setRooms([...temp_room]);
        onChange([...temp_room],"rooms");

        }
    }

    const handleClick=event=>
    {
        event.stopPropagation();
        setOpen(true);
        setComponent("select-room")
    }
  
    const addRoom = <div className="btn-div-adrm">
                        <button onClick={e=>addaRoom()} className="room-add-btn">Add Room</button>
                    </div>

    const allRooms = rooms.map((room,key)=><RoomManager close={e=>setOpen(false)} showDelete={rooms.length} deleteRoom={deleteRoom} onChange={handeChange} index={key+1} key={key} value={room}/>)
    return(
        <Fragment>
        <div onClick={event=>{handleClick(event)}} className="room-select-main" >
            <div>
                <div className="div1-label">
                    Any Guests ?
                </div>

                <div className="room-details">
                {rooms.length}&nbsp;Rooms/{getGuestCount()}&nbsp;Guests
                </div>
            </div>

            <div>
            <i className="fas fa-bed"></i>
            </div>

           { open && <div className="rooms-manager">
                    {addRoom}
                    {allRooms}
                    </div>
                }
        </div>
        
        </Fragment>
    )
}


const RoomManager = props =>{

    const {onChange=()=>{},deleteRoom=()=>{},close=()=>{}} = props;
    const [value,setValue] = useState('');
    const [index,setIndex] = useState('');
    const [hide,setHide] = useState(false);

    
    useEffect(()=>{
        // console.log("props.key is",props.index)

        windowClick(()=>
        {
            // setOpen(false);
            close();
        })

        return ()=>{
            removeWindowClick(()=>{
                // console.log("Removed event listener")
            })
        }

    },[])

    useEffect(()=>{

        const {index:ind = "" , value:val='',showDelete=1} = props;
        if(value!== val)
        {
            setValue(val)
        }
        if(ind !== index)
        {
            setIndex(ind)
        }

  
            setHide(showDelete >= 2);
        

    },[props])

    const incValue=()=>
    {
       if(value+1 <= 2)
       {
        setValue(value+1);
        onChange(index-1,value+1);

       }
    }

    const decrValue=()=>
    {
        if(value-1 >= 1)
        {
            setValue(value-1);
            onChange(index-1,value-1);


        }
    }

    const removeRoom = (e) =>
    {   
            e.stopPropagation();
            // deleteRoom(index-1);
            deleteRoom(index-1);
        
    }

return (
    <Fragment>
                <div className="room-manager-main">
                    <div className="fullWidthHeight display-center">
                    {hide && <RoundButton onClick={e=>removeRoom(e)} ><div onClick={e=>removeRoom(e)} className="div-x">X</div></RoundButton>}
                    </div>

                    <div style={{paddingLeft:'5%'}}>
                        <div className="rm-rc">Room &nbsp;{props.index}</div>
                        <div>{value}&nbsp;Guests</div>
                    </div>
                    
                    <div className="fullWidthHeight display-center" style={{padding:'5px'}}>
                        <RoundButton variant="outlined" onclick={decrValue}>-</RoundButton>
                        <RoundButton variant="outlined" onclick={incValue}>+</RoundButton>
                    </div>
                </div>

       
    </Fragment>
)

}


const RoundButton=props=>{
    const {onclick=()=>{},variant="none"} = props;


    return(
        <div onClick={e=>onclick()} style={{border:variant === "outlined" ? '1px solid rgba(0,0,0,0.3)' : ''}} className="round-icon-btn">{props.children}</div>

    )
}

export default RoomSelect;