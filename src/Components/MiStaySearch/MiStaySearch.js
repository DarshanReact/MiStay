import React,{ Component, Fragment } from 'react';

import './MiStaySearch.css';
import  Search  from "../PlacesSearch/Search";
import BookSlots from '../CheckInCheckOut/BookSlots';
import RoomSelect from '../RoomNGuest/RoomSelect';
import {windowClick} from '../../Utils/utils'
class SeacrhBar extends Component
{
    constructor(props)
    {
        super(props);
        this.state ={
            round:false,
            place:'',
            rooms:[2],
            check_in:"",
            check_out:"",
            slotCount:"",
            checkinSlot:"1",

            open:""

        }
    }

    componentDidMount()
    {
        windowClick(()=>{
            this.setState({
                open:''
            })
            // console.log("the is window from cdm")
        });

    }

    componentDidUpdate()
    {
    
        
    }

  

    handleChanges=(value,name)=>{
        this.setState({
            [name]:value
        })
    }

    handlSlots = (ck_in,ck_out,slotsC,ck_in_Slot)=>{
        this.setState({
            check_in:ck_in,
            check_out:ck_out,
            slotCount:slotsC,
            checkinSlot:ck_in_Slot
        })
    }

    setComponent=name=>
    {
        this.setState({
            open:name
        })
    }

    handleSearch=(e)=>
    {
        e.stopPropagation()
            // if(this.state.place === '')
            // {
            //     this.setState({
            //         open:"search"
            //     })
            //     return 
            // }

            // if(this.state.check_in ==="" || this.state.check_out)
            // {
            //     this.setState({
            //         open:"slot"
            //     })
            //     return 

            // }
            var count = 0
            this.state.rooms.forEach(i=>count +=i);
             let data = {checkInDate:this.state.check_in,checkinSlot:this.state.checkinSlot,
                slotCount:this.state.slotCount,city:this.state.place,guestCount:count,roomCount:this.state.rooms.length}


            console.log(data)
    }

    render(){
        return(

            <Fragment>
            <div></div>
                <div className="main-container-div" onClick={e=>e.stopPropagation()} style={{borderBottomLeftRadius:this.state.open==="search"?"0px" : '10px'}}>
                    <div className="search-container">
                        <Search value={this.state.place} setComponent={this.setComponent} open={this.state.open==="search"} onChange={this.handleChanges} />
                    </div>
                    <div  className="book-slots-container">
                        <BookSlots open={this.state.open === "slot"} handlSlots={this.handlSlots} setComponent={this.setComponent}   />
                    </div>
                    <div className="room-guest-container">
                        <RoomSelect value={this.state.rooms} open={this.state.open==="search"} setComponent={this.setComponent}  open={this.state.open==="select-room"} onChange={this.handleChanges}/>
                    </div>

                    <div className="search-button-container">
                        <div className="search-button" onClick={e=>this.handleSearch(e)}>
                            find hourly hotel
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
}

export default SeacrhBar;